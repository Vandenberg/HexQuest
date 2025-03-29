import React from "react";
import { Slot } from "@radix-ui/react-slot";
import { Outlet, Link } from "react-router-dom";

const Layout = () => (
  <div className="layout">
    <header className="layout-header">
      <h1>HexQuester</h1>
      <nav className="taskbar">
        <Link to="/">Home</Link>
        <Link to="/world">World</Link>
        <Link to="/players">Players</Link>
      </nav>
    </header>
    <main className="layout-main">
      <Slot>
        <Outlet />
      </Slot>
    </main>
    <footer className="layout-footer">
      <p>&copy; 2025 HexQuester</p>
    </footer>
  </div>
);

export default Layout;
