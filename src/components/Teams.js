import React from "react";
import styled from "styled-components";

const TeamWrapper = styled.div`
  grid-column: 1;
  grid-row: 1 / 4;
  background-color: #362234;
  color: #958993;
`;

const TeamList = styled.ul`
  list-style: none;
  width: 100%;
  padding-left: 0;
`;

const TeamListItem = styled.li`
  height: 50px;
  width: 50px;
  background-color: #676066;
  color: #fff;
  margin: auto;
  margin-bottom: 0.8em;
  border-radius: 11px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.75em;
  &: hover {
    border: solid thick #767676;
  }
`;

const Teams = ({ teams }) => {
  const teamList = teams.map(({ id, letter }) => (
    <TeamListItem key={id}> {letter} </TeamListItem>
  ));
  return (
    <TeamWrapper>
      <TeamList>{teamList}</TeamList>
    </TeamWrapper>
  );
};

export default Teams;
