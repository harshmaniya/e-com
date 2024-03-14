import { gql } from 'apollo-server';

const brand = gql`
  type Brand {
    _id: ID
    name: String
  }
  
  type Query {
    getAllBrands: [Brand]
    getBrandById(_id: ID!): Brand
  }

  type Mutation {
    addBrand(name: String!): Brand
    updateBrand(_id: ID!, name: String!): Brand
    deleteBrand(_id: ID!): Brand
  }
`;

export default brand;