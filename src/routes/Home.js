import React from "react";
import { List } from "semantic-ui-react";
import { Query } from "react-apollo";
import { allUsersQuery } from "../queries";

const Home = () => {
  return (
    <Query query={allUsersQuery}>
      {({ error, loading, data }) => {
        if (loading) return <div>Loading...</div>;
        if (error) {
          console.log(error);
          return <div>Please try again</div>;
        }

        console.log(data);
        const namesList = data.allUsers.map(user => user.email);

        return (
          <List>
            {namesList.map((email, i) => (
              <List.Item key={i}>
                <h1>{email}</h1>
              </List.Item>
            ))}
          </List>
        );
      }}
    </Query>
  );
};

export default Home;
