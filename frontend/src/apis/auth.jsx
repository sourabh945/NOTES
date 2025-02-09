// this file contains the functions to send requests to the backend for login and register

import apiClient from "./main";

import {
  LOGIN,
  SIGNUP, // these are the urls for login and signup
} from "../urls";

async function registerReq(data) {
  try {
    const response = await apiClient.post(SIGNUP, data);
    if (response) {
      if (response.status != 201) {
        const msg = await response.data.message;
        alert(msg);
        return null;
      } else {
        return await response.data;
      }
    }
  } catch (error) {
    console.error(error);
    alert("Unable to send request, Please try again");
    window.location.reload(false);
  }
}

async function loginReq(data) {
  try {
    const response = await apiClient.post(LOGIN, data);
    if (response) {
      if (response.status != 200) {
        const msg = await response.data.message;
        alert(msg);
        return null;
      } else {
        return await response.data;
      }
    }
  } catch (error) {
    console.error(error);
    alert("Unable to send request, Please try again");
    window.location.reload(false);
  }
}

export { registerReq, loginReq };
