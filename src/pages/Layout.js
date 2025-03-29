import React from "react";
import { Slot } from "@radix-ui/react-slot";
import NavigationMenuComponent from "./Navigation";
import { Outlet, Link } from "react-router-dom";
import { Box, Flex, Grid, Container, Section } from "@radix-ui/themes";
import DecorativeBox from "../components/DecorativeBox";

import "../styles/styles.scss";

const Layout = () => (
  <div className="layout">
    <header className="layout-header">
      <NavigationMenuComponent />
    </header>
    <main className="layout-main">
      <Box
        style={{
          background: "var(--gray-a2)",
          borderRadius: "var(--radius-3)",
        }}
      >
        <Box py="9">
          <Slot>
            <Outlet />
          </Slot>
        </Box>
      </Box>
    </main>
    <footer className="layout-footer">
      <p>&copy; 2025 HexQuester</p>
    </footer>
  </div>
);

export default Layout;
