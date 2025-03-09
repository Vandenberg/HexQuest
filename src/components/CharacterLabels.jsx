import React from "react";

// Pure React component with no Three.js dependencies
const CharacterLabels = ({ positions, characters }) => {
  if (!positions || Object.keys(positions).length === 0) return null;
  
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
    >
      {Object.entries(positions).map(([characterId, pos]) => {
        const characterInfo = characters.find(
          c => c.character_id === characterId
        );
        
        if (!characterInfo) return null;
        
        const name = characterInfo.name || 
                     characterInfo.character_name || 
                     `Character ${characterId}`;
                     
        return (
          <div
            key={characterId}
            style={{
              position: "absolute",
              left: `${pos.x}px`,
              top: `${pos.y}px`,
              transform: "translate(-50%, -50%)",
              background: "rgba(0, 0, 0, 0.7)",
              color: "white",
              padding: "4px 8px",
              borderRadius: "4px",
              fontSize: "12px",
              pointerEvents: "auto",
              cursor: "pointer",
              zIndex: 1000,
            }}
            onClick={() => console.log(`Clicked on character ${name}`)}
          >
            {name}
          </div>
        );
      })}
    </div>
  );
};

export default CharacterLabels;