import React, { useState, useEffect, useCallback, useContext } from "react";
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
  Button,
} from "@radix-ui/themes";
import preloader from "../helpers/ThreeJSPreloader";
import { useCharacterData } from "../contexts/CharacterDataContext";
import { CharacterLocationContext } from "../contexts/CharacterLocationContext";

const World = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [gridReady, setGridReady] = useState(false);
  const { characters, loading: charactersLoading } = useCharacterData();
  const { characterLocations } = useContext(CharacterLocationContext);

  // Debug log to see if data is available in the World component
  useEffect(() => {
    console.log("World component data:", {
      characters: characters?.length || 0,
      characterLocations: characterLocations?.length || 0,
    });
  }, [characters, characterLocations]);

  // Track if component is mounted to prevent state updates after unmount
  const isMounted = useCallback(
    (function () {
      let mounted = true;
      return {
        current: () => mounted,
        unmount: () => {
          mounted = false;
        },
      };
    })(),
    []
  );

  // Use ThreeJSPreloader to preload textures and other assets
  useEffect(() => {
    // Define texture URLs to preload
    const textureUrls = [
      "/textures/dark_forest.jpg",
      "/textures/field.jpg",
      "/textures/forest.jpg",
      "/textures/grassland.jpg",
      "/textures/grid.png",
      "/textures/hills.jpg",
      "/textures/mountains.jpg",
      "/textures/swamp.jpg",
      "/textures/water.jpg",
    ];

    // Set up progress callback
    preloader.onProgress = (progress) => {
      if (isMounted.current()) {
        setLoadingProgress(progress * 100);
      }
    };

    const preloadAssets = async () => {
      try {
        // Preload textures that will actually be used
        if (textureUrls.length > 0) {
          await preloader.preloadTextures(textureUrls);
        }

        // Set grid as ready and remove loading state immediately
        if (isMounted.current()) {
          setGridReady(true);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error preloading assets:", error);
        // Even if there's an error, show the grid
        if (isMounted.current()) {
          setGridReady(true);
          setIsLoading(false);
        }
      }
    };

    preloadAssets();

    // Cleanup function
    return () => {
      isMounted.unmount();
    };
  }, [isMounted]);

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

export default React.memo(World);
