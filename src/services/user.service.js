import axios from "axios";

const API_URL = "http://localhost:3000/api/test/";

const getPublicContent = () => {
  return axios.get(API_URL + "all");
};

const getUserBoard = () => {
  return axios.get(API_URL + "all");
};

const getModeratorBoard = () => {
  return axios.get(API_URL + "mod");
};

axios.defaults.withCredentials = true; // Enable sending cookies with requests

const getAdminBoard = () => {
  
  return axios.get(API_URL + 'admin',  { withCredentials: true });
};

getAdminBoard()
  .then(response => {
    // Handle the successful response here
    console.log(response.data);
  })
  .catch(error => {
    // Handle any errors that occurred during the request
    console.error(error);
  });

const UserService = {
  getPublicContent,
  getUserBoard,
  getModeratorBoard,
  getAdminBoard,
};

export default UserService;
