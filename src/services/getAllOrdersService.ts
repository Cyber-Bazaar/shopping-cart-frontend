import axios from "axios";
import {axiosProtected} from "../config/axiosConfig";

interface Item {
  id: number;
  name: string;
  price: number;
  image: string;
}

export const getAllOrdersService = async(accessToken:string) => {
  try {
    const { data } = await axiosProtected.get(`/api/order`,{headers: {
      Authorization: `Bearer ${accessToken}`,
    },});
    console.log(data);
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