import * as THREE from "three";

// Function to convert hex grid coordinates to 3D world position
export const hexToWorld = (row, col, hexSize = 1) => {
  // Calculate hex grid positions with proper scaling using hexSize
  const hexWidth = Math.sqrt(3) * hexSize;
  const vertDist = 2 * hexSize * 0.75;

  const x = col * hexWidth + (row % 2) * (hexWidth / 2);
  const z = row * vertDist;
  const y = 0; // Base height

  return new THREE.Vector3(x, y, z);
};

// Function to convert 3D world position to 2D screen position
export const worldToScreen = (worldPos, camera, size) => {
  const vector = worldPos.clone();
  vector.project(camera);

  return {
    x: (vector.x * 0.5 + 0.5) * size.width,
    y: (-(vector.y * 0.5) + 0.5) * size.height,
  };
};

// Function for handling character position updates on camera or window changes
export const updateCharacterPositions = (
  characters,
  characterLocations,
  camera,
  size,
  hexSize = 1
) => {
  const positions = {};

  characterLocations.forEach((location) => {
    const { characterId, row, col } = location;
    // Use hexSize for world position calculation
    const worldPos = hexToWorld(row, col, hexSize);
    worldPos.y += hexSize; // Scale the y-offset with hexSize for better visibility

    const screenPos = worldToScreen(worldPos, camera, size); // Find character info - match by ID with more flexible comparison
    const characterInfo = characters.find(
      (c) =>
        String(c.character_id) === String(characterId) ||
        String(c.id) === String(characterId) ||
        String(c.characterId) === String(characterId)
    );

    // Debug logging to help diagnose issues
    if (!characterInfo) {
      console.warn(`No character info found for ID: ${characterId}`);
      console.log(
        "Available character IDs:",
        characters.map((c) => c.character_id || c.id || c.characterId)
      );
    }
    if (characterInfo) {
      positions[characterId] = {
        ...screenPos,
        name: characterInfo.name || `Character ${characterId}`,
        characterData: {
          ...characterInfo,
          position: { row, col }, // Add grid position information
        },
      };
    }
  });

  return positions;
};
