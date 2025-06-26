  import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
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

  export const addOrUpdateItem = createAsyncThunk(
    "items/addOrUpdateItem",
    async (
      { name, categoryId, quantity }: { name: string; categoryId: number; quantity: number },
      { getState }
    ) => {
      const state = getState() as RootState;
      
      const existing = state.items.items.find(
        (item) =>
          item.name.trim().toLowerCase() === name.trim().toLowerCase() &&
          item.category.id === categoryId   
      );
      
      let updatedItem;
      if (existing) {
        const updatedQuantity = existing.quantity + quantity;
        updatedItem = await api.updateItemQuantity(existing.id, updatedQuantity);
      } else {
        updatedItem = await api.addItem({ name,categoryId , quantity });

      }
      return updatedItem;
    }
  );



  export const getItems = createAsyncThunk<ShoppingItem[]>("items/getItems", async () => {
    const items = await api.getItems();
    return items;
  });
  const itemsSlice = createSlice({
    name: "items",
    initialState,
    reducers: {
    },
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
          state.error = action.error.message || "שגיאה כללית";
        });
    },
  });

  export default itemsSlice.reducer;
