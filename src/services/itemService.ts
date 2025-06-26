import axios from "axios";
import { ShoppingItem } from "../types/shopping_Item";

const API_URL = `${ process.env.REACT_APP_API_URL}/shopping-items`;


export async function getItems(): Promise<ShoppingItem[]> {
  const response = await axios.get(API_URL);
  return response.data;
}


export async function addItem({
  name,
  categoryId,
  quantity,
}: {
  name: string;
  categoryId: number;
  quantity: number;
}): Promise<ShoppingItem> {
  const response = await axios.post(API_URL, {
    name,
    categoryId,
    quantity,
  });
  return response.data;
}


export async function updateItemQuantity(
  id: number,
  quantity: number
): Promise<ShoppingItem> {
  const response = await axios.put(`${API_URL}/${id}`, { quantity });
  return response.data;
}

export async function deleteItem(id: number): Promise<void> {
  await axios.delete(`${API_URL}/${id}`);
}