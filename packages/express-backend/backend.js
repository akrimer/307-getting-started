// backend.js
import express from "express";

const app = express();
const port = 8000;

app.use(express.json());

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

// Find user by name function
const findUserByName = (name) => {
  return users["users_list"].filter(
    (user) => user["name"] === name
  );
};

// find user by ID function 
const findUserById = (id) => {
  return users["users_list"].find(
    (user) => user["id"] === id
  );
};

// Default route that sends "Hello World!"
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// /users route that either returns the entire list of users or filters by name if a query parameter is provided
app.get("/users", (req, res) => {
  const name = req.query.name;
  if (name !== undefined) {
    let result = findUserByName(name);
    result = { users_list: result };
    res.send(result);
  } else {
    res.send(users);
  }
});


app.get("/users/:id", (req, res) => {
  const id = req.params.id; // Extract 'id' parameter from the URL
  let result = findUserById(id);
  if (result === undefined) {
    res.status(404).send("Resource not found."); // Return 404 if user is not found
  } else {
    res.send(result); // Send the user if found
  }
});

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

