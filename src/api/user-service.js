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

