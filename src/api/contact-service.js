import axios from "axios";

const { settings } = require("../utils/settings");

const API_URL = settings.apiURL;

export const getAllContactsWithPaging = (
    page = 0,
    size = 36,
    sort = "contactName",
    direction = "ASC",
    q = ""
) => {
    return axios.get(
        `${API_URL}/contacts?page=${page}&size=${size}&sort=${sort}&direction=${direction}&q=${q}`
    );
};

