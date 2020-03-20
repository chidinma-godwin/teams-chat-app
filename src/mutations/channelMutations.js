import gql from "graphql-tag";

const addChannelsMutation = gql`
  mutation($teamId: ID!, $name: String!, $public: Boolean) {
    createChannel(teamId: $teamId, name: $name, public: $public) {
      ok
      channel {
        id
        name
      }
      errors {
        path
        message
      }
    }
  }
`;

export { addChannelsMutation };
