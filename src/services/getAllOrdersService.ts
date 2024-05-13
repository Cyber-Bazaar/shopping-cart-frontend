import axios from "axios";
import {axiosProtected} from "../config/axiosConfig";

export const getAllOrdersService = async(accessToken:string) => {
  try {
    const { data } = await axiosProtected.get(`/api/order`,{headers: {
      Authorization: `Bearer ${accessToken}`,
    },});
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("error message: ", error.message);
      throw error; 
    } else {
      console.log("unexpected error: ", error);
      throw new Error("An unexpected error occurred");
    }
  }
};