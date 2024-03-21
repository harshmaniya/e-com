import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

export async function redirectToCheckout(sessionId) {
    const stripe = await stripePromise;
    const { error } = await stripe.redirectToCheckout({
        sessionId,
    });
    if (error) {
        console.error(error);
    }
}