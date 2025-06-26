// App.tsx
import React, { useEffect } from "react";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";

import theme from "./theme";
import Home from "./pages/home/home";
import { useDispatch } from "react-redux";
import { AppDispatch } from "./store";
import { fetchCategories } from "./store/categoriesSlice";
import { getItems } from "./store/itemsSlice";

const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

export default function App() {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(getItems());

  }, [dispatch]);

  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div dir="rtl">
          <Home />
        </div>
      </ThemeProvider>
    </CacheProvider>
  );
}
