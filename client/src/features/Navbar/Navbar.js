import React, { useState } from "react";
import "./Navbar.css";
import {
  AppBar,
  Typography,
  IconButton,
  Toolbar,
  Button,
  Tooltip,
  Avatar,
  Menu,
  MenuItem,
  Box,
  Divider,
  ListItemIcon,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Logout from "@mui/icons-material/Logout";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";

import { useNavigate } from "react-router-dom";
import { useStateContext } from "../../context/StateContext";
import { useDispatch } from "react-redux";
import { logout } from "../Auth/AuthSlice";
import { getRecipes, favoriteRecipes, myRecipes } from "../RecipeCards/RecipeSlice";

const Navbar = () => {
  const { setShowForm, setIsSignUp, setFilterRecipes } = useStateContext();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const user = JSON.parse(localStorage.getItem("profile"));

  const initials = `${user && user?.name?.split(" ")[0][0]}`;

  const handleShowForm = () => {
    setShowForm(true);
  };

  const handleBackToHome = () => {
    setFilterRecipes(false);
    dispatch(getRecipes());
    navigate("/");
  };

  const handleFavriteRecipes = () => {
    setFilterRecipes(true);
    dispatch(favoriteRecipes());
  };

  const handleMyRecipes = () => {
    setFilterRecipes(true);
    dispatch(myRecipes(user));
  };

  const handleLogout = () => {
    setFilterRecipes(false);
    dispatch(logout());
    navigate("/");
  };

  const handleLogin = () => {
    setIsSignUp(false);
    navigate("/auth");
  };
  const handleSignUp = () => {
    setIsSignUp(true);
    navigate("/auth");
  };
  return (
    <AppBar color="default" position="static" sx={{ paddingX: 3, paddingY: 1 }}>
      <Toolbar justify="space-between">
        <Typography
          variant="h4"
          sx={{ fontFamily: "Volkhov", cursor: "pointer" }}
          onClick={handleBackToHome}
        >
          Foodie
        </Typography>
        <Button
          sx={{
            ml: "auto",
            mr: 2,
            p: 0,
            cursor: "pointer",
            display: { xs: "flex", sm: "none" },
            borderRadius: "50%",
            minWidth: "40px",
            aspectRatio: "1 / 1",
          }}
          disableRipple
          color="success"
          variant="contained"
          disabled={!user?.name ? true : false}
          onClick={handleShowForm}
        >
          <AddIcon />
        </Button>
        <Tooltip title={!user?.name ? "Please log in first." : ""}>
          <Box sx={{ mr: 2, ml: "auto", display: { xs: "none", sm: "block" } }}>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              size="large"
              color="success"
              disableRipple
              onClick={handleShowForm}
              disabled={!user?.name ? true : false}
            >
              New Recipe
            </Button>
          </Box>
        </Tooltip>
        <IconButton sx={{ mr: 2 }}>
          <SearchIcon fontSize="large" />
        </IconButton>
        <Tooltip title="Account">
          <IconButton
            onClick={handleClick}
            size="small"
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            disableRipple
          >
            {user ? (
              <Avatar
                src={user?.picture}
                alt={user?.name}
                children={user ? initials.toUpperCase() : null}
              />
            ) : (
              <Avatar sx={{ width: 35, height: 35 }} />
            )}
          </IconButton>
        </Tooltip>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          {user ? (
            <Box>
              <Typography variant="h5" sx={{ textAlign: "center" }} gutterBottom>
                {user?.name}
              </Typography>
              <Typography variant="body1" fontWeight="bold" sx={{ textAlign: "center" }}>
                Signed in as
              </Typography>
              <Typography variant="body1" sx={{ textAlign: "center" }}>
                {user?.email}
              </Typography>
              <Divider sx={{ mt: 2 }} />
              <MenuItem onClick={handleMyRecipes}>
                <ListItemIcon>
                  <RestaurantMenuIcon fontSize="small" />
                </ListItemIcon>
                My recipes
              </MenuItem>
              <MenuItem onClick={handleFavriteRecipes}>
                <ListItemIcon>
                  <FavoriteBorderIcon fontSize="small" />
                </ListItemIcon>
                My favorites
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Log out
              </MenuItem>
            </Box>
          ) : (
            <Box>
              <MenuItem onClick={handleLogin}>Log in</MenuItem>
              <MenuItem onClick={handleSignUp}>Sign up</MenuItem>
            </Box>
          )}
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
