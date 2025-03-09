import * as THREE from 'three';

// Function to convert hex grid coordinates to 3D world position
export const hexToWorld = (row, col, hexSize = 1) => {
  // Calculate hex grid positions (using flat-topped hexagon layout)
  const x = (col * 1.5) * hexSize;
  const z = (row * Math.sqrt(3) + (col % 2) * Math.sqrt(3) / 2) * hexSize;
  const y = 0; // Base height
  
  return new THREE.Vector3(x, y, z);
};

// Function to convert 3D world position to 2D screen position
export const worldToScreen = (worldPos, camera, size) => {
  const vector = worldPos.clone();
  vector.project(camera);
  
  return {
    x: (vector.x * 0.5 + 0.5) * size.width,
    y: (-(vector.y * 0.5) + 0.5) * size.height
  };
};

// Function for handling character position updates on camera or window changes
export const updateCharacterPositions = (characters, characterLocations, camera, size) => {
  const positions = {};
  
  characterLocations.forEach(location => {
    const { characterId, row, col } = location;
    const worldPos = hexToWorld(row, col);
    // Add a small Y offset to position labels above the hexagons
    worldPos.y += 1;
    
    const screenPos = worldToScreen(worldPos, camera, size);
    
    // Find character info
    const characterInfo = characters.find(c => c.character_id === characterId);
    
    if (characterInfo) {
      positions[characterId] = {
        ...screenPos,
        name: characterInfo.name || `Character ${characterId}`
      };
      console.log("Character positions:", positions);
    }
  });
  
  return positions;
};