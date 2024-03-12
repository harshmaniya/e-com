import { gql } from 'apollo-server';

const colors = gql`

type Color {
    _id: ID
    name: String
    hexCode: String
}
  
input addColorInput {   
    name: String!
    hexCode: String!
}

    type Query {
        getAllColors: [Color]
    }

    type Mutation {
        addColor(input: addColorInput): Color
    }
`;

export default colors;