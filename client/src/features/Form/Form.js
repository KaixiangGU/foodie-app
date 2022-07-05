import React, { useEffect } from "react";
import { useStateContext } from "../../context/StateContext";
import { createRecipe, updateRecipe } from "../RecipeCards/RecipeSlice";
import { useDispatch, useSelector } from "react-redux";
import RecipeInfo from "./RecipeInfo";
import IngredientsList from "./IngredientsList";
import Methods from "./Methods";

const Form = () => {
  const dispatch = useDispatch();
  const { recipe, selectedRecipeId, reset, page } = useStateContext();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (selectedRecipeId) {
      dispatch(updateRecipe(selectedRecipeId, recipe));
    } else {
      dispatch(createRecipe(recipe));
    }
    reset();
  };

  switch (page) {
    case 1:
      return <RecipeInfo />;

    case 2:
      return <IngredientsList />;

    case 3:
      return <Methods handleSubmit={handleSubmit} />;

    default:
      return null;
  }
};

export default Form;
