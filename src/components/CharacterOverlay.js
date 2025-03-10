import React, { useContext } from "react";
import { CharacterLocationContext } from "../contexts/CharacterLocationContext";

const CharacterOverlay = ({ positions }) => {
  const { characterLocations } = useContext(CharacterLocationContext);
  const overlayRef = React.useRef();

  // Make sure positions exist and have entries
  const hasPositions = positions && Object.keys(positions).length > 0;

  return (
    <div
      ref={overlayRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none", // Allow clicks to pass through to the canvas
      }}
    >
      {hasPositions &&
        Object.entries(positions).map(([id, pos]) => (
          <div
            key={id}
            style={{
              position: "absolute",
              left: `${pos.x}px`,
              top: `${pos.y}px`,
              transform: "translate(-50%, -50%)",
              background: "rgba(0, 0, 0, 0.7)",
              color: "white",
              padding: "4px 8px",
              borderRadius: "4px",
              fontSize: "24px",
              pointerEvents: "auto", // Make this element interactive
              cursor: "pointer",
              zIndex: 1000,
            }}
            onClick={() => console.log(`Clicked on character ${pos.name}`)}
          >
            {pos.name}
          </div>
        ))}
    </div>
  );
};

export default CharacterOverlay;
