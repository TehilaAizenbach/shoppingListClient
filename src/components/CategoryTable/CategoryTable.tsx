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
}

const CategoryTable: React.FC<Props> = ({ categories }) => {
  const theme = useTheme();
  const maxProducts = Math.max(...categories.map((c) => c.products.length), 0);

  return (
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
  );
};

export default CategoryTable;
