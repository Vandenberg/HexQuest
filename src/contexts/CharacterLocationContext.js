import React, { createContext, useState, useEffect } from "react";

export const CharacterLocationContext = createContext({
  characterLocations: [],
  updateCharacterLocation: () => {},
  gridConfig: { width: 7, height: 8 },
});

export const CharacterLocationProvider = ({ children }) => {
  const [characterLocations, setCharacterLocations] = useState([]);
  // Define grid configuration here to match HexagonalGrid
  const gridConfig = { width: 7, height: 8 };

  // Load from localStorage on mount
  useEffect(() => {
    const storedLocations = localStorage.getItem("characterLocations");
    if (storedLocations) {
      try {
        setCharacterLocations(JSON.parse(storedLocations));
      } catch (error) {
        console.error("Failed to parse character locations:", error);
      }
    }
  }, []);

  // Save to localStorage whenever locations change
  useEffect(() => {
    localStorage.setItem(
      "characterLocations",
      JSON.stringify(characterLocations),
      console.log(JSON.stringify(characterLocations))
    );
  }, [characterLocations]);

  const updateCharacterLocation = (characterId, row, col) => {
    if (row === null && col === null) {
      // Remove character location
      setCharacterLocations((prev) =>
        prev.filter((loc) => loc.characterId !== characterId)
      );
    } else {
      // Update or add character location
      setCharacterLocations((prev) => {
        const filtered = prev.filter((loc) => loc.characterId !== characterId);
        return [...filtered, { characterId, row, col }];
      });
    }
  };

  return (
    <CharacterLocationContext.Provider
      value={{
        characterLocations,
        updateCharacterLocation,
        gridConfig,
      }}
    >
      {children}
    </CharacterLocationContext.Provider>
  );
};
