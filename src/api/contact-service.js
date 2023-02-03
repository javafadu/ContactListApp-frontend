import axios from "axios";

const { settings } = require("../utils/settings");

const API_URL = settings.apiURL;

const getAllContacts = () => {
    return axios.get(`${API_URL}/contacts`) 
}


export {getAllContacts};