import React, { Component } from "react";
import { Input, Container, Header } from "semantic-ui-react";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      email: "",
      password: ""
    };
  }

  handleChange = evt => {
    const { name, value } = evt.target;
    this.setState({
      [name]: value
    });
  };

  render() {
    return (
      <Container text>
          <Header as="h2">Register</Header>
        <Input
          placeholder="Enter username"
          name="username"
          value={this.state.username}
          onChange={this.handleChange}
          fluid
        />
        <Input
          placeholder="Enter email"
          name="email"
          value={this.state.email}
          onChange={this.handleChange}
          fluid
        />
        <Input
          placeholder="Enter password"
          name="password"
          value={this.state.password}
          onChange={this.handleChange}
          fluid
        />
      </Container>
    );
  }
};  

export default Register;
