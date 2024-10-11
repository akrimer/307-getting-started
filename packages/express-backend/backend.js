// backend.js
import express from "express";

const app = express();
const port = 8000;

app.use(express.json());

// Users list (data to be served at the /users endpoint)
const users = {
  users_list: [
    {
      id: "xyz789",
      name: "Charlie",
      job: "Janitor"
    },
    {
      id: "abc123",
      name: "Mac",
      job: "Bouncer"
    },
    {
      id: "ppp222",
      name: "Mac",
      job: "Professor"
    },
    {
      id: "yat999",
      name: "Dee",
      job: "Aspiring actress"
    },
    {
      id: "zap555",
      name: "Dennis",
      job: "Bartender"
    }
  ]
};

app.get("/", (req, res) => {
  res.send("Hello World!");
});

//  send the users list as a response
app.get("/users", (req, res) => {
  res.send(users);  // Responds with the users list in JSON
});

// Start the server and listen on the  port
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

