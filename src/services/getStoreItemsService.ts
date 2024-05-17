import axios from "axios";
import {axiosPublic} from "../config/axiosConfig";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

interface Res1 {
  data: Product[];
  page: number;
  last_page: number;
  total: number;
}

export const getStoreItemsService = async (pageNo:number): Promise<Res1> => {
  try {
    const { data } = await axiosPublic.get(`/api/product/get-products?page=${pageNo}`);
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