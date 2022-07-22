import React from "react";
import { TextField, Paper, Typography, Box, Button, IconButton } from "@mui/material";
import { useStateContext } from "../../context/StateContext";
import CloseIcon from "@mui/icons-material/Close";
import Method from "./Method";
import AddIcon from "@mui/icons-material/Add";
import mongoose from "mongoose";

const Methods = ({ handleSubmit }) => {
  const { setPage, recipe, setRecipe, handleCloseForm, method } = useStateContext();

  return (
    <form onSubmit={handleSubmit} className="form">
      <Paper sx={{ p: 5 }} elevation={3}>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Typography variant="h4" gutterBottom>
            Methods
          </Typography>
          <IconButton disableRipple size="small" onClick={handleCloseForm}>
            <CloseIcon />
          </IconButton>
        </Box>
        {recipe.methods.map((method, index) => (
          <Method method={method} key={index} index={index} />
        ))}
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          size="medium"
          color="success"
          sx={{ my: 2 }}
          disableRipple
          onClick={() =>
            setRecipe({
              ...recipe,
              methods: [
                ...recipe.methods,
                { ...method, _id: new mongoose.Types.ObjectId().toString() },
              ],
            })
          }
        >
          Add Method
        </Button>
        <Box>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            sx={{ mr: 2 }}
            onClick={() => setPage((prev) => prev - 1)}
          >
            Back
          </Button>
          <Button variant="contained" size="large" color="primary" type="submit">
            Submit
          </Button>
        </Box>
      </Paper>
    </form>
  );
};

export default Methods;
