import gql from "graphql-tag";

const allUsersQuery = gql`
  query {
    allUsers {
      id
      username
      email
    }
  }
`;

export { allUsersQuery };
