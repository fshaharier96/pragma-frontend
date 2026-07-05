import axios from "axios";
import API_BASE_URL from "../config";

export const authHeaders = () => ({
  Authorization: "Bearer " + localStorage.getItem("token"),
  "Content-Type": "application/json",
  Accept: "application/json",
});

export const deleteEntity = (endpoint, id) =>
  axios.delete(`${API_BASE_URL}${endpoint}/${id}`, {
    headers: authHeaders(),
    withCredentials: true,
  });
