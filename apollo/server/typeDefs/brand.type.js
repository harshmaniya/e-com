import { gql } from 'apollo-server';

const brand = gql`

type Brand {
    _id: ID
    name: String
}
  
    type Query {
        getAllBrands: [Brand]
    }

    type Mutation {
        addBrand(name: String): Brand
    }
`;

export default brand;