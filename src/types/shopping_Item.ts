import { Category } from "./category";

export interface ShoppingItem{
  id: number;
  name: string;
  category: Category;
  quantity: number;
}