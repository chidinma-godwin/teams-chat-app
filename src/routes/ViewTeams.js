import React from "react";
import { Query } from "react-apollo";
import { allTeamsQuery } from "../queries";
import AppLayout from "../components/AppLayout";
import SideBar from "../components/SideBar";
import PageHeader from "../components/PageHeader";
import Messages from "../components//messages/Messages";
import MessageInput from "../components/messages/MessageInput";
import findIndex from "lodash/findIndex";
import { Redirect } from "react-router-dom";

const ViewTeam = ({
  match: {
    params: { teamId, channelId }
  }
}) => {
  return (
    <Query query={allTeamsQuery}>
      {({ error, loading, data }) => {
        if (loading) return <p>Loading...</p>;
        if (error) {
          console.log(error);
          return <p>Something went wrong. Please try again later.</p>;
        }

        const allTeams = [...data.myTeams, ...data.teamsInvited];
        console.log(data);

        if (!allTeams.length) {
          return <Redirect to="/create-team" />;
        }

        const teamIdInteger = parseInt(teamId, 10);
        const channelIdInteger = parseInt(channelId, 10);
        let team;

        // Get the team selected through the url
        const filteredTeam =
          teamIdInteger &&
          allTeams.filter(team => {
            return Number(team.id) === Number(teamId);
          })[0];

        // If no team is selected, get the first team
        filteredTeam ? (team = filteredTeam) : (team = allTeams[0]);

        let channel;
        // Get the channel selected through the url
        const filteredChannel =
          channelIdInteger && findIndex(team.channels, ["id", channelId]);

        // If no channel is selected, get the first team
        filteredChannel >= 0
          ? (channel = team.channels[filteredChannel])
          : (channel = team.channels[0]);

        return (
          <AppLayout>
            <SideBar team={team} teams={allTeams} />
            <PageHeader
              channelName={channel ? channel.name : "No Channel added yet"}
            />
            <Messages>
              <ul>
                <li />
                <li />
                <li />
              </ul>
            </Messages>
            <MessageInput channelName={channel ? channel.name : "No Channel"} />
          </AppLayout>
        );
      }}
    </Query>
  );
};

export default ViewTeam;
