import gql from "graphql-tag";

const createTeam = gql`
  mutation($name: String!) {
    createTeam(name: $name) {
      ok
      errors {
        path
        message
      }
    }
  }
`;

export { createTeam };
