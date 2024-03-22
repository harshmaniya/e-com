
import { Cart } from "@/lib/models";
import stripe from "@/lib/stripe";

const createCheckoutSession = async (_, args, { user }) => {
    try {
        const { _id } = user
        const cartData = await Cart.findOne({ user: _id })
            .populate('products.pid')

        const orderItems = cartData.products.map((item) => (
            {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: item.pid.name
                    },
                    unit_amount: item.pid.price * 100,
                },
                quantity: item.qty,
            }
        ))

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            // line_items : cart items
            line_items: [
                ...orderItems
            ],
            mode: 'payment',
            success_url: `${process.env.CLIENT_URL}/success`,
            cancel_url: `${process.env.CLIENT_URL}/cancel`,
            metadata: {
                userId: _id
            }
        });
        console.log("🚀 ~ createCheckoutSession ~ session:", session.id)
        return { sessionId: session.id };
    } catch (error) {
        console.error(error);
        return new Error({ error: 'Failed to create session' });
    }
}


export const checkoutResolvers = {
    Mutation: {
        createCheckoutSession
    }
};