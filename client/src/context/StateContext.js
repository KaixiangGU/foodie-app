import mongoose from "mongoose";
import React, { useContext, createContext, useState, useEffect } from "react";

const Context = createContext();
export const useStateContext = () => useContext(Context);

const emptyRecipe = {
  title: "",
  author: "",
  cookTime: "",
  servings: 0,
  difficulty: "",
  image: "",
  ingredients: [{ _id: mongoose.Types.ObjectId().toString(), name: "", amount: "" }],
  methods: [{ _id: mongoose.Types.ObjectId().toString(), method: "" }],
  favorite: false,
};

export const StateContext = ({ children }) => {
  const [page, setPage] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedRecipeId, setSelectedRecipeId] = useState(null);
  const [recipe, setRecipe] = useState(emptyRecipe);
  const [imageInfo, setImageInfo] = useState("");
  const [showFavoriteRecipes, setShowFavoriteRecipes] = useState(false);
  const [isSignUp, setIsSignUp] = useState(true);
  const [filterRecipes, setFilterRecipes] = useState(false);
  const [ingredient, setIngredient] = useState({
    name: "",
    amount: "",
  });
  const [method, setMethod] = useState({
    method: "",
  });

  const editIngredient = (id, editIngredient) => {
    const newIngredients = [...recipe.ingredients];
    const index = newIngredients.findIndex((ingredient) => ingredient._id === id);
    newIngredients[index] = editIngredient;
    setRecipe({ ...recipe, ingredients: newIngredients });
  };

  const editMethod = (id, editMethod) => {
    const newMethods = [...recipe.methods];
    const index = newMethods.findIndex((method) => method._id === id);
    newMethods[index] = editMethod;
    setRecipe({ ...recipe, methods: newMethods });
  };

  const reset = () => {
    setSelectedRecipeId(null);
    setPage(1);
    setRecipe(emptyRecipe);
    setShowForm(false);
  };

  const handleCloseForm = () => {
    if (selectedRecipeId) {
      setSelectedRecipeId(null);
      setRecipe(emptyRecipe);
    }
    setPage(1);
    setShowForm(false);
  };

  return (
    <Context.Provider
      value={{
        page,
        setPage,
        showForm,
        setShowForm,
        recipe,
        setRecipe,
        ingredient,
        setIngredient,
        editIngredient,
        selectedRecipeId,
        setSelectedRecipeId,
        reset,
        handleCloseForm,
        editMethod,
        setLoading,
        method,
        imageInfo,
        setImageInfo,
        setShowFavoriteRecipes,
        showFavoriteRecipes,
        isSignUp,
        setIsSignUp,
        filterRecipes,
        setFilterRecipes,
      }}
    >
      {children}
    </Context.Provider>
  );
};
