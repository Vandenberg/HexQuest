const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const path = require("path");
const app = express();
const port = 3001;

app.use(cors());

// Database connection
const db = mysql.createConnection({
  host: "s241.webhostingserver.nl",
  user: "deb2001824_hexquester",
  password: "ENH6gMkRRFGYfg2Zetze",
  database: "deb2001824_hexquester",
  port: 3306,
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database", err);
    return;
  }
  console.log("Connection to the database established");
});

// API endpoint
app.get("/data", (req, res) => {
  db.query("SELECT * FROM characters", (err, result) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.json(result);
  });
});

// Serve static files from the React app (dist folder)
app.use(express.static(path.join(__dirname, "dist")));

// Catch-all handler to serve React's index.html for client-side routing
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
