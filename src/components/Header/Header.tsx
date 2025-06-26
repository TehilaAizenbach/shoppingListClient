import { AppBar, Toolbar, Typography } from "@mui/material";

const Header = () => {
  return (
    <AppBar position="static" color="primary">
      <Toolbar sx={{ justifyContent: "center" }}>
        <Typography variant="h6">רשימת קניות</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
