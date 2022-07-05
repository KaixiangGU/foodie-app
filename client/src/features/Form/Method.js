import React from "react";
import { Box, TextField, IconButton, Typography } from "@mui/material";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { useStateContext } from "../../context/StateContext";

const Method = ({ method, index }) => {
  const { recipe, setRecipe, editMethod } = useStateContext();

  const handleMethodDelete = (_id) => {
    const newMethods = recipe.methods.filter((method) => method._id !== _id);
    setRecipe({ ...recipe, methods: newMethods });
  };

  const handleMethodChange = (changes) => {
    editMethod(method._id, { ...method, ...changes });
  };

  return (
    <>
      <Typography vairant="body1" sx={{ fontSize: 20, mb: 1 }}>{`Step ${index + 1}`}</Typography>
      <Box sx={{ display: "flex", mb: 2 }}>
        <TextField
          value={method.method}
          name="method"
          variant="outlined"
          label="Method"
          minRows={3}
          multiline
          fullWidth
          onChange={(e) => handleMethodChange({ method: e.target.value })}
        />
        <IconButton onClick={() => handleMethodDelete(method._id)}>
          <RemoveCircleOutlineIcon color="error" fontSize="large" />
        </IconButton>
      </Box>
    </>
  );
};

export default Method;
