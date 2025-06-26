import React, { useCallback } from "react";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import CategoryCardList from "../CategoryCardList/CategoryCardList";
import CategoryTable from "../CategoryTable/CategoryTable";
import { ShoppingItem } from "../../types/shopping_Item";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../store";
import { addOrUpdateItem, decreaseItemQuantity } from "../../store/itemsSlice";

export interface CategoryWithProducts {
  id: number;
  name: string;
  products: ShoppingItem[];
}

interface Props {
  categories: CategoryWithProducts[];
}

const CategoriesProducts = ({ categories }: Props) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const dispatch = useDispatch<AppDispatch>();

  const loading = useSelector((state: RootState) => state.items.loading);
  const items = useSelector((state: RootState) => state.items.items);

  const getProductCountLabel = useCallback(
    (categoryName: string, products: { quantity: number }[]) => {
      const total = products.reduce((sum, p) => sum + p.quantity, 0);
      if (total === 0) return `${categoryName} - לא קיימים מוצרים`;
      if (total === 1) return `${categoryName} - מוצר אחד`;
      return `${categoryName} - ${total} מוצרים`;
    },
    []
  );

  const handleDecrease = useCallback(
    (id: number) => {
      dispatch(decreaseItemQuantity(id));
    },
    [dispatch]
  );

  const handleIncrease = useCallback(
    (id: number) => {
      const item = items.find((i) => i.id === id);
      if (!item) return;

      dispatch(
        addOrUpdateItem({
          name: item.name,
          categoryId: item.category.id,
          quantity: 1,
        })
      );
    },
    [dispatch, items]
  );

  if (categories.length === 0) {
    return (
      <Typography sx={{ mt: 3, textAlign: "center" }}>
        אין קטגוריות להצגה
      </Typography>
    );
  }

  return (
    <Box sx={{ width: "100%", mt: 3, p: 2 }}>
      <Typography variant="h6" sx={{ mb: 2, textAlign: "center" }}>
        נא לאסוף מוצרים אלו במחלקות המתאימות
      </Typography>

      {isMobile ? (
        <CategoryCardList
          categories={categories}
          getProductCountLabel={getProductCountLabel}
          onIncrease={handleIncrease}
          onDecrease={handleDecrease}
          loading={loading}
        />
      ) : (
        <CategoryTable
          categories={categories}
          getProductCountLabel={getProductCountLabel}
          onIncrease={handleIncrease}
          onDecrease={handleDecrease}
          loading={loading}
        />
      )}
    </Box>
  );
};

export default CategoriesProducts;
