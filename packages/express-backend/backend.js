// backend.js
import express from "express";

const app = express();
const port = 8000;

app.use(express.json()); // Allows us to parse incoming JSON requests

// Users list (data to be served at the /users endpoint)
const users = {
  users_list: [
    { id: "xyz789", name: "Charlie", job: "Janitor" },
    { id: "abc123", name: "Mac", job: "Bouncer" },
    { id: "ppp222", name: "Mac", job: "Professor" },
    { id: "yat999", name: "Dee", job: "Aspiring actress" },
    { id: "zap555", name: "Dennis", job: "Bartender" }
  ]
};

// Function to find a user by name
const findUserByName = (name) => {
  return users["users_list"].filter((user) => user["name"] === name);
};

// new Function to add a new user
const addUser = (user) => {
  users["users_list"].push(user);
  return user;
};

// Function to find a user by ID
const findUserById = (id) => {
  return users["users_list"].find((user) => user["id"] === id);
};

// Default route that sends "Hello World!"
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// /users route that either returns the entire list or filters by name
app.get("/users", (req, res) => {
  const name = req.query.name; // Extract 'name' query parameter
  if (name !== undefined) {
    let result = findUserByName(name);
    result = { users_list: result }; // Format the result in the same structure
    res.send(result);
  } else {
    res.send(users); // Return the full users list if no name is provided
  }
});

// POST for /users to add a new user
app.post("/users", (req, res) => {
  const userToAdd = req.body; // Extract the new user data from the request body
  addUser(userToAdd); // Add the new user to the list
  res.status(200).send(); // Respond with status 200 (OK)
});

// /users/:id route to get a user by ID
app.get("/users/:id", (req, res) => {
  const id = req.params.id; // Extract 'id' from the URL
  let result = findUserById(id);
  if (result === undefined) {
    res.status(404).send("Resource not found."); // Returns 404 if usr not found
  } else {
    res.send(result); // Send the user if found
  }
});

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

