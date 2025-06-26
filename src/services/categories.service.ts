import axios from "axios";
import { Category } from "../types/category";

const apiUrl = process.env.REACT_APP_API_URL;

export const getCategories = async (): Promise<Category[]> => {
  const response = await axios.get(`${apiUrl}/categories`);
  return response.data;
};

