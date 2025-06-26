import React, { useState } from "react";
import { Box, Button, Stack, TextField, CircularProgress } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../store";
import { addOrUpdateItem } from "../../store/itemsSlice";
import CategorySelector from "../CategorySelector/CategorySelector";
import { Category } from "../../types/category";

const ProductForm = () => {
  const { loading: itemsLoading } = useSelector((state: RootState) => state.items);
  const { categories, loading: categoriesLoading } = useSelector((state: RootState) => state.categories);
  const items = useSelector((state: RootState) => state.items.items);
  const dispatch = useDispatch<AppDispatch>();

  const [productName, setProductName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  const handleAddProduct = () => {
    if (!selectedCategory || !productName.trim()) return;

    const exists = items.some(
      (item) =>
        item.name.trim().toLowerCase() === productName.trim().toLowerCase() &&
        item.category.id === selectedCategory.id
    );

    if (exists) {
      return;
    }

    dispatch(
      addOrUpdateItem({
        name: productName.trim(),
        categoryId: selectedCategory.id,
        quantity: 1,
      })
    );

    setProductName("");
    setSelectedCategory(null);
  };

  if (itemsLoading || categoriesLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 2, width: 300 }}>
      <Stack spacing={2}>
        <TextField
          label="מוצר"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          autoFocus
        />

        <CategorySelector
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        <Button variant="contained" onClick={handleAddProduct} type="button" disabled={!productName.trim() || !selectedCategory}>
          הוסף
        </Button>
      </Stack>
    </Box>
  );
};

export default ProductForm;
