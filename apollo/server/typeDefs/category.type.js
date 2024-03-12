import { gql } from 'apollo-server';

const category = gql`

type Category {
    _id: ID
    name: String
}
  
    type Query {
        getAllCategories: [Category]
    }

    type Mutation {
        addCategory(name: String): Category
    }
`;

export default category;