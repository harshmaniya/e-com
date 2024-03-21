import { gql } from 'apollo-server';

const Checkout = gql`

type CheckoutSessionResponse {
    sessionId: String!
  }

type Mutation {
    createCheckoutSession: CheckoutSessionResponse!
  }`

export default Checkout