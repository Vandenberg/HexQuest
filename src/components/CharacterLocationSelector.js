import React, { useState, useContext } from "react";
import { TextField, Button, Flex, Box } from "@radix-ui/themes";
import { ChevronUpIcon, ChevronDownIcon } from "@radix-ui/react-icons";
import { CharacterLocationContext } from "../contexts/CharacterLocationContext";

// Custom NumberInput component with up/down buttons
const NumberInput = ({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  width = "50px",
}) => {
  const handleIncrement = () => {
    const newValue = Math.min(max, value + step);
    onChange(newValue);
  };

  const handleDecrement = () => {
    const newValue = Math.max(min, value - step);
    onChange(newValue);
  };

  const handleChange = (e) => {
    const newValue = parseInt(e.target.value, 10);
    if (!isNaN(newValue) && newValue >= min && newValue <= max) {
      onChange(newValue);
    }
  };

  return (
    <Flex gap="0" align="center">
      <TextField.Root
        value={value}
        onChange={handleChange}
        type="number"
        min={min}
        max={max}
        step={step}
        style={{ width }}
      />
      <Box>
        <Flex direction="column">
          <Button
            variant="soft"
            onClick={handleIncrement}
            style={{
              padding: "2px",
              borderRadius: "0 4px 0 0",
              lineHeight: 1,
              height: "18px",
            }}
          >
            <ChevronUpIcon width="14" height="14" />
          </Button>
          <Button
            variant="soft"
            onClick={handleDecrement}
            style={{
              padding: "2px",
              borderRadius: "0 0 4px 0",
              lineHeight: 1,
              height: "18px",
            }}
          >
            <ChevronDownIcon width="14" height="14" />
          </Button>
        </Flex>
      </Box>
    </Flex>
  );
};

const CharacterLocationSelector = ({ character }) => {
  const { characterLocations, updateCharacterLocation } = useContext(
    CharacterLocationContext
  );

  const [selectedLocation, setSelectedLocation] = useState({
    row: 0,
    col: 0,
  });
  // Find location for a specific character ID
  const getCharacterLocation = (characterId) => {
    // Log for debugging
    console.log(
      `Looking for character ID: ${characterId} in locations:`,
      characterLocations
    );
    return characterLocations.find((loc) => {
      // Check for both possible ID formats
      return (
        loc.characterId === characterId ||
        loc.characterId === parseInt(characterId) ||
        loc.characterId === String(characterId)
      );
    });
  };

  const currentLocation = getCharacterLocation(character.character_id);

  const handleRemove = () => {
    updateCharacterLocation(character.character_id, null, null);
  };

  const handleRowChange = (newRow) => {
    const newLocation = { ...selectedLocation, row: newRow };
    setSelectedLocation(newLocation);
  };

  const handleColChange = (newCol) => {
    const newLocation = { ...selectedLocation, col: newCol };
    setSelectedLocation(newLocation);
  };

  const handleSetLocation = () => {
    updateCharacterLocation(
      character.character_id,
      selectedLocation.row,
      selectedLocation.col
    );
  };

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      {currentLocation ? (
        <>
          <span>
            [{currentLocation.row}, {currentLocation.col}]
          </span>
          <Button
            variant="soft"
            color="red"
            onClick={handleRemove}
            style={{ marginLeft: "8px" }}
          >
            ✕
          </Button>
        </>
      ) : (
        <Flex direction="row" gap="2" align="center">
          <Box>
            <Flex gap="1" align="center">
              <span>R:</span>
              <NumberInput
                value={selectedLocation.row}
                onChange={handleRowChange}
                min={0}
                max={7}
                width="40px"
              />
            </Flex>
          </Box>
          <Box>
            <Flex gap="1" align="center">
              <span>C:</span>
              <NumberInput
                value={selectedLocation.col}
                onChange={handleColChange}
                min={0}
                max={6}
                width="40px"
              />
            </Flex>
          </Box>
          <Button size="1" variant="soft" onClick={handleSetLocation}>
            Set
          </Button>
        </Flex>
      )}
    </div>
  );
};

export default CharacterLocationSelector;
