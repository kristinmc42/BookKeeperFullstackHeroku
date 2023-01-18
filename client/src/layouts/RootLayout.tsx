import React from "react";
import { Outlet } from "react-router-dom";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

const RootLayout: React.FC = () => {
  return (
    <>
      <header>
        <Nav />
      </header>

      <main>
        <Outlet />
      </main>

      <Footer />
    </>
  );
};

export default RootLayout;
