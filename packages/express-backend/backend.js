// backend.js
import express from "express";
import cors from "cors";  // Import cors
import mongoose from "mongoose"; // Import mongoose
import dotenv from "dotenv"; // Import dotenv to load environment variables
import userService from './services/user-services.js'; // Import the user service layer

dotenv.config(); // Load environment variables from .env file

const { MONGO_CONNECTION_STRING } = process.env; // Get the MongoDB connection string from .env

// Enable mongoose debug mode (optional for logging queries during development)
mongoose.set("debug", true);

// Connect to MongoDB using the connection string from .env
mongoose
  .connect(MONGO_CONNECTION_STRING)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.log('Error connecting to MongoDB:', error));

const app = express();
const port = 8000;

app.use(cors()); // Enable CORS
app.use(express.json()); // Parse incoming JSON requests

// Default route that sends "Hello World!"
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// GET /users: Return all users or filter by name and job
app.get("/users", (req, res) => {
  const { name, job } = req.query;

  if (name && job) {
    userService.getUsersByNameAndJob(name, job)
      .then(users => res.json({ users_list: users }))
      .catch(error => res.status(500).json({ message: error.message }));
  } else if (name) {
    userService.getUsersByName(name)
      .then(users => res.json({ users_list: users }))
      .catch(error => res.status(500).json({ message: error.message }));
  } else {
    userService.getAllUsers()
      .then(users => res.json({ users_list: users }))
      .catch(error => res.status(500).json({ message: error.message }));
  }
});

// POST /users: Add a new user
app.post("/users", (req, res) => {
  const userToAdd = req.body;
  userService.createUser(userToAdd)
    .then(newUser => res.status(201).json(newUser)) // 201 Created
    .catch(error => res.status(400).json({ message: error.message }));
});

// DELETE /users/:id: Delete a user by ID
app.delete("/users/:id", (req, res) => {
  const id = req.params.id;
  userService.deleteUser(id)
    .then(() => res.status(204).send()) // 204 No Content
    .catch(error => res.status(404).json({ message: "Resource not found." }));
});

// GET /users/:id: Find a user by ID
app.get("/users/:id", (req, res) => {
  const id = req.params.id;
  userService.getUserById(id)
    .then(user => {
      if (!user) return res.status(404).send("Resource not found.");
      res.json(user);
    })
    .catch(error => res.status(500).json({ message: error.message }));
});

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

