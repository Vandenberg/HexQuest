import React from "react";
import { Slot } from "@radix-ui/react-slot";
import "../styles/styles.scss";

const Layout = ({ children }) => (
  <div className="layout">
    <header className="layout-header">
      <h1>HexQuester</h1>
    </header>
    <main className="layout-main">
      <Slot>{children}</Slot>
    </main>
    <footer className="layout-footer">
      <p>&copy; 2025 HexQuester</p>
    </footer>
  </div>
);

export default Layout;
