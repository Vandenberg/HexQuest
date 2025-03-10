import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { Text } from "@react-three/drei";

const Hexagon = ({ x, y, z, size, type, row, col, players = [] }) => {
  const meshRef = useRef();
  const objectsRef = useRef([]);

  useEffect(() => {
    const geometry = new THREE.CylinderGeometry(size, size, 1, 6);
    const edgeGeometry = new THREE.EdgesGeometry(geometry);
    const edgeMaterial = new THREE.LineBasicMaterial({ color: 0x000000 });
    const edges = new THREE.LineSegments(edgeGeometry, edgeMaterial);

    let material;
    switch (type) {
      case "lake":
        material = new THREE.MeshStandardMaterial({ color: "blue" });
        break;
      case "forest":
        material = new THREE.MeshStandardMaterial({ color: "green" });
        break;
      case "mountain":
        material = new THREE.MeshStandardMaterial({ color: "gray" });
        break;
      case "plains":
        material = new THREE.MeshStandardMaterial({ color: "yellow" });
        break;
      case "swamp":
        material = new THREE.MeshStandardMaterial({ color: "purple" });
        break;
      default:
        material = new THREE.MeshStandardMaterial({ color: "white" });
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
  }, [x, y, z, size, type]);

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
