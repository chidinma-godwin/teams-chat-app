import React, { Component } from "react";
import decode from "jwt-decode";
import Teams from "./teams/Teams";
import Channels from "./channels/Channels";
import AddChannelModal from "./channels/AddChannelModal";
import InvitePeopleModal from "./InvitePeopleModal";

class SideBar extends Component {
  constructor() {
    super();
    this.state = {
      showAddChannelModal: false,
      showInvitePeopleModal: false
    };
  }

  toggleAddChannelModal = evt => {
    if (evt) {
      evt.preventDefault();
    }
    this.setState(prevState => ({
      showAddChannelModal: !prevState.showAddChannelModal
    }));
  };

  toggleInvitePeopleModal = evt => {
    if (evt) {
      evt.preventDefault();
    }
    this.setState(prevState => ({
      showInvitePeopleModal: !prevState.showInvitePeopleModal
    }));
  };

  render() {
    const { team, teams } = this.props;
    let username = "";
    let userId = "";
    try {
      let token = localStorage.getItem("token");
      const { user } = decode(token);
      username = user.username;
      userId = user.id;
    } catch (err) {}
    const isOwner = Number(team.owner) === userId;

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
        isOwner={isOwner}
        toggleAddChannelModal={this.toggleAddChannelModal}
        toggleInvitePeopleModal={this.toggleInvitePeopleModal}
      />,
      <AddChannelModal
        key="add-channel-modal"
        showAddChannelModal={this.state.showAddChannelModal}
        toggleAddChannelModal={this.toggleAddChannelModal}
        currentTeamId={team.id}
      />,
      <InvitePeopleModal
        key="invite-people-modal"
        showInvitePeopleModal={this.state.showInvitePeopleModal}
        toggleInvitePeopleModal={this.toggleInvitePeopleModal}
        currentTeamId={team.id}
      />
    ];
  }
}

export default SideBar;
