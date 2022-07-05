import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useStateContext } from "../../context/StateContext";
import RecipeCard from "../RecipeCards/RecipeCard";
import { Grid, Box, CircularProgress, createTheme, ThemeProvider } from "@mui/material";

const Recipes = () => {
  const { showFavoriteRecipes } = useStateContext();
  const theme = createTheme({
    breakpoints: {
      values: {
        xs: 100,
        sm: 900,
        md: 1150,
      },
    },
  });

  const allRecipes = useSelector((state) => state.recipes.recipes);
  const favoriteRecipes = allRecipes.filter((recipe) => recipe.favorite === true);

  const recipes = showFavoriteRecipes ? favoriteRecipes : allRecipes;
  // console.log(recipes);
  const loading = useSelector((state) => state.recipes.loading);

  return (
    <Box sx={{ mt: 5 }}>
      <Grid
        container
        sx={{ width: "95%", maxWidth: "1600px", mx: "auto" }}
        justifyContent="space-evenly"
      >
        {loading ? (
          <CircularProgress />
        ) : (
          recipes.map((recipe) => (
            <ThemeProvider theme={theme} key={recipe._id}>
              <Grid
                item
                xs={5}
                sm={3.5}
                md={2.5}
                key={recipe._id}
                sx={{ mb: 6, position: "relative" }}
              >
                <RecipeCard recipe={recipe} />
              </Grid>
            </ThemeProvider>
          ))
        )}
      </Grid>
    </Box>
  );
};

export default Recipes;
