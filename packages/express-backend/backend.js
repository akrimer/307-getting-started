//backend.js
import express from "express";
import cors from "cors"; 
import mongoose from "mongoose"; 
import dotenv from "dotenv"; 
import userService from './services/user-services.js'; 

dotenv.config(); 

const { MONGO_CONNECTION_STRING } = process.env; 

mongoose.set("debug", true);

mongoose
  .connect(MONGO_CONNECTION_STRING)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.log('Error connecting to MongoDB:', error));

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

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

app.post("/users", (req, res) => {
  const userToAdd = req.body;
  userService.createUser(userToAdd)
    .then(newUser => res.status(201).json(newUser)) 
    .catch(error => res.status(400).json({ message: error.message }));
});

app.delete("/users/:id", (req, res) => {
  const id = req.params.id;
  userService.deleteUser(id)
    .then(() => res.status(204).send()) 
    .catch(error => res.status(404).json({ message: "Resource not found." }));
});

app.get("/users/:id", (req, res) => {
  const id = req.params.id;
  userService.getUserById(id)
    .then(user => {
      if (!user) return res.status(404).send("Resource not found.");
      res.json(user);
    })
    .catch(error => res.status(500).json({ message: error.message }));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

