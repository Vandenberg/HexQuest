import React, { createContext, useState, useEffect, useRef } from "react";

export const CharacterLocationContext = createContext({
  characterLocations: [],
  updateCharacterLocation: () => {},
  gridConfig: { width: 7, height: 8 },
});

export const CharacterLocationProvider = ({ children }) => {
  const [characterLocations, setCharacterLocations] = useState([]);
  // Define grid configuration here to match HexagonalGrid
  const gridConfig = { width: 7, height: 8 };
  // Reference to track initial load
  const hasInitialLoad = useRef(false);
  // Load from localStorage on mount
  useEffect(() => {
    // Try to load character locations from localStorage
    const storedLocations = localStorage.getItem("characterLocations");
    console.log(
      "Loading character locations from localStorage:",
      storedLocations
    );

    if (storedLocations) {
      try {
        const parsedLocations = JSON.parse(storedLocations);
        console.log("Parsed character locations:", parsedLocations);

        // Validate the parsed data is an array and has the expected structure
        if (Array.isArray(parsedLocations) && parsedLocations.length > 0) {
          // Ensure all entries have characterId in string format for consistency
          const normalizedLocations = parsedLocations.map((loc) => ({
            ...loc,
            characterId: String(loc.characterId),
          }));

          setCharacterLocations(normalizedLocations);
          console.log(
            "Character locations successfully loaded:",
            normalizedLocations
          );
        } else {
          console.warn(
            "Stored locations is not a valid array or is empty:",
            parsedLocations
          );
        }
      } catch (error) {
        console.error("Failed to parse character locations:", error);
      }
    } else {
      console.log("No character locations found in localStorage");

      // Initialize with dummy data for testing if needed
      // setCharacterLocations([
      //   { characterId: "1", row: 2, col: 3 },
      //   { characterId: "2", row: 4, col: 1 }
      // ]);
    }
  }, []);

  // Save to localStorage whenever locations change
  useEffect(() => {
    // Avoid saving when the component first mounts to prevent double-saving
    if (!hasInitialLoad.current) {
      hasInitialLoad.current = true;
      return;
    }

    // Only save if there are locations to save
    if (characterLocations && characterLocations.length > 0) {
      try {
        const locationsJson = JSON.stringify(characterLocations);
        localStorage.setItem("characterLocations", locationsJson);
        console.log(
          "Saved character locations to localStorage:",
          locationsJson
        );
      } catch (error) {
        console.error("Failed to save character locations:", error);
      }
    } else {
      console.log("No character locations to save to localStorage");
    }
  }, [characterLocations]);
  const updateCharacterLocation = (characterId, row, col) => {
    console.log(
      `Updating character location: id=${characterId}, row=${row}, col=${col}`
    );

    // Ensure characterId is consistent format (as a string)
    const idToUse = String(characterId);

    if (row === null && col === null) {
      // Remove character location
      setCharacterLocations((prev) => {
        // Check for both possible ID formats
        const filtered = prev.filter(
          (loc) => String(loc.characterId) !== idToUse
        );
        console.log("After removal:", filtered);
        return filtered;
      });
    } else {
      // Update or add character location
      setCharacterLocations((prev) => {
        // Filter using string comparison to avoid type mismatches
        const filtered = prev.filter(
          (loc) => String(loc.characterId) !== idToUse
        );
        const newLocations = [...filtered, { characterId: idToUse, row, col }];
        console.log("Updated locations:", newLocations);
        return newLocations;
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
