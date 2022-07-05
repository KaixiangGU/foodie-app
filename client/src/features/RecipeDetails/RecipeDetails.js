import React, { useEffect } from "react";
import { Paper, Grid, Box, Typography, Divider, CircularProgress, Link } from "@mui/material";
import AspectRatio from "@mui/joy/AspectRatio";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getRecipe, clear } from "./RecipeDetailSlice";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import PeopleIcon from "@mui/icons-material/People";

const RecipeDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const recipe = useSelector((state) => state.recipe);

  useEffect(() => {
    dispatch(getRecipe(id));
    dispatch(clear());
  }, [id]);

  if (recipe.length == 0) {
    return <CircularProgress />;
  }

  return (
    <Grid
      container
      sx={{ width: "60%", mx: "auto", ["@media (max-width: 900px)"]: { width: "100%" } }}
    >
      <Grid item xs={12} sx={{ width: "100%", mb: 2 }}>
        <Box>
          <AspectRatio objectFit="cover">
            <img src={recipe.image} alt={`${recipe.title}`} />
          </AspectRatio>
        </Box>
      </Grid>
      <Grid item xs={12} sx={{ textAlign: "center", mt: -16, mb: 3, zIndex: "99" }}>
        <Paper
          elevation={6}
          sx={{
            backgroundColor: "orange",
            width: "60%",
            minHeight: "180px",
            color: "white",
            mx: "auto",
            p: 2,
          }}
        >
          <Typography variant="h3" component="h1" sx={{ fontFamily: "Tiro Devanagari Marathi" }}>
            {recipe.title}
          </Typography>
          <Typography variant="h6" component="h2" color="info">
            Created by {recipe.author}
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-evenly",
              mt: 2,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <AccessTimeIcon fontSize="large" sx={{ mr: 0.5 }} />
              <Typography variant="h6" component="span">
                {recipe.cookTime}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <PeopleIcon fontSize="large" sx={{ mr: 0.5 }} />
              <Typography variant="h6" component="span">
                {recipe.servings}{" "}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <RestaurantIcon fontSize="large" sx={{ mr: 0.5 }} />
              <Typography variant="h6" component="span">
                {recipe.difficulty}
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Grid>
      <Grid item xs={8} md={4} sx={{ mx: "auto" }}>
        <Typography variant="h4" sx={{ textAlign: "center", p: 2 }}>
          Ingredients
        </Typography>
        <Box>
          {recipe.ingredients.map((ingredient, index) => (
            <Box sx={{ mb: 1 }}>
              <Typography variant="body1" component="span">
                {index + 1}. &nbsp;
              </Typography>
              <Typography variant="body1" component="span">
                {ingredient.amount}&nbsp;
              </Typography>
              <Typography variant="body1" component="span">
                {ingredient.name}
              </Typography>
            </Box>
          ))}
        </Box>
      </Grid>
      <Grid item xs={8} md={6} sx={{ mx: "auto" }}>
        <Typography variant="h4" sx={{ textAlign: "center", p: 2 }}>
          Methods
        </Typography>
        {recipe.methods.map((method, index) => (
          <Box sx={{ mb: 1 }}>
            <Typography variant="body1" sx={{ fontWeight: "800" }}>{`Step ${
              index + 1
            }`}</Typography>
            <Typography variant="body1">{method.method}</Typography>
          </Box>
        ))}
      </Grid>
      <Grid item xs={12} sx={{ textAlign: "center", p: 4 }}>
        <Link href="/" variant="h6">
          Back to home
        </Link>
      </Grid>
    </Grid>
  );
};

export default RecipeDetails;
