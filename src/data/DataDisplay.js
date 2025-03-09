import React, { useContext, useState } from "react";
import { CharacterLocationContext } from "../contexts/CharacterLocationContext";

const DataList = ({ data }) => {
  const { characterLocations, updateCharacterLocation } = useContext(
    CharacterLocationContext
  );

  const handleRemove = (characterId) => {
    updateCharacterLocation(characterId, null, null);
  };

  // Find location for a specific character ID
  const getCharacterLocation = (characterId) => {
    return characterLocations.find((loc) => loc.characterId === characterId);
  };

  // Generate grid coordinates based on grid size
  const generateCoordinates = (rows = 10, cols = 10) => {
    const coords = [];
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        coords.push({ row, col });
      }
    }
    return coords;
  };

  // Component for location selector
  const LocationSelector = ({ character }) => {
    const [selectedLocation, setSelectedLocation] = useState({
      row: 0,
      col: 0,
    });
    const currentLocation = getCharacterLocation(character.character_id);

    const handleLocationChange = (e) => {
      const [row, col] = e.target.value.split(",").map(Number);
      setSelectedLocation({ row, col });
      updateCharacterLocation(character.character_id, row, col);
    };

    return (
      <div style={{ display: "flex", alignItems: "center" }}>
        {currentLocation ? (
          <>
            <span>
              [{currentLocation.row}, {currentLocation.col}]
            </span>
            <button
              onClick={() => handleRemove(character.character_id)}
              style={{ marginLeft: "8px", padding: "2px 5px" }}
            >
              ✕
            </button>
          </>
        ) : (
          <select
            value={`${selectedLocation.row},${selectedLocation.col}`}
            onChange={handleLocationChange}
          >
            <option value="">-- Select Location --</option>
            {generateCoordinates().map((coord) => (
              <option
                key={`${coord.row},${coord.col}`}
                value={`${coord.row},${coord.col}`}
              >
                [{coord.row}, {coord.col}]
              </option>
            ))}
          </select>
        )}
      </div>
    );
  };

  if (characterLocations.length === 0) {
    console.log("WARNING: no character locations set yet");
  }

  // Add error handling for non-array data
  if (!data || !Array.isArray(data) || data.length === 0) {
    return (
      <div>
        <h2>Data from Database:</h2>
        <p>
          No character data available. The server might be down or returned an
          error.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h2>Data from Database:</h2>
      <table>
        <thead>
          <tr>
            <th>Character ID</th>
            <th>Name</th>
            <th>Class</th>
            <th>Profession</th>
            <th>Race</th>
            <th>Specialization</th>
            <th>Current Party</th>
            <th>Character ID</th>
            <th>Character Name</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.character_id}>
              <td>{item.character_id}</td>
              <td>{item.name}</td>
              <td>{item.class}</td>
              <td>{item.profession}</td>
              <td>{item.race}</td>
              <td>{item.character_specialization}</td>
              <td>{item.current_party}</td>
              <td>{item.character_id}</td>
              <td>{item.character_name}</td>
              <td>
                <LocationSelector character={item} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataList;
