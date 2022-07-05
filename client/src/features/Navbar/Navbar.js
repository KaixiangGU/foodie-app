import React from "react";
import { AppBar, Typography, IconButton, Toolbar, Button, Tooltip } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../../context/StateContext";

const Navbar = () => {
  const { setShowForm, setShowFavoriteRecipes, showFavoriteRecipes } = useStateContext();
  const navigate = useNavigate();

  return (
    <AppBar color="default" position="static" sx={{ paddingX: 3, paddingY: 1 }}>
      <Toolbar justify="space-between">
        <Typography
          variant="h4"
          sx={{ flexGrow: 1, fontFamily: "Volkhov", cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          Foodie
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          size="large"
          color="success"
          sx={{ mr: 2 }}
          disableRipple
          onClick={() => setShowForm(true)}
        >
          New Recipe
        </Button>
        <Tooltip title="Show favorite recipes">
          <IconButton sx={{ mr: 2 }} onClick={() => setShowFavoriteRecipes(!showFavoriteRecipes)}>
            {showFavoriteRecipes ? (
              <FavoriteIcon color="error" size="large" sx={{ fontSize: 30 }} />
            ) : (
              <FavoriteBorderIcon size="large" sx={{ fontSize: 30 }} />
            )}
          </IconButton>
        </Tooltip>
        <IconButton>
          <SearchIcon fontSize="large" />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
