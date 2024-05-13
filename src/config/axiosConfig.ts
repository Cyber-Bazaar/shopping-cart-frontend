import axios from "axios"; 

const baseUrl = process.env.REACT_APP_API_SERVER_URL;

export const axiosPublic = axios.create({
  baseURL: `http://172.28.54.22:5000`,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const axiosProtected = axios.create({
  baseURL: `http://172.28.54.22:5000`,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const setAuthToken = async (token:any) => {
  axiosProtected.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};