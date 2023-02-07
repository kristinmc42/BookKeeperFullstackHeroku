import React from 'react';
import styled from 'styled-components';

interface OverlayProps {
    children: React.ReactNode;
    className?: string;
  }

export default function 
({children, className}:OverlayProps) {
  return (
    <CardOverlay className={className}>
        {children}
    </CardOverlay>
  )
}

const CardOverlay = styled.div`
  position: fixed;
  top: 3em;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: ${(props) => props.theme.colors.primary};
  display: flex;
  justify-content: center;
  align-items: center;
`;