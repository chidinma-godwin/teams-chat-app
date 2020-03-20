import React from "react";
import { Modal, Form, Button, Header } from "semantic-ui-react";
import { Formik } from "formik";
import { Mutation } from "react-apollo";
import findIndex from "lodash/findIndex";
import { addChannelsMutation } from "../../mutations";
import { allTeamsQuery } from "../../queries";
import { Redirect } from "react-router-dom";

class AddChannelModal extends React.Component {
  constructor() {
    super();
    this.state = {
      redirect: null
    };
  }
  // Function to add channel to a team
  handleCreateChannel = async (createChannel, values, data, setSubmitting) => {
    const { currentTeamId, toggleAddChannelModal } = this.props;

    // Capitalize the first letter of the channel name
    console.log(values);
    const firstLetter = values.name.charAt(0).toUpperCase();
    const otherLetters = values.name.slice(1);
    const capitalizeFirstLetter = firstLetter + otherLetters;
    console.log(values.status === "public");
    try {
      data = await createChannel({
        variables: {
          name: capitalizeFirstLetter,
          teamId: currentTeamId,
          public: values.status === "public"
        },

        // Update the UI with the expected result before getting the real result
        optimisticResponse: {
          __typename: "Mutation",
          createChannel: {
            __typename: "ChannelResponse",
            ok: true,
            channel: {
              id: -1,
              name: capitalizeFirstLetter,
              __typename: "Channel"
            }
          }
        },

        // update the cache so that the newly created channel is displayed immediately
        update: (store, { data: { createChannel } }) => {
          const { ok, channel } = createChannel;
          if (!ok) return;
          // read the query from the store
          const data = store.readQuery({ query: allTeamsQuery });
          console.log(data);
          const teamIdx = findIndex(data.allTeams, ["id", currentTeamId]);
          console.log(teamIdx);
          data.allTeams[teamIdx].channels.push(channel);
          // updata the store with the data with the newly added channel
          store.writeQuery({ query: allTeamsQuery, data });
        }
      });

      // close the add channal modal
      console.log(data);
      setSubmitting(false);
      toggleAddChannelModal();

      // Redirect to the newly created data
      const channelId = data.data.createChannel.channel.id;
      this.setState({
        redirect: `/view-team/${currentTeamId}/${channelId}`
      });
    } catch (err) {
      console.log(err);
      console.log("Cannot create channel");
    }
  };

  render() {
    const { showAddChannelModal, toggleAddChannelModal } = this.props;
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    return (
      <Modal open={showAddChannelModal}>
        <Header content="Add channels" />
        <Modal.Content>
          <Mutation mutation={addChannelsMutation}>
            {(createChannel, { loading, error, data }) => (
              <Formik
                initialValues={{ name: "", status: "private" }}
                onSubmit={async (values, { setSubmitting }) => {
                  await this.handleCreateChannel(
                    createChannel,
                    values,
                    data,
                    setSubmitting
                  );
                }}
              >
                {({
                  values,
                  isSubmitting,
                  handleSubmit,
                  handleChange,
                  handleBlur
                }) => (
                  <Form onSubmit={handleSubmit}>
                    <Form.Input
                      fluid
                      name="name"
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Enter channel name"
                    />
                    <Form.Group>
                      <Form.Radio
                        id="private"
                        label="private"
                        name="status"
                        value="private"
                        checked={values.status === "private"}
                        onChange={handleChange}
                      />
                      <Form.Radio
                        id="public"
                        label="public"
                        name="status"
                        value="public"
                        checked={values.status === "public"}
                        onChange={handleChange}
                      />
                    </Form.Group>
                    <Form.Group widths="equal">
                      <Button
                        type="submit"
                        loading={loading}
                        fluid
                        disabled={isSubmitting}
                      >
                        Create Channel
                      </Button>
                      <Button onClick={toggleAddChannelModal} fluid>
                        Cancel
                      </Button>
                    </Form.Group>
                  </Form>
                )}
              </Formik>
            )}
          </Mutation>
        </Modal.Content>
      </Modal>
    );
  }
}

export default AddChannelModal;
