import React, { useState, useEffect } from "react";
import HexagonalGrid from "../components/HexagonalGrid";
import {
  Box,
  Flex,
  Grid,
  Container,
  Section,
  Spinner,
  Text,
  Progress,
} from "@radix-ui/themes";
import preloader from "../helpers/ThreeJSPreloader";

const World = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [gridReady, setGridReady] = useState(false);

  // Use ThreeJSPreloader to preload textures and other assets
  useEffect(() => {
    // Define texture URLs to preload (currently we don't have textures but this would be the place to add them)
    const textureUrls = [
      // Add texture URLs here when you start using textures
      // For example: "/textures/grass.jpg", "/textures/water.jpg", etc.
    ];

    // Set up progress callback
    preloader.onProgress = (progress) => {
      setLoadingProgress(progress * 100);
    };

    const preloadAssets = async () => {
      try {
        // Even if we don't have textures yet, this establishes the loading infrastructure
        if (textureUrls.length > 0) {
          await preloader.preloadTextures(textureUrls);
        } else {
          // If no textures to preload, simulate some loading time for the Three.js environment
          await new Promise((resolve) => setTimeout(resolve, 800));
        }

        // Set grid as ready and remove loading state
        setGridReady(true);
        setTimeout(() => setIsLoading(false), 200);
      } catch (error) {
        console.error("Error preloading assets:", error);
        // Even if there's an error, we should still show the grid after a delay
        setTimeout(() => {
          setGridReady(true);
          setIsLoading(false);
        }, 1000);
      }
    };

    preloadAssets();

    return () => {
      // Cleanup if needed
    };
  }, []);

  return (
    <Container className="world-page" size="3">
      <h1>World</h1>

      {isLoading ? (
        <Flex
          direction="column"
          align="center"
          justify="center"
          style={{ height: "60vh", width: "100%" }}
        >
          <Spinner size="large" />
          <Box mt="4" mb="2">
            Loading world map...
          </Box>
          <Box css={{ width: "80%", maxWidth: "400px" }}>
            <Progress value={loadingProgress} />
            <Text size="1" align="center" mt="1">
              {Math.round(loadingProgress)}%
            </Text>
          </Box>
        </Flex>
      ) : (
        <HexagonalGrid width={7} height={8} size={10} />
      )}
    </Container>
  );
};

export default World;
