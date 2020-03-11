import gql from "graphql-tag";

const registerUser = gql`
  mutation($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password) {
      ok
      user {
        id
        username
        email
      }
      errors {
        path
        message
      }
    }
  }
`;

const loginUser = gql`
  mutation($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      ok
      token
      refreshToken
      errors {
        path
        message
      }
    }
  }
`;

export { registerUser, loginUser };
