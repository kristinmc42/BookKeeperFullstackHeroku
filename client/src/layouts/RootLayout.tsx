import React from "react";
import { Outlet } from "react-router-dom";

//components
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import styled from "styled-components";

const RootLayout: React.FC = () => {
  return (
    <PageContainer>
      <Wrapper>
      <header>
        <Nav />
      </header>

      <main>
        <Outlet />
      </main>

      </Wrapper>

      <Footer />
    </PageContainer>
  );
};

export default RootLayout;

//styled component
const Wrapper = styled.div`
`
const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
