import React, { useState } from "react";
import { TextField, Button, Flex, Box } from "@radix-ui/themes";
import { ChevronUpIcon, ChevronDownIcon } from "@radix-ui/react-icons";

const NumberInput = ({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  width = "100px",
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
            style={{ padding: "4px", borderRadius: "0 4px 0 0", lineHeight: 1 }}
          >
            <ChevronUpIcon />
          </Button>
          <Button
            variant="soft"
            onClick={handleDecrement}
            style={{ padding: "4px", borderRadius: "0 0 4px 0", lineHeight: 1 }}
          >
            <ChevronDownIcon />
          </Button>
        </Flex>
      </Box>
    </Flex>
  );
};
