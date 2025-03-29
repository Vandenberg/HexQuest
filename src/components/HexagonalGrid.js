import React, { useState, useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import Hexagon from "./Hexagon";
import terrainData from "../data/terrainData";
import CharacterOverlay from "./CharacterOverlay";
import CharacterPositionTracker from "./CharacterPositionTracker";
import LocationLabels from "./LocationLabels";
import preloader from "../helpers/ThreeJSPreloader";

const HexagonalGrid = ({ width, height, size }) => {
  const hexagons = [];
  const hexWidth = Math.sqrt(3) * size;
  const hexHeight = 2 * size;
  const vertDist = hexHeight * 0.75;
  const [characterPositions, setCharacterPositions] = useState({});
  const canvasRef = useRef(null);

  // Create hexagons based on terrain data
  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      const x = col * hexWidth + (row % 2) * (hexWidth / 2);
      const z = row * vertDist;
      const terrainObject = terrainData.find(
        (terrain) => terrain.x === col && terrain.y === row
      );
      const type = terrainObject ? terrainObject.type : "none";

      // Pass the preloader to Hexagon component if it needs textures
      hexagons.push(
        <Hexagon
          key={`${row}-${col}`}
          x={x}
          y={0}
          z={z}
          size={size}
          type={type}
          row={row}
          col={col}
          preloader={preloader}
        />
      );
    }
  }

  return (
    <div style={{ position: "relative", width: "100%", height: "80vh" }}>
      <Canvas
        ref={canvasRef}
        camera={{
          position: [(width * hexWidth) / 2, 75, height * vertDist + 45],
          fov: 45,
        }}
        onCreated={({ gl }) => {
          // Configure renderer settings when canvas is created
          gl.shadowMap.enabled = true;
          gl.shadowMap.type = THREE.PCFSoftShadowMap;
          console.log("Three.js canvas initialized");
        }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight
          castShadow
          position={[5, 5, 5]}
          intensity={1}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <OrbitControls
          target={[(width * hexWidth) / 2, 0, (height * vertDist) / 2]}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 4}
        />
        {hexagons}
        <LocationLabels hexSize={size} />
        <CharacterPositionTracker
          characters={
            window.characterData || [
              // Fallback test data
              { character_id: "test1", name: "Test Character" },
            ]
          }
          onPositionsUpdate={setCharacterPositions}
          hexSize={size} // Pass the hexSize explicitly
        />
      </Canvas>

      {/* Character overlay positioned absolutely over the canvas */}
      <CharacterOverlay positions={characterPositions} />
    </div>
  );
};

export default HexagonalGrid;
