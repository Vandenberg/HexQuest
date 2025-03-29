import React, { useState, useEffect } from "react";
import DataList from "../data/DataDisplay";

const Players = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:3001/data")
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Server returned ${response.status}: ${response.statusText}`
          );
        }
        return response.json();
      })
      .then((responseData) => {
        // Additional check to ensure we have an array
        if (!Array.isArray(responseData)) {
          console.error("Server returned non-array data:", responseData);
          setData([]);
          setError("Server returned invalid data format");
        } else {
          console.log("Fetched data:", responseData);
          setData(responseData);
          // Store character data globally for components that can't access React context easily
          window.characterData = responseData;
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError(error.message || "Failed to fetch character data");
        setData([]);
        // Set empty array as fallback
        window.characterData = [];
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

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
