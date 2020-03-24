import gql from "graphql-tag";

const allTeamsQuery = gql`
  query {
    myTeams {
      id
      name
      owner
      channels {
        id
        name
        public
      }
    }
    teamsInvited {
      id
      name
      owner
      channels {
        id
        name
        public
      }
    }
  }
`;

export { allTeamsQuery };
