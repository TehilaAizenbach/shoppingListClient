import axios from "axios";
import { ShoppingItem } from "../types/shopping_Item";

const API_URL = "http://localhost:3000/shopping-items";

// קבלת כל הפריטים
export async function getItems(): Promise<ShoppingItem[]> {
  const response = await axios.get(API_URL);
  console.log("list", response.data);
  return response.data;
}

// הוספת פריט חדש - שולחים categoryId ישירות
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
    categoryId, // ✅ שליחה תקינה ל־DTO
    quantity,
  });
  return response.data;
}

// עדכון כמות פריט קיים
export async function updateItemQuantity(
  id: number,
  quantity: number
): Promise<ShoppingItem> {
  const response = await axios.put(`${API_URL}/${id}`, { quantity });
  return response.data;
}
