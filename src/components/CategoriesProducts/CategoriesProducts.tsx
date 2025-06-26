import React from "react";
import {
  Box,
  Card,
  List,
  ListItem,
  Typography,
  useMediaQuery,
  useTheme,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Divider,
  CardContent,
} from "@mui/material";
import { ShoppingItem } from "../../types/shopping_Item";

interface CategoryWithProducts {
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

  // למצוא כמה שורות הכי גדולות בטבלה (לפי הקטגוריה עם הכי הרבה מוצרים)
  const maxProducts = Math.max(...categories.map((c) => c.products.length), 0);

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
        // --- מובייל: רשימת קארדים ---
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
                {category.name}
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
      ) : (
        // --- דסקטופ: טבלה ---
        <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
          <Table>
            <TableHead>
              <TableRow>
                {categories.map((category) => (
                  <TableCell
                    key={category.id}
                    align="center"
                    sx={{
                      backgroundColor: theme.palette.primary.main,
                      color: theme.palette.primary.contrastText,
                      fontWeight: "bold",
                      fontSize: "1.1rem",
                    }}
                  >
                    {category.name}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.from({ length: maxProducts }).map((_, rowIndex) => (
                <TableRow key={rowIndex}>
                  {categories.map((category) => {
                    const product = category.products[rowIndex];
                    return (
                      <TableCell
                        key={category.id}
                        align="center"
                        sx={{ fontSize: "1rem" }}
                      >
                        {product
                          ? `${product.name} (כמות: ${product.quantity})`
                          : ""}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};



export default CategoriesProducts;
