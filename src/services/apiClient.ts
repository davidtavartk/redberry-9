import axios from "axios";

export const personalToken = "9e68c438-82c7-4b07-b10f-0a8fd7cb4416";
const baseURL = "https://momentum.redberryinternship.ge/api";

const api = axios.create({
    baseURL,
    headers: {
      Authorization: `Bearer ${personalToken}`,
    },
  });

export default api;