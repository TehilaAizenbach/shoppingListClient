import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ShoppingItem } from "../types/shopping_Item";
import * as api from "../services/itemService";
import { RootState } from ".";

interface ItemsState {
  items: ShoppingItem[];
  loading: boolean;
  error: string | null;
}

const initialState: ItemsState = {
  items: [],
  loading: false,
  error: null,
};

// שליפת כל הפריטים
export const getItems = createAsyncThunk<ShoppingItem[]>(
  "items/getItems",
  async () => {
    return await api.getItems();
  }
);

// הוספה או עדכון כמות
export const addOrUpdateItem = createAsyncThunk<
  ShoppingItem,
  { name: string; categoryId: number; quantity: number },
  { state: RootState }
>(
  "items/addOrUpdateItem",
  async ({ name, categoryId, quantity }, { getState }) => {
    const state = getState();
    const existing = state.items.items.find(
      (item) =>
        item.name.trim().toLowerCase() === name.trim().toLowerCase() &&
        item.category.id === categoryId
    );

    if (existing) {
      const updatedQuantity = existing.quantity + quantity;
      return await api.updateItemQuantity(existing.id, updatedQuantity);
    } else {
      return await api.addItem({ name, categoryId, quantity });
    }
  }
);

// הפחתת כמות או מחיקה (מחזיר אובייקט עם id ופריט אופציונלי)
export const decreaseItemQuantity = createAsyncThunk<
  { id: number; item?: ShoppingItem },
  number,
  { state: RootState }
>("items/decreaseItemQuantity", async (id, { getState, rejectWithValue }) => {
  const state = getState();
  const item = state.items.items.find((i) => i.id === id);

  if (!item) return rejectWithValue("Item not found");

  if (item.quantity <= 1) {
    await api.deleteItem(id);
    return { id }; // פריט נמחק, לא מחזירים פריט
  }

  const updatedItem = await api.updateItemQuantity(id, item.quantity - 1);
  return { id, item: updatedItem };
});

const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(getItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getItems.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(getItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "שגיאה בטעינת הפריטים";
      })

      .addCase(addOrUpdateItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addOrUpdateItem.fulfilled, (state, action) => {
        const updatedItem = action.payload;
        const idx = state.items.findIndex((i) => i.id === updatedItem.id);
        if (idx !== -1) {
          state.items[idx] = updatedItem;
        } else {
          state.items.push(updatedItem);
        }
        state.loading = false;
      })
      .addCase(addOrUpdateItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "שגיאה בהוספת/עדכון פריט";
      })

      .addCase(decreaseItemQuantity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(decreaseItemQuantity.fulfilled, (state, action) => {
        const { id, item } = action.payload;

        if (!item) {
          state.items = state.items.filter((i) => i.id !== id);
        } else {
          const index = state.items.findIndex((i) => i.id === id);
          if (index !== -1) {
            state.items[index] = item;
          }
        }

        state.loading = false;
      })
      .addCase(decreaseItemQuantity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "שגיאה בהפחתת כמות";
      });
  },
});

export default itemsSlice.reducer;
