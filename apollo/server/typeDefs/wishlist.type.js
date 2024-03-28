import { gql } from 'apollo-server';

const Wishlist = gql`
  type Wishlist {
    _id: ID!
    products: [Product!]
    user: User!
  }

  type WishlistArray {
    _id: ID!
    products: [ID!]
  }

  type Query {
    getWishlist: Wishlist
    getWishlistArray: WishlistArray
  }

  type Mutation {
    addToWishlist(productId: ID!): String
    removeFromWishlist(productId: ID!): String
  }
`;

export default Wishlist;
