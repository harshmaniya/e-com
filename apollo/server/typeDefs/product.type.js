import { gql } from 'apollo-server';

const Product = gql`

type Product {
    _id: ID!
    name: String!
    price: Int!
    description: String
    stock: Int!
    brand: Brand!
    category: Category!
    sku: String
    colors: [Color]
    images: [String]
    freeShipping: Boolean
}

input AddProductInput {   
    name: String!
    price: Int!
    description: String
    stock: Int!   
    brand: ID!
    category: ID!
    sku: String
    colors: [ID!]
    images: [String!]
    freeShipping: Boolean
}

input UpdateProductInput {
    _id: ID!
    name: String
    price: Int
    description: String
    stock: Int   
    brand: ID
    category: ID
    sku: String
    colors: [ID]
    images: [String]
    freeShipping: Boolean
}

type Query {
    getAllProducts: [Product]
    getProduct(_id: ID!): Product
}

type Mutation {
    addProduct(input: AddProductInput!): Product
    updateProduct(input: UpdateProductInput!): Product
    deleteProduct(_id: ID!): Product
}
`;

export default Product;