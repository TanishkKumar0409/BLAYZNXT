import axios from "axios";

export const API = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: { "Content-Type": "multipart/form-data" },
});

export const noFileAPI = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: { "Content-Type": "application/json" },
});
