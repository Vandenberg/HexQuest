import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MDXProvider } from "@mdx-js/react";
import { CharacterLocationProvider } from "../contexts/CharacterLocationContext";
import { Theme } from "@radix-ui/themes";
import Layout from "../pages/Layout";
import Home from "../pages/Home";
import World from "../pages/World";
import Players from "../pages/Players";
import "@radix-ui/themes/styles.css";
// import "../styles/styles.scss";

function App() {
  return (
    <MDXProvider>
      <CharacterLocationProvider>
        <Theme
          accentColor="teal"
          grayColor="sage"
          radius="large"
          scaling="95%"
          appearance="dark"
        >
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="world" element={<World />} />
                <Route path="players" element={<Players />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </Theme>
      </CharacterLocationProvider>
    </MDXProvider>
  );
}

export default App;
