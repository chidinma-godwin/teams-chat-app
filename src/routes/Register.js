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
import { registerUser } from "../mutations";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      usernameError: null,
      email: "",
      emailError: null,
      password: "",
      passwordError: null,
      unexpectedError: null,
      redirect: null
    };
  }

  handleChange = evt => {
    const { name, value } = evt.target;
    this.setState({
      [name]: value
    });
  };

  onSubmit = async (evt, createUser, data) => {
    evt.preventDefault();
    const { username, password, email } = this.state;

    // Clear any error before submitting
    this.setState({
      usernameError: "",
      emailError: "",
      passwordError: ""
    });

    data = await createUser({
      variables: { username, email, password }
    });
    console.log(data);

    // Get the errors from the server and add them to state
    let errors = data.data.createUser.errors;
    const err = {};
    if (errors) {
      errors.forEach(({ path, message }) => {
        err[`${path}Error`] = message;
      });
    }
    this.setState(err);
    console.log(err);

    // If there are no errors clear the input and redirect to the home page
    if (!errors) {
      this.setState({
        username: "",
        email: "",
        password: "",
        redirect: "/"
      });
    }
  };

  render() {
    const {
      username,
      usernameError,
      password,
      passwordError,
      email,
      emailError,
      redirect
    } = this.state;

    if (redirect) {
      return <Redirect push to={redirect} />;
    }

    let errorList = [];

    if (usernameError) errorList.push(usernameError);
    if (emailError) errorList.push(emailError);
    if (passwordError) errorList.push(passwordError);

    return (
      <Mutation mutation={registerUser}>
        {(createUser, { loading, error, data }) => (
          <Container text>
            <Header as="h2">Register</Header>
            {errorList.length ? (
              <Message
                error
                header="There was some errors with your submission"
                list={errorList}
              />
            ) : null}
            <Form onSubmit={evt => this.onSubmit(evt, createUser, data)}>
              <Form.Field
                id="username"
                required
                label="Username"
                error={!!usernameError}
                control={Input}
                placeholder="Enter username"
                name="username"
                value={username}
                onChange={this.handleChange}
                fluid
              />

              <Form.Field
                id="email"
                required
                control={Input}
                error={!!emailError}
                label="Email"
                placeholder="Enter email"
                name="email"
                value={email}
                onChange={this.handleChange}
                fluid
              />

              <Form.Field
                id="password"
                required
                control={Input}
                error={!!passwordError}
                label="Password"
                placeholder="Enter password"
                name="password"
                type="password"
                value={password}
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

export default Register;
