import gql from "graphql-tag";

const allTeamsQuery = gql`
  query {
    allTeams {
      id
      name
      channels {
        id
        name
        public
      }
    }
  }
`;

export { allTeamsQuery };
