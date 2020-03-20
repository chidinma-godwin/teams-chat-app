import React from "react";
import { Container, Form, Button, Header, Message } from "semantic-ui-react";
import { Mutation } from "react-apollo";
import { createTeam } from "../mutations";
import { Redirect } from "react-router-dom";

class CreateTeam extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      nameError: null,
      unexpectedError: null,
      redirect: null,
      redirectState: undefined
    };
  }

  onChange = evt => {
    this.setState({
      name: evt.target.value
    });
  };

  onSubmit = async (evt, createTeam, data) => {
    evt.preventDefault();
    let { name } = this.state;
    try {
      data = await createTeam({
        variables: { name }
      });
    } catch (err) {
      this.setState({
        redirect: "/login",
        redirectState: "Please login to create a team"
      });
      return;
    }

    console.log(data);

    let errors = data.data.createTeam.errors;

    // Create an object to save errors
    let err = {};

    // If there are errors save them in the 'err' object
    if (errors) {
      errors.forEach(({ path, message }) => {
        err[`${path}Error`] = message;
      });
    }

    this.setState(err);
    console.log(err);

    // If there are no errors clear the form and redirect to the home page
    if (!errors) {
      this.setState({
        name: "",
        redirect: `/view-team/${data.data.createTeam.team.id}`
      });
    }
  };

  render() {
    let {
      name,
      nameError,
      unexpectedError,
      redirect,
      redirectState
    } = this.state;

    if (redirect) {
      return (
        <Redirect
          push
          to={{ pathname: redirect, state: { info: redirectState } }}
        />
      );
    }

    return (
      <Mutation mutation={createTeam}>
        {(createTeam, { loading, error, data }) => (
          <Container text>
            <Header as="h2">Create a team</Header>
            {nameError && (
              <Message
                error
                header="There was some errors with your submission"
                content={nameError}
              />
            )}
            <Form onSubmit={evt => this.onSubmit(evt, createTeam, data)}>
              <Form.Input
                fluid
                required
                id="name"
                error={!!nameError}
                name="name"
                label="Name"
                placeholder="Enter team name"
                value={name}
                onChange={this.onChange}
              />
              <Button>Create</Button>
            </Form>
            {loading && <div>Loading...</div>}
            {error && <div>Unable to create team. Please try again.</div>}
            {unexpectedError && <div>{unexpectedError}</div>}
          </Container>
        )}
      </Mutation>
    );
  }
}

export default CreateTeam;
