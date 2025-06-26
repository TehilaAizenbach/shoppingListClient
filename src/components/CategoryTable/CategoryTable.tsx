import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  useTheme,
  Box,
} from "@mui/material";
import { CategoryWithProducts } from "../CategoriesProducts/CategoriesProducts";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

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

const CategoryTable: React.FC<Props> = ({
  categories,
  getProductCountLabel,
  onDecrease,
  onIncrease,
  loading,
}) => {
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
                    {product ? (
                      <>
                        <Box>{product.name} (כמות: {product.quantity})</Box>
                        <Box sx={{ display: "flex", justifyContent: "center", gap: 1 }}>
                          <IconButton
                            size="small"
                            onClick={() => onDecrease(product.id)}
                            disabled={loading || product.quantity <= 0}
                            aria-label={`הפחתת כמות של ${product.name}`}
                          >
                            <RemoveIcon fontSize="small" />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() => onIncrease(product.id)}
                            disabled={loading}
                            aria-label={`הוספת כמות של ${product.name}`}
                          >
                            <AddIcon fontSize="small" />
                          </IconButton>
                        </Box>
                      </>
                    ) : (
                      ""
                    )}
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
