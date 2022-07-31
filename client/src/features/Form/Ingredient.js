import React from "react";
import { Box, TextField, IconButton } from "@mui/material";
import { useStateContext } from "../../context/StateContext";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

const Ingredient = ({ ingredient }) => {
  const { editIngredient, recipe, setRecipe } = useStateContext();

  const handleIngredientChange = (changes) => {
    editIngredient(ingredient._id, { ...ingredient, ...changes });
  };

  const handleIngredientDelete = (id) => {
    const newIngredients = recipe.ingredients.filter((ingredient) => ingredient._id !== id);
    setRecipe({ ...recipe, ingredients: newIngredients });
  };

  return (
    <Box sx={{ display: "flex", mb: 2 }}>
      <TextField
        value={ingredient.amount}
        name="amount"
        variant="outlined"
        label="Amount"
        onChange={(e) => handleIngredientChange({ amount: e.target.value })}
      />
      <TextField
        value={ingredient.name}
        name="ingredients"
        variant="outlined"
        label="Ingredients"
        fullWidth
        onChange={(e) => handleIngredientChange({ name: e.target.value })}
      />
      <IconButton onClick={() => handleIngredientDelete(ingredient._id)}>
        <RemoveCircleOutlineIcon color="error" fontSize="large" />
      </IconButton>
    </Box>
  );
};

export default Ingredient;
