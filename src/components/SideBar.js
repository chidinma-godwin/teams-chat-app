import React, { Component } from "react";
import Teams from "./teams/Teams";
import Channels from "./channels/Channels";
import AddChannelModal from "./channels/AddChannelModal";
import decode from "jwt-decode";

class SideBar extends Component {
  constructor() {
    super();
    this.state = {
      showModal: false
    };
  }

  toggleAddChannelModal = () => {
    this.setState(prevState => ({
      showModal: !prevState.showModal
    }));
  };

  render() {
    const { team, teams } = this.props;
    let username = "";
    try {
      let token = localStorage.getItem("token");
      const { user } = decode(token);
      username = user.username;
    } catch (err) {}

    return [
      <Teams
        key="teams"
        teams={teams.map(team => ({
          id: team.id,
          letter: team.name.charAt(0).toUpperCase()
        }))}
      />,
      <Channels
        key="channels"
        teamId={team.id}
        teamName={team.name}
        username={username}
        channels={team.channels}
        users={[
          { id: 1, name: "Slackbot" },
          { id: 2, name: "Harvey" }
        ]}
        toggleAddChannelModal={this.toggleAddChannelModal}
      />,
      <AddChannelModal
        key="modal"
        showAddChannelModal={this.state.showModal}
        toggleAddChannelModal={this.toggleAddChannelModal}
        currentTeamId={team.id}
      />
    ];
  }
}

export default SideBar;
