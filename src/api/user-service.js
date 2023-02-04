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

