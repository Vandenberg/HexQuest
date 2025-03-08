import React, { useEffect, useState } from "react";
import { MDXProvider } from "@mdx-js/react";
import Introduction from "../content/Introduction.mdx";
import DataList from "../data/DataDisplay";
import Layout from "./Layout";
import HexagonalGrid from "./HexagonalGrid";
// import PortalComponent from './PortalComponent';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/data")
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched data:", data);
        setData(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <MDXProvider>
      <Layout>
        <>
          <Introduction />
          <HexagonalGrid width={7} height={8} size={10} />
          <DataList data={data} />
        </>
      </Layout>
    </MDXProvider>
  );
}

export default App;
