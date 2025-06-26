import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const TotalItems = () => {
  const items = useSelector((state: RootState) => state.items.items);
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: {
          xs: "center",
          sm: "flex-end",
        },
        alignItems: "center",
        p: {
          xs: "10px",
          sm: "10px 50px",
        },
      }}
    >
      <Typography variant="h6" fontWeight="bold">
        סה"כ: {totalQuantity} מוצר{totalQuantity !== 1 ? "ים" : ""}
      </Typography>
    </Box>
  );
};

export default TotalItems;
