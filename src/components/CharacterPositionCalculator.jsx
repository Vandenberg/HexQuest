import React, { useEffect } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { hexToWorld, worldToScreen } from "../helpers/DomToCanvas";

// This component lives inside Canvas and calculates positions
const CharacterPositionCalculator = ({ characterLocations, characters, updatePositions }) => {
  const { camera, size } = useThree();
  
  // Update positions on each frame
  useFrame(() => {
    const newPositions = {};
    
    characterLocations.forEach((location) => {
      const { characterId, row, col } = location;
      
      // Convert hex coordinates to 3D world position
      const worldPos = hexToWorld(row, col, 1); // Use actual hex size
      worldPos.y += 1; // Position above hexagon
      
      // Project 3D position to screen coordinates
      const screenPos = worldToScreen(worldPos, camera, {
        width: size.width,
        height: size.height
      });
      
      // Find character info
      const characterInfo = characters.find(
        (c) => c.character_id === characterId
      );
      
      if (characterInfo) {
        newPositions[characterId] = {
          ...screenPos,
          name: characterInfo.name || 
                characterInfo.character_name || 
                `Character ${characterId}`,
          characterData: characterInfo,
        };
      }
    });
    
    // Send positions up to parent component
    updatePositions(newPositions);
  });
  
  return null; // This component doesn't render anything
};

export default CharacterPositionCalculator;