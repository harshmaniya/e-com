import { gql } from 'apollo-server';

const Cart = gql`
  type Cart {
    _id: ID!
    products: [CartProduct!]!
    user: User!
    total: Float!
  }

  type CartProduct {
    pid: ID!
    qty: Int!
    color: Color
  }

  type Query {
    getCartByUserId(userId: ID!): Cart
  }

  type Mutation {
    addToCart(userId: ID!, product: CartProductInput!): Cart    
    removeFromCart(userId: ID!, productId: ID!): Cart
  }

  input CartProductInput {
    pid: ID!
    qty: Int!
    color: ID
  }
`;

export default Cart;
