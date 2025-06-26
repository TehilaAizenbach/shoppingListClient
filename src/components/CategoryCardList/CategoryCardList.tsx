import React from "react";
import { Box, Card, CardContent, Typography, useTheme } from "@mui/material";
import { CategoryWithProducts } from "../CategoriesProducts/CategoriesProducts";

interface Props {
  categories: CategoryWithProducts[];
  getProductCountLabel: (name: string, products: { quantity: number }[]) => string;

}
const CategoryCardList: React.FC<Props> = ({ categories,getProductCountLabel }) => {
  const theme = useTheme();

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      {categories.map((category) => (
        <Card key={category.id} elevation={3}>
          <Box
            sx={{
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.primary.contrastText,
              px: 2,
              py: 1.5,
              fontWeight: "bold",
              fontSize: "1.1rem",
            }}
          >
            {getProductCountLabel(category.name, category.products)}
          </Box>

          <CardContent sx={{ p: 0 }}>
            {category.products.length === 0 ? (
              <Typography sx={{ p: 2, color: "text.secondary" }}>
                אין מוצרים בקטגוריה זו
              </Typography>
            ) : (
              category.products.map((product, idx) => (
                <Box
                  key={product.id}
                  sx={{
                    borderBottom:
                      idx === category.products.length - 1
                        ? "none"
                        : `1px solid ${theme.palette.divider}`,
                    px: 2,
                    py: 1.5,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    fontSize: "1rem",
                  }}
                >
                  <span>{product.name}</span>
                  <span>כמות: {product.quantity}</span>
                </Box>
              ))
            )}
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default CategoryCardList;
