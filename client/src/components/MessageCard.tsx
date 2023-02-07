import React from "react";
import styled from "styled-components";

import { device } from "../styles/Breakpoints";

interface MessageProps {
  children: React.ReactNode;
  navigateTo: string;
}
export default function MessageCard({ children, navigateTo }: MessageProps) {
  return (
    <MessageContainer>
      <a href={navigateTo}>Close X</a>
      {children}
    </MessageContainer>
  );
}

const MessageContainer = styled.div`
  position: relative;

  text-align: center;
  font-size: 1.2rem;
  border: 2px solid ${(props) => props.theme.colors.secondary};
  padding: 3em;

  a {
    position: absolute;
    top: 20px;
    right: 20px;
    color: ${(props) => props.theme.colors.secondary};
    font-size: 1rem;
  }

  @media ${device.tablet} {
    font-size: 1.4rem;
  }
`;
