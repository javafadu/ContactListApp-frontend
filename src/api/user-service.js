import axios from "axios";
import { settings } from "../utils/settings";
import authHeader from "./auth-header";

const API_URL = settings.apiURL;


export const login = (credentials) => {
    return axios.post(`${API_URL}/login`, credentials);
};

export const register = (user) => {
    return axios.post(`${API_URL}/register`, user);
};

export const getAuthUser = () => {
    return axios.get(`${API_URL}/users`, { headers: authHeader() });
};

export const getUserWithId = (userId) => {
    return axios.get(`${API_URL}/users/${userId}`, {
      headers: authHeader(),
    });
  };



export const getAllUsers = (
    page = 0,
    size = 6,
    sort = "id",
    direction = "ASC",
    q = ""
) => {
    return axios.get(
        `${API_URL}/users/all?page=${page}&size=${size}&sort=${sort}&direction=${direction}&q=${q}`,
        {
            headers: authHeader(),
        }
    );
};

export const createUser = (user) => {
    return axios.post(`${API_URL}/users`, user, {
      headers: authHeader(),
    });
  };

  export const updateUser = (userId, user) => {
    return axios.put(`${API_URL}/users/${userId}`, user, {
      headers: authHeader(),
    });
  };
  
  export const deleteUser = (userId) => {
    return axios.delete(`${API_URL}/users/${userId}`, {
      headers: authHeader(),
    });
  };

