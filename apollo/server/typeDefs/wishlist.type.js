import { gql } from 'apollo-server';

const Wishlist = gql`
  type Wishlist {
    _id: ID!
    products: [Product!]!
    user: User!
  }

  type Query {
    getWishlist: Wishlist
  }

  type Mutation {
    addToWishlist(userId: ID!, productId: ID!): Wishlist
    removeFromWishlist(userId: ID!, productId: ID!): Wishlist
  }
`;

export default Wishlist;
