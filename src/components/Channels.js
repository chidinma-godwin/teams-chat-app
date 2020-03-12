import React from "react";
import styled from "styled-components";

const paddingLeft = "padding-left: 0.8em";

const ChannelWrapper = styled.div`
  grid-column: 2;
  grid-row: 1 / 4;
  background-color: #4e3a4c;
  color: #958993;
`;

const PushRight = styled.div`
  ${paddingLeft}
`;

const TeamNameheader = styled.h1`
  color: #fff;
  font-size: 1.2em;
`;

const SidebarListItem = styled.li`
  padding: 0.2em;
  ${paddingLeft};
  &:hover {
    background-color: #3e313c;
  }
`;

const Green = styled.span`
  color: transparent;
  text-shadow: 0 0 0 #38978d;
`;

const Bubble = ({ on = true }) => (on ? <Green>&#9899;</Green> : "o");

const Channels = ({ teamName, username, channels, users }) => {
  const channelList = channels.map(({ id, name }) => (
    <SidebarListItem key={id}>{`# ${name}`}</SidebarListItem>
  ));

  const SidebarList = styled.ul`
    list-style: none;
    width: 100%;
    padding-left: 0;
  `;

  const userList = users.map(({ id, name }) => (
    <SidebarListItem key={id}>
      <Bubble /> {name}
    </SidebarListItem>
  ));
  return (
    <ChannelWrapper>
      <PushRight>
        <TeamNameheader>{teamName}</TeamNameheader>
        <p>{username}</p>
      </PushRight>

      <SidebarList>
        <PushRight>Channels</PushRight>
        {channelList}
      </SidebarList>

      <SidebarList>
        <PushRight>Direct Messages</PushRight>
        {userList}
      </SidebarList>
    </ChannelWrapper>
  );
};

export default Channels;
