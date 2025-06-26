import React, { useRef, useState } from "react";
import {
  Menu,
  MenuItem,
  Drawer,
  List,
  ListItemButton,
  TextField,
  InputAdornment,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { ArrowDropDown } from "@mui/icons-material";
import { Category } from "../../types/category";
import { WrapperDiv } from "./CategorySelector.style";

type Props = {
  categories: Category[];
  selectedCategory: Category | null;
  onSelectCategory: (cat: Category) => void;
};

const CategorySelector: React.FC<Props> = ({
  categories,
  selectedCategory,
  onSelectCategory,
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [menuWidth, setMenuWidth] = useState<number>(0);
  const [drawerOpen, setDrawerOpen] = useState(false);

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

  const handleClose = () => {
    setAnchorEl(null);
    setDrawerOpen(false);
  };

  const handleSelect = (cat: Category) => {
    onSelectCategory(cat);
    handleClose();
  };

  return (
    <>
      <WrapperDiv ref={wrapperRef} onClick={handleClick}>
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
            sx: { caretColor: "transparent" },
          }}
          fullWidth
        />
      </WrapperDiv>

      {!isMobile && (
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          PaperProps={{ sx: { width: `${menuWidth}px` } }}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
        >
          {categories.map((cat) => (
            <MenuItem key={cat.id} onClick={() => handleSelect(cat)}>
              {cat.name}
            </MenuItem>
          ))}
        </Menu>
      )}

      {isMobile && (
        <Drawer anchor="bottom" open={drawerOpen} onClose={handleClose}>
          <List>
            {categories.map((cat) => (
              <ListItemButton key={cat.id} onClick={() => handleSelect(cat)}>
                {cat.name}
              </ListItemButton>
            ))}
          </List>
        </Drawer>
      )}
    </>
  );
};

export default CategorySelector;
