import { configureStore } from "@reduxjs/toolkit";
import recipeReducer from "../features/RecipeCards/RecipeSlice";
import RecipeDetailReducer from "../features/RecipeDetails/RecipeDetailSlice";

const store = configureStore({
  reducer: {
    recipes: recipeReducer,
    recipe: RecipeDetailReducer,
  },
});

export default store;
