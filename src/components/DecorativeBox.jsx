import React from "react";

const DecorativeBox = ({
  width = "auto",
  height = "64px",
  style = {},
  ...props
}) => {
  return (
    <div
      style={{
        width,
        height,
        background:
          "repeating-linear-gradient(45deg, #333, #333 10px, #444 10px, #444 20px)",
        border: "1px solid #555",
        borderRadius: "4px",
        ...style,
      }}
      {...props}
    />
  );
};

export default DecorativeBox;
