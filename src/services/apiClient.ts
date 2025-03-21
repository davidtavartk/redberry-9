import axios from "axios";

export const personalToken = "9e7cc5ba-31c9-4a65-89c3-44ba0ee96aac";
const baseURL = "https://momentum.redberryinternship.ge/api";

const api = axios.create({
    baseURL,
    headers: {
      Authorization: `Bearer ${personalToken}`,
    },
  });

export default api;