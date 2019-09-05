import axios from "axios";

export default {
  // Saves a User to the database
  createUser: function (userData) {
    return axios.post("/create", userData);
  },
  // Deletes the User with the given id
  updateUserToDo: function (id, userData) {
    return axios.post("/User/" + id, userData);
  },
  // Gets the User with the given id
  getUser: function (id) {
    return axios.get("/user/" + id);
  },
  // Deletes the User with the given id
  deleteUser: function (id) {
    return axios.delete("/User/" + id);
  }
};
