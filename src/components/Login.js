import React, { Component } from "react";
import {
  Form,
  Input,
  Container,
  Header,
  Button,
  Message
} from "semantic-ui-react";
import { Mutation } from "react-apollo";
import { Redirect } from "react-router-dom";
import { loginUser } from "../mutations";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      email_passwordError: null,
      unexpectedError: null,
      password: "",
      redirect: null
    };
  }

  handleChange = evt => {
    const { name, value } = evt.target;
    this.setState({
      [name]: value
    });
  };

  onSubmit = async (evt, loginUser, data) => {
    evt.preventDefault();
    const { password, email } = this.state;

    // Clear any error before submitting
    this.setState({
      email_passwordError: ""
    });

    data = await loginUser({
      variables: { email, password }
    });
    console.log(data);

    // Get the errors from the server and add them to state
    let errors = data.data.loginUser.errors;
    const err = {};
    if (errors) {
      errors.forEach(({ path, message }) => {
        err[`${path}Error`] = message;
      });
    }
    this.setState(err);
    console.log(err);

    // If login is successful clear the input, save token and refreshToken on local
    // storage and redirect to the home page
    const { ok, token, refreshToken } = data.data.loginUser;
    if (ok) {
      localStorage.setItem("token", token);
      localStorage.setItem("refreshToken", refreshToken);
      this.setState({
        email: "",
        password: "",
        redirect: "/"
      });
    }
  };

  render() {
    const { password, email, email_passwordError, redirect } = this.state;

    if (redirect) {
      return <Redirect push to={redirect} />;
    }

    let errorsList = [];

    if (email_passwordError) errorsList.push(email_passwordError);

    return (
      <Mutation mutation={loginUser}>
        {(loginUser, { loading, error, data }) => (
          <Container text>
            <Header as="h2">Login</Header>
            {email_passwordError ? (
              <Message
                error
                header="There was some errors with your submission"
                list={errorsList}
              />
            ) : null}
            <Form onSubmit={async evt => this.onSubmit(evt, loginUser, data)}>
              <Form.Field
                id="form-input-control-email"
                required
                control={Input}
                label="Email"
                error={!!email_passwordError}
                placeholder="Enter email"
                name="email"
                value={email}
                onChange={this.handleChange}
                fluid
              />
              <Form.Field
                id="form-input-control-password"
                required
                control={Input}
                label="Password"
                error={!!email_passwordError}
                placeholder="Enter password"
                name="password"
                value={password}
                type="password"
                onChange={this.handleChange}
                fluid
              />
              <Button>Submit</Button>
            </Form>
            {loading && <div>Loading...</div>}
            {error && <div>Please reload the page</div>}
          </Container>
        )}
      </Mutation>
    );
  }
}

export default Login;
