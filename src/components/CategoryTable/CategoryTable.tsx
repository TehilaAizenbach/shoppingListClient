import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  useTheme,
} from "@mui/material";
import { CategoryWithProducts } from "../CategoriesProducts/CategoriesProducts";

interface Props {
  categories: CategoryWithProducts[];
  getProductCountLabel: (name: string, products: { quantity: number }[]) => string;

}

const CategoryTable: React.FC<Props> = ({ categories, getProductCountLabel }) => {
  const theme = useTheme();
  const maxProducts = Math.max(...categories.map((c) => c.products.length), 0);

  return (
    <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
      <Table>
        <TableHead>
          <TableRow>
            {categories.map((category) => (
              <TableCell
                key={`header-${category.id}`}
                align="center"
                sx={{
                  backgroundColor: theme.palette.primary.main,
                  color: theme.palette.primary.contrastText,
                  fontWeight: "bold",
                  fontSize: "1.1rem",
                  textAlign: "center",
                }}
              >
                {getProductCountLabel(category.name, category.products)}
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
                    key={`product-${category.id}-${rowIndex}`}
                    align="center"
                    sx={{ fontSize: "1rem", textAlign: "center" }}
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
  );
};

export default CategoryTable;
