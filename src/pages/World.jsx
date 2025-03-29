import React from "react";
import HexagonalGrid from "../components/HexagonalGrid";
import { Box, Flex, Grid, Container, Section } from "@radix-ui/themes";

const World = () => {
  return (
    <Container className="world-page" size="3">
      <h1>World</h1>
      <HexagonalGrid width={7} height={8} size={10} />
    </Container>
  );
};

export default World;
