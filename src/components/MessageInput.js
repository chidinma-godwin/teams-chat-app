import React from "react";
import styled from "styled-components";
import { Input } from "semantic-ui-react";

const MessageWrapper = styled.div`
  grid-column: 3;
  grid-row: 3;
  margin: 20px;
`;

const MessageInput = ({ channelName }) => {
  return (
    <MessageWrapper>
      <Input placeholder={`Message # ${channelName}`} fluid />
    </MessageWrapper>
  );
};

export default MessageInput;
