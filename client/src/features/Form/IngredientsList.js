import React from "react";
import { Paper, Typography, Box, Button, IconButton, Icon } from "@mui/material";
import { useStateContext } from "../../context/StateContext";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import Ingredient from "./Ingredient";
import mongoose from "mongoose";
const IngredientsList = () => {
  const { setPage, setShowForm, recipe, setRecipe, ingredient, handleCloseForm } =
    useStateContext();

  return (
    <Paper sx={{ p: 5 }} elevation={3} className="form">
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="h4" gutterBottom>
          Ingredients
        </Typography>
        <IconButton disableRipple size="small" onClick={handleCloseForm}>
          <CloseIcon />
        </IconButton>
      </Box>
      {recipe.ingredients.map((ingredient, index) => (
        <Ingredient ingredient={ingredient} key={index} />
      ))}
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        size="medium"
        color="success"
        sx={{ mt: 2 }}
        disableRipple
        onClick={() =>
          setRecipe({
            ...recipe,
            ingredients: [
              ...recipe.ingredients,
              { ...ingredient, _id: new mongoose.Types.ObjectId().toString() },
            ],
          })
        }
      >
        Add Ingredient
      </Button>
      <Box sx={{ mt: 3 }}>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          sx={{ mr: 2 }}
          onClick={() => setPage((prev) => prev - 1)}
        >
          Back
        </Button>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={() => setPage((prev) => prev + 1)}
        >
          Next
        </Button>
      </Box>
    </Paper>
  );
};

export default IngredientsList;
