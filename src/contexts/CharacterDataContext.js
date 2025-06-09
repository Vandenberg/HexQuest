import React, { createContext, useState, useEffect, useContext } from "react";

export const CharacterDataContext = createContext({
  characters: [],
  loading: false,
  error: null,
});

export const CharacterDataProvider = ({ children }) => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch character data once when the app loads
  useEffect(() => {
    const fetchCharacterData = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:3001/data");

        if (!response.ok) {
          throw new Error(
            `Server returned ${response.status}: ${response.statusText}`
          );
        }

        const data = await response.json();

        // Additional check to ensure we have an array
        if (!Array.isArray(data)) {
          console.error("Server returned non-array data:", data);
          setCharacters([]);
          setError("Server returned invalid data format");
        } else {
          console.log("Fetched character data:", data);
          setCharacters(data);
          // Also store in window for backward compatibility
          window.characterData = data;
        }
      } catch (error) {
        console.error("Error fetching character data:", error);
        setError(error.message || "Failed to fetch character data");
        setCharacters([]);
        window.characterData = [];
      } finally {
        setLoading(false);
      }
    };

    fetchCharacterData();
  }, []);

  return (
    <CharacterDataContext.Provider
      value={{
        characters,
        loading,
        error,
      }}
    >
      {children}
    </CharacterDataContext.Provider>
  );
};

// Custom hook for using character data
export const useCharacterData = () => {
  const context = useContext(CharacterDataContext);
  if (context === undefined) {
    throw new Error(
      "useCharacterData must be used within a CharacterDataProvider"
    );
  }
  return context;
};
