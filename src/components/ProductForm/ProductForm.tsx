import React, { useState, useRef } from "react";
import {
  Box,
  Button,
  Stack,
  TextField,
  InputAdornment,
  Menu,
  MenuItem,
  Drawer,
  List,
  ListItemButton,
  useMediaQuery,
  useTheme,
  CircularProgress,
} from "@mui/material";
import { ArrowDropDown } from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../store";
import { addOrUpdateItem } from "../../store/itemsSlice";
import { Category } from "../../types/category";

const ProductForm = () => {
  const { loading: itemsLoading } = useSelector((state: RootState) => state.items);
  const { categories, loading: categoriesLoading } = useSelector((state: RootState) => state.categories);
  const items = useSelector((state: RootState) => state.items.items);
  const dispatch = useDispatch<AppDispatch>();

  const [productName, setProductName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [menuWidth, setMenuWidth] = useState<number>(0);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    if (isMobile) {
      setDrawerOpen(true);
    } else {
      setAnchorEl(e.currentTarget);
      if (wrapperRef.current) {
        setMenuWidth(wrapperRef.current.offsetWidth);
      }
    }
  };

  const handleSelectCategory = (category: Category) => {
    setSelectedCategory(category);
    setAnchorEl(null);
    setDrawerOpen(false);
  };

  const handleAddProduct = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // מונע רפרש/ניווט
    if (!selectedCategory || !productName.trim()) return;

    const existingItem = items.find(
      (item) =>
        item.name.trim().toLowerCase() === productName.trim().toLowerCase() &&
        item.category.id === selectedCategory.id
    );

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
      <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 2, width: 300 }}>
      <Stack spacing={2}>
        <TextField
          label="מוצר"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />

        <div
          ref={wrapperRef}
          style={{ display: "flex", flex: 1, minWidth: 120 }}
          onClick={handleClick}
        >
          <TextField
            label="קטגוריה"
            value={selectedCategory?.name || ""}
            InputProps={{
              readOnly: true,
              endAdornment: (
                <InputAdornment position="end">
                  <ArrowDropDown />
                </InputAdornment>
              ),
              sx: {
                cursor: "pointer",
                caretColor: "transparent",
              },
            }}
            fullWidth
          />
        </div>

        {!isMobile && (
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
            PaperProps={{
              sx: { width: `${menuWidth}px` },
            }}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
          >
            {categories.map((cat) => (
              <MenuItem key={cat.id} onClick={() => handleSelectCategory(cat)}>
                {cat.name}
              </MenuItem>
            ))}
          </Menu>
        )}

        {isMobile && (
          <Drawer anchor="bottom" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
            <List>
              {categories.map((cat) => (
                <ListItemButton key={cat.id} onClick={() => handleSelectCategory(cat)}>
                  {cat.name}
                </ListItemButton>
              ))}
            </List>
          </Drawer>
        )}

        {/* חשוב להגדיר type="button" למנוע התנהגות submit ברירת מחדל */}
        <Button variant="contained" onClick={handleAddProduct} type="button">
          הוסף
        </Button>
      </Stack>
    </Box>
  );
};

export default ProductForm;
