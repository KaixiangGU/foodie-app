import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useStateContext } from "../../context/StateContext";
import RecipeCard from "../RecipeCards/RecipeCard";
import { Grid, Box, CircularProgress, createTheme, ThemeProvider } from "@mui/material";

const Recipes = () => {
  const { filterRecipes } = useStateContext();
  const theme = createTheme({
    breakpoints: {
      values: {
        xs: 100,
        sm: 600,
        md: 1150,
        lg: 1500,
      },
    },
  });

  const AllRecipes = useSelector((state) => state.recipes.recipes);
  const filteredRecipes = useSelector((state) => state.recipes.filteredRecipes);

  const recipes = !filterRecipes ? AllRecipes : filteredRecipes;

  const loading = useSelector((state) => state.recipes.loading);

  return (
    <Grid
      container
      justifyContent="center"
      columnSpacing={2}
      sx={{ width: "95%", maxWidth: "1600px", mx: "auto", mt: 5 }}
      zeroMinWidth={false}
    >
      {loading ? (
        <CircularProgress />
      ) : (
        recipes.map((recipe) => (
          <ThemeProvider theme={theme} key={recipe._id}>
            <Grid
              item
              xs={10}
              sm={5}
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
  );
};

export default Recipes;
