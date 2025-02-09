// this file contains the functions to send requests and submit the form to the backend for login and register
import { registerReq, loginReq } from "../apis/auth";

const services = {
  // registier
  async register(data) {
    const response = await registerReq(data);
    if (response) {
      localStorage.setItem("token", response.token);
      return true;
    } else {
      return response; // this will return the error message
    }
  },

  // login
  async login(data) {
    const response = await loginReq(data);
    if (response) {
      localStorage.setItem("token", response.token);
      return true;
    } else {
      return response; // this will return the error message
    }
  },

  // logout
  logout() {
    localStorage.removeItem("token");
  },
};

export default services;
