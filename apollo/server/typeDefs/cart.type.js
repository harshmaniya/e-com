import { gql } from 'apollo-server';

const Cart = gql`
  type Cart {
    _id: ID!
    products: [CartProduct!]!
    user: User!
    total: Float!
  }

  type CartProduct {
    pid: Product
    qty: Int!
    color: Color
  }

  input CartProductInput {
    pid: ID!
    qty: Int!
    color: ID!
  }

  type Query {
    getCart: Cart
  }

  type Mutation {
    addToCart(input: CartProductInput!): String
    increaseQty(_id: ID!): String
    decreaseQty(_id: ID!): String
    removeFromCart(_id: ID!): String
    clearCart: String
  }

`;

export default Cart;
