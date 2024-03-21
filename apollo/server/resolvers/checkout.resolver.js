
import stripe from "@/lib/stripe";

const createCheckoutSession = async () => {
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            // line_items : cart items
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: 'Product Name',
                        },
                        unit_amount: 50000, // in cents
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${process.env.CLIENT_URL}/success`,
            cancel_url: `${process.env.CLIENT_URL}/cancel`,
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