import React from "react";
import { Modal, Form, Button, Header } from "semantic-ui-react";
import { Formik } from "formik";
import { Mutation } from "react-apollo";
import { addMembersMutation } from "../mutations";
import normalizeErrors from "../normalizeErrors";

const InvitePeopleModal = ({
  showInvitePeopleModal,
  toggleInvitePeopleModal,
  currentTeamId
}) => {
  // Function to add channel to a team
  const handleInvitepeople = async (
    addMember,
    values,
    data,
    setSubmitting,
    setErrors
  ) => {
    // Capitalize the first letter of the channel name

    console.log(values);
    data = await addMember({
      variables: {
        email: values.email,
        teamId: currentTeamId
      }
    });
    console.log(data);
    const { ok, errors } = data.data.addMember;
    if (ok) {
      setSubmitting(false);
      toggleInvitePeopleModal();
    } else {
      console.log(normalizeErrors(errors));
      setSubmitting(false);
      setErrors(normalizeErrors(errors));
    }
  };

  return (
    <Modal open={showInvitePeopleModal}>
      <Header content="Add Members to your Team" />
      <Modal.Content>
        <Mutation mutation={addMembersMutation}>
          {(addMember, { loading, error, data }) => (
            <Formik
              initialValues={{ email: "" }}
              onSubmit={async (values, { setSubmitting, setErrors }) => {
                await handleInvitepeople(
                  addMember,
                  values,
                  data,
                  setSubmitting,
                  setErrors
                );
              }}
            >
              {({
                values,
                isSubmitting,
                handleSubmit,
                handleChange,
                handleBlur,
                touched,
                errors
              }) => (
                <Form onSubmit={handleSubmit}>
                  <Form.Input
                    fluid
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Enter user email"
                  />
                  {touched.email &&
                  (errors.email ||
                    errors.user_id ||
                    errors.team_id ||
                    errors.unexpected) ? (
                    <div>
                      {errors.email ? (
                        errors.email.map((error, index) => (
                          <p key={index}>{error}</p>
                        ))
                      ) : errors.unexpected ? (
                        <p>An unexpected error occured. Please try again</p>
                      ) : (
                        <p>This user is already a member of this team</p>
                      )}
                    </div>
                  ) : null}
                  <Form.Group widths="equal">
                    <Button
                      type="submit"
                      loading={loading}
                      fluid
                      disabled={isSubmitting}
                    >
                      Add member
                    </Button>
                    <Button onClick={toggleInvitePeopleModal} fluid>
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
};

export default InvitePeopleModal;
