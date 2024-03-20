import { gql } from 'apollo-server';

const User = gql`
  type User {
    _id: ID!
    name: String!
    email: String!
    password: String!
    phone: String
    address: String
    role: String!
    orders: [Order]
    cart: Cart
    wishlist: Wishlist
  }

  input CreateUserInput {
    name: String!
    email: String!
    password: String!
    phone: String
    address: String
  }

  input UpdateUserInput {
    _id: ID!
    name: String
    email: String
    password: String
    phone: String
    address: String   
  }

  input login{
    email: String!
    password: String!
  }

  type loginResult{
    email: String
    accessToken: String
  }

  type Query {
    getUsers: [User!]!
    getUserProfile: User
  }

  type Mutation {
    login(input: login!): loginResult
    createUser(input: CreateUserInput!): String
    updateUser(input: UpdateUserInput!): User
    deleteUser(_id: ID!): User
  }
`;

export default User;
