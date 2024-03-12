import { gql } from 'apollo-server';

const products = gql`

type Product {
    _id: ID
    name: String
    price: Int
    description: String
    stock: Int    
    brand: Brand
    category: Category
    sku: String
    colors: [Color]
    images: [String]
    freeShipping: Boolean
}

input addProductInput {   
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
    getProduct(_id: ID): Product
}

type Mutation{
    addProduct(input: addProductInput): Product
}

`;

export default products;