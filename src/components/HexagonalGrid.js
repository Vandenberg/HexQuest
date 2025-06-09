import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import Hexagon from "./Hexagon";
import terrainData from "../data/terrainData";
import CharacterOverlay from "./CharacterOverlay";
import CharacterPositionTracker from "./CharacterPositionTracker";
import LocationLabels from "./LocationLabels";
import CameraController from "./CameraController";
import preloader from "../helpers/ThreeJSPreloader";
import { useCharacterData } from "../contexts/CharacterDataContext";

const HexagonalGrid = ({ width, height, size }) => {
  const [characterPositions, setCharacterPositions] = useState({});
  const canvasRef = useRef(null);
  const { characters } = useCharacterData();

  // Memoize calculations that don't change
  const hexWidth = useMemo(() => Math.sqrt(3) * size, [size]);
  const hexHeight = useMemo(() => 2 * size, [size]);
  const vertDist = useMemo(() => hexHeight * 0.75, [hexHeight]);

  // Memoize hexagons array so it's not recreated on every render
  const hexagons = useMemo(() => {
    const hexArray = [];
    for (let row = 0; row < height; row++) {
      for (let col = 0; col < width; col++) {
        const x = col * hexWidth + (row % 2) * (hexWidth / 2);
        const z = row * vertDist;
        const terrainObject = terrainData.find(
          (terrain) => terrain.x === col && terrain.y === row
        );
        const type = terrainObject ? terrainObject.type : "none";

        hexArray.push(
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
    return hexArray;
  }, [width, height, size, hexWidth, vertDist]); // Only recalculate when these values change

  // Memoize the camera position and target
  const cameraPosition = useMemo(
    () => [(width * hexWidth) / 2, 75, height * vertDist + 45],
    [width, height, hexWidth, vertDist]
  );
  const orbitTarget = useMemo(
    () => [(width * hexWidth) / 2, 0, (height * vertDist) / 2],
    [width, height, hexWidth, vertDist]
  ); // State to track when camera changes require position updates
  const [needsUpdate, setNeedsUpdate] = useState(false);

  // Function to handle position updates without causing unnecessary re-renders
  const handlePositionsUpdate = useCallback(
    (newPositions) => {
      // Reset the update flag after positions have been updated
      if (needsUpdate) {
        setNeedsUpdate(false);
      }

      setCharacterPositions((prevPositions) => {
        // Only update if the positions have actually changed
        if (JSON.stringify(prevPositions) === JSON.stringify(newPositions)) {
          return prevPositions;
        }
        return newPositions;
      });
    },
    [needsUpdate]
  );

  return (
    <div style={{ position: "relative", width: "100%", height: "80vh" }}>
      <Canvas
        ref={canvasRef}
        camera={{
          position: cameraPosition,
          fov: 45,
        }}
        onCreated={({ gl }) => {
          // Configure renderer settings when canvas is created
          gl.shadowMap.enabled = true;
          gl.shadowMap.type = THREE.PCFSoftShadowMap;
        }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight
          castShadow
          position={[5, 5, 5]}
          intensity={1}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />{" "}
        <OrbitControls
          target={orbitTarget}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 4}
        />{" "}
        <CameraController
          onCameraUpdate={(camera) => {
            // Force a position recalculation when camera changes
            setNeedsUpdate(true);
          }}
        />
        {hexagons}
        <LocationLabels hexSize={size} />{" "}
        <CharacterPositionTracker
          characters={characters || []} // Use characters from context directly
          onPositionsUpdate={handlePositionsUpdate}
          hexSize={size} // Pass the hexSize explicitly
          forceUpdate={needsUpdate} // Force update when camera changes
        />
      </Canvas>

      {/* Character overlay positioned absolutely over the canvas */}
      <CharacterOverlay positions={characterPositions} />
    </div>
  );
};

// Export with memo to prevent unnecessary re-renders
export default React.memo(HexagonalGrid);
