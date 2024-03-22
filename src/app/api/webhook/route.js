import stripe from "stripe"
import { headers } from "next/headers"
import { NextResponse } from "next/server"
import { Cart, Order } from "@/lib/models"

export const POST = async (req) => {

    const body = await req.text()
    const sig = headers().get("stripe-signature")
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET

    let event

    try {
        event = stripe.webhooks.constructEvent(body, sig, endpointSecret)
    } catch (err) {
        return NextResponse.json({ message: `Webhook Error: ${(err).message}` })
    }

    try {
        // Handle the event
        switch (event.type) {
            case "checkout.session.completed":
                const session = event.data.object
                const Address = session.customer_details.address
                const addressString = `${Address.line1}, ${Address.line2}, ${Address.city}, ${Address.state}, ${Address.postal_code}, ${Address.country}`;
                try {
                    const userID = session.metadata.userId
                    const cart = await Cart.findOne({ user: userID }).populate('products.pid')

                    if (!cart) {
                        throw new Error("Cart not found for the user.");
                    }

                    const newOrder = await Order.create({
                        user: userID,
                        products: cart.products,
                        shipping_address: addressString,
                        payment_method: session.payment_method_types[0],
                        payment_status: session.payment_status,
                        total: cart.total
                    })

                    if (newOrder) {
                        await Cart.updateOne({ user: userID }, { $set: { products: [] } })
                        return NextResponse.json({ message: "OK" })
                    } else {
                        return new Error("Failed to create order")
                    }                

                } catch (error) {
                    console.error("Error creating order:", error.message);
                    return NextResponse.json({ message: `Failed to create order: ${error.message}` });
                }
            case "checkout.session.async_payment_failed":
                const session2 = event.data.object
                break
            default:
                console.log("🚀 ~ POST ~ session type not match:")
                break
        }

    } catch (err) {
        return NextResponse.json({ message: `Webhook handler failed. View logs. ${(err).message} ` })
    }

    return new Response("", { status: 200 })
}