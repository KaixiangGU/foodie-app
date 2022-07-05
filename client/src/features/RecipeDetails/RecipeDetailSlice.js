import { createSlice } from "@reduxjs/toolkit";
import * as api from "../../api";

export const recipeDetailSlice = createSlice({
  name: "recipe",
  initialState: [],
  reducers: {
    getRecipeDetail(recipe, action) {
      return action.payload;
    },

    clear(recipe, action) {
      return [];
    },
  },
});

export const getRecipe = (id) => async (dispatch) => {
  try {
    const { data } = await api.fetchRecipe(id);
    dispatch(getRecipeDetail(data));
  } catch (error) {
    console.log(error);
  }
};

export const { getRecipeDetail, clear } = recipeDetailSlice.actions;

export default recipeDetailSlice.reducer;
