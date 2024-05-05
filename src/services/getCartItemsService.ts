import axios from "axios";
import {axiosPublic} from "../config/axiosConfig";

interface Item {
  id: number;
  name: string;
  price: number;
  image: string;
}

export const getCartItemsService = async (productIds: number[]): Promise<Item[]> => {
  try {
    const { data } = await axiosPublic.post(`/api/product/cart-details`,{ productIds });
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