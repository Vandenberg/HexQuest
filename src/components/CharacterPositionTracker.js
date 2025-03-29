import React, { useContext, useEffect } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { CharacterLocationContext } from "../contexts/CharacterLocationContext";
import { updateCharacterPositions } from "../helpers/DomToCanvas";

const CharacterPositionTracker = ({
  characters,
  onPositionsUpdate,
  hexSize,
}) => {
  const { camera, size } = useThree();
  const { characterLocations } = useContext(CharacterLocationContext);

  useEffect(() => {
    console.log("CharacterPositionTracker - Characters:", characters);
    console.log("CharacterPositionTracker - Locations:", characterLocations);
  }, [characters, characterLocations]);

  useFrame(() => {
    // Skip if we don't have the necessary data
    if (!characterLocations || characterLocations.length === 0) {
      return;
    }

    // Use window.characterData directly since props characters is undefined
    const charactersToUse = window.characterData || characters;

    if (!charactersToUse || charactersToUse.length === 0) {
      return;
    }

    // Pass hexSize explicitly and ensure it's a number
    const actualHexSize = typeof hexSize === "number" ? hexSize : 1;
    const positions = updateCharacterPositions(
      charactersToUse,
      characterLocations,
      camera,
      { width: size.width, height: size.height },
      actualHexSize
    );

    if (Object.keys(positions).length > 0) {
      //   console.log("Updating positions:", positions);
      onPositionsUpdate(positions);
    }
  });

  return null; // This component doesn't render anything
};

export default CharacterPositionTracker;
