import gql from "graphql-tag";

const createTeam = gql`
  mutation($name: String!) {
    createTeam(name: $name) {
      ok
      team {
        id
        name
        channels {
          id
          name
          public
        }
      }
      errors {
        path
        message
      }
    }
  }
`;

export { createTeam };
