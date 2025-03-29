import React, { useContext, useState } from "react";
import { CharacterLocationContext } from "../contexts/CharacterLocationContext";
// import LocationSelector from "../components/LocationSelector";
import CharacterLocationSelector from "../components/CharacterLocationSelector";
import { Table, Button } from "@radix-ui/themes";
import "../styles/dropdown-menu.css";

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

  // Generate grid coordinates based on actual grid size
  const generateCoordinates = () => {
    const rows = 8; // Match the height in HexagonalGrid
    const cols = 7; // Match the width in HexagonalGrid
    const coords = [];
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        coords.push({ row, col });
      }
    }
    return coords;
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
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Character ID</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Class</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Profession</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Race</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Specialization</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Current Party</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Character ID</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Character Name</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Location</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data.map((item) => (
            <Table.Row key={item.character_id}>
              <Table.Cell>{item.character_id}</Table.Cell>
              <Table.Cell>{item.name}</Table.Cell>
              <Table.Cell>{item.class}</Table.Cell>
              <Table.Cell>{item.profession}</Table.Cell>
              <Table.Cell>{item.race}</Table.Cell>
              <Table.Cell>{item.character_specialization}</Table.Cell>
              <Table.Cell>{item.current_party}</Table.Cell>
              <Table.Cell>{item.character_id}</Table.Cell>
              <Table.Cell>{item.character_name}</Table.Cell>
              <Table.Cell>
                <CharacterLocationSelector character={item} />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export default DataList;
