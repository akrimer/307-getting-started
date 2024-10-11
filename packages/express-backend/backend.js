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

// function to find users by name/job
const findUsersByNameAndJob = (name, job) => {
  return users["users_list"].filter(
    (user) => user["name"] === name && user["job"] === job
  );
};

// Function to add a new user
const addUser = (user) => {
  users["users_list"].push(user);
  return user;
};

// Function to find a user by ID
const findUserById = (id) => {
  return users["users_list"].find((user) => user["id"] === id);
};

// function to delete a user by ID
const deleteUserById = (id) => {
  const index = users["users_list"].findIndex((user) => user["id"] === id);
  if (index !== -1) {
    users["users_list"].splice(index, 1); // Remove the user from the list
    return true;
  } else {
    return false;
  }
};

// Default route that sends "Hello World!"
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Extended /users route to return the entire list or filter by name and job
app.get("/users", (req, res) => {
  const name = req.query.name;
  const job = req.query.job;

  if (name !== undefined && job !== undefined) {
    // Return users that match both name and job
    let result = findUsersByNameAndJob(name, job);
    result = { users_list: result };
    res.send(result);
  } else if (name !== undefined) {
    // Return users that match the name
    let result = findUserByName(name);
    result = { users_list: result };
    res.send(result);
  } else {
    // Return the entire users list
    res.send(users);
  }
});

// POST for /users to add a new user
app.post("/users", (req, res) => {
  const userToAdd = req.body; // Extract the new user data from the request body
  addUser(userToAdd); // Add the new user to the list
  res.status(200).send(); // Respond with status 200 (OK)
});

// DELETE /users/:id to remove a user by their ID
app.delete("/users/:id", (req, res) => {
  const id = req.params.id; // Extract 'id' from the URL
  const result = deleteUserById(id);
  if (result) {
    res.status(200).send(`User with id ${id} deleted.`);
  } else {
    res.status(404).send("Resource not found.");
  }
});

// /users/:id route to get a user by ID
app.get("/users/:id", (req, res) => {
  const id = req.params.id; // Extract 'id' from the URL
  let result = findUserById(id);
  if (result === undefined) {
    res.status(404).send("Resource not found."); // Returns 404 if user not found
  } else {
    res.send(result); // Send the user if found
  }
});

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

