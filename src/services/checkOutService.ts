import axios from "axios";
import {axiosProtected} from "../config/axiosConfig";
import { JsonObjectExpressionStatement } from "typescript";

interface Item {
  id: number;
  name: string;
  price: number;
  image: string;
}

type Order = {
  first_name:string;
  last_name:string;
  address_line1:string;
  address_line2:string;
  zip_code:number;
  shipping_method:string;
  orderInfo: {
    productId: number;
    unitPrice: number;
    quantity: number;
  }[];
}

export const checkOutService = async (orderData: Order,accessToken:string) => {
  try {
    console.log("orderData: ", orderData)
    const { data } = await axiosProtected.post(`/api/order/create`,orderData,{headers: {
      Authorization: `Bearer ${accessToken}`,
    },});
    return data.message;
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