import React from "react";
import { useStateContext } from "../../context/StateContext";
import FileBase from "react-file-base64";
import CloseIcon from "@mui/icons-material/Close";
import "./Form.css";

import {
  Box,
  TextField,
  Paper,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  IconButton,
  Grid,
} from "@mui/material";

const RecipeInfo = () => {
  const { setPage, imageInfo, setImageInfo, recipe, setRecipe, selectedRecipeId, handleCloseForm } =
    useStateContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!recipe.image) return setImageInfo("please slecet a image");
    setPage((prev) => prev + 1);
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <Paper sx={{ p: 5 }} elevation={3}>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Typography variant="h4" gutterBottom>
            {selectedRecipeId ? "Edit" : "New"} Recipe
          </Typography>
          <IconButton disableRipple size="small" onClick={handleCloseForm}>
            <CloseIcon />
          </IconButton>
        </Box>
        <TextField
          sx={{ mb: 2 }}
          value={recipe.title}
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          required
          onChange={(e) => setRecipe({ ...recipe, title: e.target.value })}
        />
        <Grid container rowGap={2} columnSpacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12} lg={4}>
            <TextField
              value={recipe.cookTime}
              name="cook time"
              variant="outlined"
              label="Cook Time"
              fullWidth
              required
              onChange={(e) => setRecipe({ ...recipe, cookTime: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} lg={4}>
            <TextField
              value={recipe.servings}
              name="servings"
              variant="outlined"
              label="Servings"
              type="number"
              inputProps={{ min: "1" }}
              fullWidth
              required
              onChange={(e) => setRecipe({ ...recipe, servings: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} lg={4}>
            <FormControl fullWidth required>
              <InputLabel id="demo-simple-select-label">Difficulty</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={recipe.difficulty}
                label="Difficulty"
                onChange={(e) => setRecipe({ ...recipe, difficulty: e.target.value })}
              >
                <MenuItem value={"easy"}>Easy</MenuItem>
                <MenuItem value={"medium"}>Medium</MenuItem>
                <MenuItem value={"difficult"}>Difficult</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <div>
          <FileBase
            type="file"
            mutiple={false}
            required
            onDone={({ base64 }) => setRecipe({ ...recipe, image: base64 })}
          />
          <Typography variant="body1" color="error" component="p">
            {imageInfo}
          </Typography>
        </div>
        <Box sx={{ mt: 2 }}>
          <Button variant="contained" color="primary" size="large" type="submit">
            Next
          </Button>
        </Box>
      </Paper>
    </form>
  );
};

export default RecipeInfo;
