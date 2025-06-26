import React, { useState } from "react";
import { Button, Stack, TextField, CircularProgress } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../store";
import { addOrUpdateItem } from "../../store/itemsSlice";
import CategorySelector from "../CategorySelector/CategorySelector";
import { Category } from "../../types/category";
import { FormContainer } from "./ProductForm.style";

const ProductForm = () => {
  const { loading: itemsLoading } = useSelector(
    (state: RootState) => state.items
  );
  const { categories, loading: categoriesLoading } = useSelector(
    (state: RootState) => state.categories
  );
  const items = useSelector((state: RootState) => state.items.items);
  const dispatch = useDispatch<AppDispatch>();

  const [productName, setProductName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );

  const handleAddProduct = () => {
    if (!selectedCategory || !productName.trim()) return;

    const exists = items.some(
      (item) =>
        item.name.trim().toLowerCase() === productName.trim().toLowerCase() &&
        item.category.id === selectedCategory.id
    );

    if (exists) {
      // אפשר להוסיף כאן הודעה למשתמש אם רוצים
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
      <FormContainer sx={{ display: "flex", justifyContent: "center", p: 3 }}>
        <CircularProgress />
      </FormContainer>
    );
  }

  return (
    <FormContainer>
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

        <Button
          variant="contained"
          onClick={handleAddProduct}
          type="button"
          disabled={!productName.trim() || !selectedCategory}
        >
          הוסף
        </Button>
      </Stack>
    </FormContainer>
  );
};

export default ProductForm;
