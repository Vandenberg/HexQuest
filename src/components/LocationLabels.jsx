import React, { useEffect, useState } from "react";
import { useThree } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import { hexToWorld } from "../helpers/DomToCanvas";
import locations from "../data/locations";

const LocationLabels = ({ hexSize }) => {
  const [labels, setLabels] = useState([]);
  const { scene } = useThree();
  
  useEffect(() => {
    // Convert locations to 3D positions
    const locationLabels = locations.map(loc => {
      // Fix parameter order: (row, col, hexSize)
      const position = hexToWorld(loc.x, loc.y, hexSize);
      // Raise the label above the hexagon
      position.y += 0.51;
      
      return {
        ...loc,
        position
      };
    });
    
    setLabels(locationLabels);
  }, [hexSize]);
  
  return (
    <>
      {labels.map((label, index) => (
        <group key={index}>
          <Text
            position={label.position}
            fontSize={hexSize * 0.4}
            color="#ff0000"
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.05}
            outlineColor="#ffffff"
            rotation={[-Math.PI / 2, 0, 0]} // Rotate to lie flat on XZ plane
          >
            {label.name}
          </Text>
          <Text
            position={[label.position.x, label.position.y - hexSize * 0.1, label.position.z + hexSize * 0.6]}
            fontSize={hexSize * 0.2}
            color="#ff0000"
            anchorX="center"
            anchorY="middle"
            rotation={[-Math.PI / 2, 0, 0]}
          >
            ({label.type})
          </Text>
        </group>
      ))}
    </>
  );
};

export default LocationLabels;
