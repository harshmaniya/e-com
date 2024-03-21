import React from 'react';
import { createCheckoutSession } from '../api/stripe';

const CheckoutButton = () => {
  const handleClick = async () => {
    const { sessionId } = await createCheckoutSession();
    redirectToCheckout(sessionId);
  };

  return (
    <button onClick={handleClick}>
      Checkout
    </button>
  );
};

export default CheckoutButton;