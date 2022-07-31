import React from "react";
import { Typography, Card, CardContent, CardMedia, Divider, Box, IconButton } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import PeopleIcon from "@mui/icons-material/People";
import DeleteIcon from "@mui/icons-material/Delete";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons/faPenToSquare";
import { deleteRecipe, updateRecipe } from "./RecipeSlice";
import { useDispatch } from "react-redux";
import { useStateContext } from "../../context/StateContext";
import { useNavigate } from "react-router-dom";
import "./styles.css";

const RecipeCard = ({ recipe }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { setSelectedRecipeId } = useStateContext();
  const user = JSON.parse(localStorage.getItem("profile"));

  const handleLikeRecipe = (id) => {
    const newRecipe = { ...recipe, favorite: !recipe.favorite };
    dispatch(updateRecipe(id, newRecipe));
  };

  return (
    <Card
      sx={{
        minWidth: "200px",
      }}
    >
      <CardMedia
        component="img"
        height="180"
        image={recipe.image}
        className="cardImage"
        sx={{ position: "relative", cursor: "pointer" }}
        onClick={() => navigate(`/${recipe._id}`)}
      />
      <CardContent sx={{ ":last-child": { pb: 1 } }}>
        <Typography
          variant="h6"
          gutterBottom
          sx={{ fontFamily: "Tiro Devanagari Marathi", fontSize: "1.2rem" }}
        >
          {recipe.title}
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <AccessTimeIcon fontSize="small" sx={{ mr: 0.5 }} />
            <Typography variant="subtitle2" component="span">
              {recipe.cookTime}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <PeopleIcon fontSize="small" sx={{ mr: 0.5 }} />
            <Typography variant="subtitle2" component="span">
              {recipe.servings}{" "}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <RestaurantIcon fontSize="small" sx={{ mr: 0.5 }} />
            <Typography variant="subtitle2" component="span">
              {recipe.difficulty}
            </Typography>
          </Box>
        </Box>
        <Divider sx={{ my: 1 }} />
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="subtitle2" component="p" color="textSecondary" sx={{ flex: 1 }}>
            Created by {recipe.author}
          </Typography>
          {(user?._id || user?.sub) && (
            <IconButton size="small" onClick={() => handleLikeRecipe(recipe._id)}>
              {recipe.favorite ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
            </IconButton>
          )}
          {(user?._id === recipe.creator || user?.sub === recipe.creator) && (
            <>
              <IconButton size="small" onClick={() => setSelectedRecipeId(recipe._id)}>
                <FontAwesomeIcon icon={faPenToSquare} />
              </IconButton>
              <IconButton size="small" onClick={() => dispatch(deleteRecipe(recipe._id))}>
                <DeleteIcon />
              </IconButton>
            </>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default RecipeCard;
