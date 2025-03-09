# HexQuestHexQuest Project Overview

HexQuest is a web application for visualizing and managing a tabletop role-playing game world. The application features a 3D hexagonal grid map that represents different terrain types and displays character data from a database.

# Core Technologies

Frontend: React with Three.js for 3D visualization
Backend: Express server with MySQL database
Build Tools: Webpack with SWC for fast compilation
Main Components
HexagonalGrid.js: Creates a 3D grid of hexagons using React Three Fiber
Hexagon.js: Renders individual hexagon cells with different terrain types (forest, lake, plains, swamp, mountain)
App.js: Main application that combines all components and fetches data
DataDisplay.js: Displays character data from the database

# Data Structure

The project uses several data files:

terrainData.js: Defines terrain types for each hex cell
locations.js: Stores points of interest (mill, castle)

# Game Context

This is a web interface for a "West Marches-style" tabletop RPG using a custom system called HEXQUEST, which combines elements from Pathfinder, Forbidden Lands, D&D 5e, and OSR games.

The application serves as a visualization tool for both the game master and players to track characters, view the game world, and manage game data.
