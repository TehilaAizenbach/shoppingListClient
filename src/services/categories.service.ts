import axios from "axios";
import { Category } from "../types/category";

export const getCategories = async (): Promise<Category[]> => {
  const response = await axios.get('http://localhost:3000/categories');
  return response.data;
};

