import React from "react";
import AppLayout from "../components/AppLayout";
import Teams from "../components/Teams";
import Channels from "../components/Channels";
import PageHeader from "../components/PageHeader";
import Messages from "../components/Messages";
import MessageInput from "../components/MessageInput";
import { Input } from "semantic-ui-react";

class ViewTeam extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <AppLayout>
        <Teams
          teams={[
            { id: 1, letter: "C" },
            { id: 2, letter: "G" }
          ]}
        />
        <Channels
          teamName="Team Name"
          username="Username"
          channels={[
            { id: 1, name: "General" },
            { id: 2, name: "Random" }
          ]}
          users={[
            { id: 1, name: "Slackbot" },
            { id: 2, name: "Harvey" }
          ]}
        />
        <PageHeader channelName="General" />
        <Messages>
          <ul>
            <li />
            <li />
            <li />
          </ul>
        </Messages>
        <MessageInput channelName="General" />
      </AppLayout>
    );
  }
}

export default ViewTeam;
