import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { Text } from "@react-three/drei";

const Hexagon = ({
  x,
  y,
  z,
  size,
  type,
  row,
  col,
  players = [],
  preloader,
}) => {
  const meshRef = useRef();
  const objectsRef = useRef([]);

  useEffect(() => {
    const geometry = new THREE.CylinderGeometry(size, size, 1, 6);
    const edgeGeometry = new THREE.EdgesGeometry(geometry);
    const edgeMaterial = new THREE.LineBasicMaterial({ color: 0x000000 });
    const edges = new THREE.LineSegments(edgeGeometry, edgeMaterial);

    let material;

    // Check if we have preloaded textures for this terrain type
    if (preloader) {
      // Example texture paths - when textures are added later, this logic will use them
      const texturePaths = {
        lake: "/textures/water.jpg",
        forest: "/textures/forest.jpg",
        mountain: "/textures/mountain.jpg",
        plains: "/textures/land.jpg",
        swamp: "/textures/swamp.jpg",
      };

      const texturePath = texturePaths[type];
      const preloadedTexture = texturePath
        ? preloader.getTexture(texturePath)
        : null;

      if (preloadedTexture) {
        material = new THREE.MeshStandardMaterial({
          map: preloadedTexture,
          roughness: 0.8,
          metalness: 0.2,
        });
      } else {
        // Fallback to basic colors if texture not preloaded
        material = createColorMaterial(type);
      }
    } else {
      // No preloader available, use basic colors
      material = createColorMaterial(type);
    }

    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    mesh.add(edges);

    if (meshRef.current) {
      meshRef.current.add(mesh);

      // Store references for cleanup
      objectsRef.current.push(mesh, edges);
      objectsRef.current.push(geometry, edgeGeometry, edgeMaterial, material);
    }
  }, [x, y, z, size, type, preloader]);

  // Helper function to create color materials based on terrain type
  function createColorMaterial(terrainType) {
    switch (terrainType) {
      case "lake":
        return new THREE.MeshStandardMaterial({ color: "blue" });
      case "forest":
        return new THREE.MeshStandardMaterial({ color: "green" });
      case "mountain":
        return new THREE.MeshStandardMaterial({ color: "gray" });
      case "plains":
        return new THREE.MeshStandardMaterial({ color: "yellow" });
      case "swamp":
        return new THREE.MeshStandardMaterial({ color: "purple" });
      default:
        return new THREE.MeshStandardMaterial({ color: "white" });
    }
  }

  return (
    <group ref={meshRef}>
      <Text
        position={[x, 2, z - size * 0.6]}
        fontSize={size / 3}
        rotation={[-Math.PI / 2, 0, 0]}
        color="black"
        anchorX="center"
        anchorY="middle"
      >
        [{row},{col}]
      </Text>
    </group>
  );
};

export default Hexagon;
