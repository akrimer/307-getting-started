
// services/user-service.js
import mongoose from "mongoose";
import User from '../models/user.js'; // Import the User model

// Get all users
function getAllUsers() {
  return User.find().exec(); // Fetch all users from MongoDB
}

// Get users by name
function getUsersByName(name) {
  return User.find({ name }).exec(); // Fetch users from MongoDB that match the name
}

// Get users by name and job
function getUsersByNameAndJob(name, job) {
  return User.find({ name, job }).exec(); // Fetch users from MongoDB that match both name and job
}

// Create a new user
function createUser(userData) {
  const user = new User(userData);
  return user.save(); // Save the new user to MongoDB
}

// Get a user by ID
function getUserById(id) {
  return User.findById(id).exec(); // Fetch a user from MongoDB by their ID
}

// Delete a user by ID
function deleteUser(id) {
  return User.findByIdAndDelete(id).exec(); // Delete a user from MongoDB by their ID
}

export default {
  getAllUsers,
  getUsersByName,
  getUsersByNameAndJob,
  createUser,
  getUserById,
  deleteUser,
};

