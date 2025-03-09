import React, { useContext, useState } from "react";
import { CharacterLocationContext } from "../contexts/CharacterLocationContext";

const CharacterLocationSelector = () => {
  const { characters, allCoordinates, updateCharacterLocation } = useContext(
    CharacterLocationContext
  );
  const [selectedCharacter, setSelectedCharacter] = useState("");
  const [selectedLocation, setSelectedLocation] = useState({ row: 0, col: 0 });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedCharacter) {
      updateCharacterLocation(
        selectedCharacter,
        selectedLocation.row,
        selectedLocation.col
      );
    }
  };

  return (
    <div className="character-location-form">
      <h3>Assign Character Location</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Select Character:</label>
          <select
            value={selectedCharacter}
            onChange={(e) => setSelectedCharacter(e.target.value)}
            required
          >
            <option value="">-- Select Character --</option>
            {characters.map((character) => (
              <option key={character.id} value={character.id}>
                {character.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Select Location:</label>
          <select
            value={`${selectedLocation.row},${selectedLocation.col}`}
            onChange={(e) => {
              const [row, col] = e.target.value.split(",").map(Number);
              setSelectedLocation({ row, col });
            }}
            required
          >
            {allCoordinates.map((coord) => (
              <option
                key={`${coord.row},${coord.col}`}
                value={`${coord.row},${coord.col}`}
              >
                [{coord.row}, {coord.col}]
              </option>
            ))}
          </select>
        </div>

        <button type="submit">Assign Location</button>
      </form>
    </div>
  );
};

export default CharacterLocationSelector;
