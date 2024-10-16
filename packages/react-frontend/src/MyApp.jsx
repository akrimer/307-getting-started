// src/MyApp.jsx
import React, { useState, useEffect } from "react";
import Table from "./Table";
import Form from "./Form";

function MyApp() {
  const [characters, setCharacters] = useState([]);

  // Function to fetch users from the backend
  function fetchUsers() {
    return fetch("http://localhost:8000/users");
  }

  // Use useEffect to fetch users when the component first mounts
  useEffect(() => {
    fetchUsers()
      .then((res) => res.json()) // Parse response as JSON
      .then((json) => setCharacters(json["users_list"])) // Update state with users list
      .catch((error) => {
        console.log(error); // Handle any errors
      });
  }, []); // Empty dependency array to run effect only on component mount

  // Function to remove one character
  function removeOneCharacter(id) {
    fetch(`http://localhost:8000/users/${id}`, {
      method: 'DELETE',
    })
    .then((response) => {
      if (response.status === 204) {
        const updated = characters.filter((character) => character.id !== id);
        setCharacters(updated);
      } else {
        console.log("Failed to delete user");
      }
    })
    .catch((error) => console.log(error));
  }

  // Function to POST a new user to the backend
  function postUser(person) {
    return fetch("http://localhost:8000/users", {
      method: "POST", // Define method as POST
      headers: {
        "Content-Type": "application/json", // Set content type to JSON
      },
      body: JSON.stringify(person), // Convert person object to JSON string
    })
    .then((response) => {
      if (response.status === 201) {
        return response.json(); // Parse the JSON of the newly created user
      } else {
        throw new Error("Failed to create user");
      }
    });
  }

  // Updated function to add a new user
  function updateList(person) {
    postUser(person)
      .then((newUser) => setCharacters([...characters, newUser])) // Add new user to the state with ID
      .catch((error) => {
        console.log(error); // Handle errors from the POST request
      });
  }

  return (
    <div className="container">
      <Table
        characterData={characters}
        removeCharacter={removeOneCharacter}
      />
      <Form handleSubmit={updateList} />
    </div>
  );
}

export default MyApp;

