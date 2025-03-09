import React, { useEffect, useState } from "react";
import { MDXProvider } from "@mdx-js/react";
import Introduction from "../content/Introduction.mdx";
import DataList from "../data/DataDisplay";
import Layout from "./Layout";
import HexagonalGrid from "./HexagonalGrid";
import { CharacterLocationProvider } from "../contexts/CharacterLocationContext";

function App() {
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
    <MDXProvider>
      <Layout>
        <>
          <Introduction />
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
          <CharacterLocationProvider>
            <HexagonalGrid width={7} height={8} size={10} />
            <DataList data={data} />
          </CharacterLocationProvider>
        </>
      </Layout>
    </MDXProvider>
  );
}

export default App;
