import { useSelector } from "react-redux";
import CategoriesProducts from "../../components/CategoriesProducts/CategoriesProducts";
import Header from "../../components/Header/Header";
import ProductFrom from "../../components/ProductForm/ProductForm";
import CategorySelect from "../../components/Selected/CategorySelect";
import Selected from "../../components/Selected/CategorySelect";
import TotalItems from "../../components/TotalItems/TotalItems";
import { RootState } from "../../store";
import ProductForm from "../../components/ProductForm/ProductForm";

import { Box, CircularProgress, Typography } from "@mui/material";

const Home = () => {
  const categories = useSelector((state: RootState) => state.categories.categories);
  const items = useSelector((state: RootState) => state.items.items);
  const categoriesLoading = useSelector((state: RootState) => state.categories.loading);
  const itemsLoading = useSelector((state: RootState) => state.items.loading);

  if (categoriesLoading || itemsLoading) {
    return (
      <Box
        sx={{
          height: "100vh",           // גובה מלא של המסך
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          bgcolor: "background.default",
          color: "text.secondary",
          p: 2,
        }}
      >
        <CircularProgress size={60} thickness={5} />
        <Typography variant="h6" sx={{ mt: 2 }}>
          טוען נתונים, אנא המתן...
        </Typography>
      </Box>
    );
  }

  const categoriesWithProducts = categories.map((category) => ({
    id: category.id,
    name: category.name || "לא ידוע",
    products: items.filter((item) => item.category.id === category.id),
  }));

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Header />
      <TotalItems />
      <ProductForm />
      <CategoriesProducts categories={categoriesWithProducts} />
    </div>
  );
};

export default Home;

