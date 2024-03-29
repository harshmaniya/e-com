import { gql } from 'apollo-server';

const category = gql`

type Category {
    _id: ID!
    name: String!
}
  
type Query {
    getAllCategories: [Category]
    getCategoryById(_id: ID!): Category
}

type Mutation {
    addCategory(name: String!): Category
    updateCategory(_id: ID!, name: String!): Category
    deleteCategory(_id: ID!): String
}
`;

export default category;
