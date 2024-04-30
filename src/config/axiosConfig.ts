import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios"; 

const baseUrl = process.env.REACT_APP_API_SERVER_URL;

export const axiosPublic = axios.create({
  baseURL: baseUrl,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const axiosProtected = axios.create({
  baseURL: baseUrl,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const setAuthToken = async (token:any) => {
  axiosProtected.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};