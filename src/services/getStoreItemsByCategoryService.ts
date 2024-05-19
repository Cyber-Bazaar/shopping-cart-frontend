import axios from "axios";
import {axiosPublic} from "../config/axiosConfig";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}


export const getStoreItemsByCategoryService = async (id:number): Promise<Product[]> => {
  try {
    const { data } = await axiosPublic.get(`/api/product/category/${id}`);
    return data.data;
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