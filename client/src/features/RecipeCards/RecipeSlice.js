import { createSlice } from "@reduxjs/toolkit";
import * as api from "../../api";

export const recipeSlice = createSlice({
  name: "recipes",
  initialState: {
    loading: false,
    recipes: [],
  },
  reducers: {
    fetchAll(state, action) {
      state.recipes = action.payload;
    },

    create(state, action) {
      state.recipes = [...state.recipes, action.payload];
    },

    deleteRecipeReducer(state, action) {
      state.recipes = state.recipes.filter((recipe) => recipe._id !== action.payload);
    },

    update(state, action) {
      state.recipes = state.recipes.map((recipe) =>
        recipe._id === action.payload._id ? action.payload : recipe
      );
    },

    setLoading(state, action) {
      state.loading = action.payload;
    },
  },
});

export const getRecipes = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const { data } = await api.fetchRecipes();
    dispatch(setLoading(false));
    dispatch(fetchAll(data));
  } catch (error) {
    console.log(error);
  }
};

export const createRecipe = (recipe) => async (dispatch) => {
  try {
    const { data } = await api.createRecipe(recipe);
    dispatch(create(data));
  } catch (error) {
    console.log(error);
  }
};

export const deleteRecipe = (id) => async (dispatch) => {
  try {
    await api.deleteRecipe(id);

    dispatch(deleteRecipeReducer(id));
  } catch (error) {
    console.log(error);
  }
};

export const updateRecipe = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updateRecipe(id, post);
    dispatch(update(data));
  } catch (error) {
    console.log(error);
  }
};

export const { create, fetchAll, deleteRecipeReducer, update, setLoading } = recipeSlice.actions;

export default recipeSlice.reducer;
