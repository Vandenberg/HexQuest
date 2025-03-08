import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Hexagon from "./Hexagon";
import terrainData from "../data/terrainData";

const HexagonalGrid = ({ width, height, size }) => {
  const hexagons = [];
  const hexWidth = Math.sqrt(3) * size;
  const hexHeight = 2 * size;
  const vertDist = hexHeight * 0.75;

  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      const x = col * hexWidth + (row % 2) * (hexWidth / 2);
      const z = row * vertDist;
      const terrainObject = terrainData.find(
        (terrain) => terrain.x === col && terrain.y === row
      );
      const type = terrainObject ? terrainObject.type : "none";
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
        />
      );
    }
  }

  return (
    <Canvas
      camera={{
        position: [(width * hexWidth) / 2, 75, height * vertDist + 45],
        fov: 45,
      }}
      style={{ width: "100%", height: "50vh" }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight
        castShadow
        position={[5, 5, 5]}
        intensity={1}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      <OrbitControls
        target={[(width * hexWidth) / 2, 0, (height * vertDist) / 2]}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 4}
        enableRotate={false}
        enableZoom={false}
      />
      {hexagons}
    </Canvas>
  );
};

export default HexagonalGrid;
