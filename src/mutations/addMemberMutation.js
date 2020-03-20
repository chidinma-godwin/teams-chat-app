import gql from "graphql-tag";

const addMembersMutation = gql`
  mutation($teamId: ID!, $email: String!) {
    addMember(teamId: $teamId, email: $email) {
      ok
      errors {
        path
        message
      }
    }
  }
`;

export { addMembersMutation };
