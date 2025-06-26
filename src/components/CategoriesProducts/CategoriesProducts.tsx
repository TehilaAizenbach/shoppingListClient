import React from "react";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import CategoryCardList from "../CategoryCardList/CategoryCardList";
import CategoryTable from "../CategoryTable/CategoryTable";
import { ShoppingItem } from "../../types/shopping_Item";

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
        <CategoryCardList categories={categories} />
      ) : (
        <CategoryTable categories={categories} />
      )}
    </Box>
  );
};

export default CategoriesProducts;
