import React from "react";
import { Box, Card, CardContent, Typography, useTheme, IconButton } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import { CategoryWithProducts } from "../CategoriesProducts/CategoriesProducts";

interface Props {
  categories: CategoryWithProducts[];
  getProductCountLabel: (
    name: string,
    products: { quantity: number }[]
  ) => string;
  onDecrease: (id: number) => void;
  onIncrease: (id: number) => void;
  loading: boolean;
}

const CategoryCardList: React.FC<Props> = ({
  categories,
  getProductCountLabel,
  onDecrease,
  onIncrease,
  loading,
}) => {
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
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <IconButton
                      size="small"
                      onClick={() => onDecrease(product.id)}
                      disabled={loading || product.quantity <= 0}
                      aria-label={`הפחתת כמות של ${product.name}`}
                    >
                      <Remove />
                    </IconButton>
                    <span>{product.quantity}</span>
                    <IconButton
                      size="small"
                      onClick={() => onIncrease(product.id)}
                      disabled={loading}
                      aria-label={`הוספת כמות של ${product.name}`}
                    >
                      <Add />
                    </IconButton>
                  </Box>
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
