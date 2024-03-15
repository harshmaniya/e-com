import { gql } from 'apollo-server';

const Color = gql`

type Color {
    _id: ID!
    name: String!
    hexCode: String!
}

input AddColorInput {   
    name: String!
    hexCode: String!
}

input UpdateColorInput {
    _id: ID!
    name: String
    hexCode: String
}

type Query {
    getAllColors: [Color]
}

type Mutation {
    addColor(input: AddColorInput!): Color
    updateColor(input: UpdateColorInput!): Color
    deleteColor(_id: ID!): String
}
`;

export default Color;
