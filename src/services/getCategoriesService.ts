import axios from "axios";
import {axiosPublic} from "../config/axiosConfig";

interface CategoryList {
  id: number;
  name: string;
  description: string;
}

export const getCategoriesService = async (): Promise<CategoryList[]> => {
  try {
    const { data } = await axiosPublic.get(`/api/category/category-list`);
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