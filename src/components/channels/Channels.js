import React from "react";
import styled from "styled-components";
import { Icon } from "semantic-ui-react";
import { NavLink } from "react-router-dom";

const paddingLeft = "padding-left: 0.8em";

const activeClassName = "nav-item-active";

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

const SidebarList = styled.ul`
  list-style: none;
  width: 100%;
  padding-left: 0;
`;

const ChannelItemLink = styled(NavLink).attrs({
  activeClassName
})`
  text-decoration: none;
  color: #958993;
  &:hover {
    color: #fff;
  }

  &.${activeClassName} {
    color: #fff;
  }
`;

const CustomLink = styled.a`
  text-decoration: none;
  color: #958993;

  &:hover {
    color: #fff;
  }
`;

const Bubble = ({ on = true }) =>
  on ? (
    <Green role="img" arial-label="online status">
      &#9899;
    </Green>
  ) : (
    "o"
  );

const Channels = ({
  teamId,
  teamName,
  username,
  channels,
  users,
  isOwner,
  toggleAddChannelModal,
  toggleInvitePeopleModal
}) => {
  const channelList = channels.map(({ id, name }) => (
    <ChannelItemLink
      key={id}
      to={`/view-team/${teamId}/${id}`}
      // activeClassName={activeChannel}
    >
      <SidebarListItem>{`# ${name}`}</SidebarListItem>
    </ChannelItemLink>
  ));

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
        <PushRight>
          Channels{" "}
          {isOwner && (
            <Icon link name="add circle" onClick={toggleAddChannelModal} />
          )}
        </PushRight>
        {channelList}
      </SidebarList>

      <SidebarList>
        <PushRight>Direct Messages</PushRight>
        {userList}
      </SidebarList>

      {isOwner && (
        <PushRight>
          <CustomLink href="#invite-people" onClick={toggleInvitePeopleModal}>
            + Invite People
          </CustomLink>
        </PushRight>
      )}
    </ChannelWrapper>
  );
};

export default Channels;
