import axios from "axios";
import { axiosProtected, axiosPublic } from "../config/axiosConfig";

export const getStoreItems = async () => {
  try {
    const { data } = await axiosPublic.get(`/api/product/get-products`);
    console.log("response status is: ", data);
    return Array(data);
  } catch (error) {
    //no need to implement axios errors in here
    if (axios.isAxiosError(error)) {
      console.log("error message: ", error.message);
      return error.message;
    } else {
      console.log("unexpected error: ", error);
      return "An unexpected error occurred";
    }
  }
};