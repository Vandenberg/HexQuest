import React from "react";
import DataList from "../data/DataDisplay";
import { useCharacterData } from "../contexts/CharacterDataContext";

const Players = () => {
  // Use the shared character data context instead of fetching it again
  const { characters: data, loading, error } = useCharacterData();

  return (
    <div className="players-page">
      <>
        {error && (
          <div
            style={{
              color: "red",
              padding: "10px",
              margin: "10px 0",
              backgroundColor: "#ffeeee",
              border: "1px solid #ffaaaa",
            }}
          >
            Error: {error}
          </div>
        )}
        {loading && <div>Loading character data...</div>}
      </>
      <h1>Players</h1>
      <DataList data={data} />
    </div>
  );
};

export default Players;
