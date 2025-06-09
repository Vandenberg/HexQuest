import React, { useContext, useEffect, useRef, useState, useMemo } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { CharacterLocationContext } from "../contexts/CharacterLocationContext";
import { updateCharacterPositions } from "../helpers/DomToCanvas";

const CharacterPositionTracker = ({
  characters,
  onPositionsUpdate,
  hexSize,
  forceUpdate = false,
}) => {
  const { camera, size } = useThree();
  const { characterLocations } = useContext(CharacterLocationContext);

  // State to track last update time
  const lastUpdateRef = useRef(0);
  const positionsRef = useRef({});
  const [needsUpdate, setNeedsUpdate] = useState(false);
  // Memoize character data to prevent recalculation when unchanged
  const charactersToUse = useMemo(() => {
    return characters || [];
  }, [characters]); // Monitor for changes that would require recalculation
  useEffect(() => {
    setNeedsUpdate(true);
  }, [
    characterLocations,
    charactersToUse,
    camera.position.x,
    camera.position.y,
    camera.position.z,
    camera.rotation.x,
    camera.rotation.y,
    camera.rotation.z,
    size.width,
    size.height,
    forceUpdate, // React to forced updates from parent
  ]);
  // Add debugging for initial render
  useEffect(() => {
    console.log("CharacterPositionTracker mounted with:", {
      characterLocations,
      characterCount: charactersToUse.length,
    });
  }, []);

  useFrame(() => {
    // Skip processing if we don't have data or if no update is needed
    if (
      !characterLocations ||
      characterLocations.length === 0 ||
      charactersToUse.length === 0 ||
      !needsUpdate
    ) {
      if (needsUpdate) {
        console.log("PositionTracker skipping update because:", {
          hasCharacterLocations:
            characterLocations && characterLocations.length > 0,
          locationCount: characterLocations?.length || 0,
          hasCharacters: charactersToUse.length > 0,
          characterCount: charactersToUse.length,
        });
      }
      return;
    }

    // Throttle updates to once every 100ms (adjust as needed)
    const now = performance.now();
    if (now - lastUpdateRef.current < 100) {
      return;
    }

    lastUpdateRef.current = now;

    // Pass hexSize explicitly and ensure it's a number
    const actualHexSize = typeof hexSize === "number" ? hexSize : 1;
    const positions = updateCharacterPositions(
      charactersToUse,
      characterLocations,
      camera,
      { width: size.width, height: size.height },
      actualHexSize
    );

    // Only update if positions have actually changed
    if (JSON.stringify(positions) !== JSON.stringify(positionsRef.current)) {
      positionsRef.current = positions;
      onPositionsUpdate(positions);
      setNeedsUpdate(false);
    }
  });

  return null; // This component doesn't render anything
};

export default React.memo(CharacterPositionTracker);
