import { configureStore } from "@reduxjs/toolkit";
import recipeReducer from "../features/RecipeCards/RecipeSlice";
import RecipeDetailReducer from "../features/RecipeDetails/RecipeDetailSlice";
import authSlice from "../features/Auth/AuthSlice";

const store = configureStore({
  reducer: {
    recipes: recipeReducer,
    recipe: RecipeDetailReducer,
    auth: authSlice,
  },
});

export default store;
