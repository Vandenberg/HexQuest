import React from "react";
import Introduction from "../content/Introduction.mdx";
import { Box, Flex, Grid, Container, Section } from "@radix-ui/themes";
import DecorativeBox from "../components/DecorativeBox";
const Home = () => {
  return (
    <Container className="world-page" size="1">
      <Introduction />
    </Container>
  );
};

export default Home;
