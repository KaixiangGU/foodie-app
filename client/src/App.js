import { CssBaseline, Grid, Container, Modal } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Navbar from "./features/Navbar/Navbar";
import Recipes from "./features/Recipes/Recipes";
import Form from "./features/Form/Form";
import RecipeDetails from "./features/RecipeDetails/RecipeDetails";
import Auth from "./features/Auth/Auth";

import { useStateContext } from "./context/StateContext";
import { getRecipes } from "./features/RecipeCards/RecipeSlice";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const dispatch = useDispatch();
  const { selectedRecipeId, showForm, setShowForm, setRecipe, setPage, handleCloseForm } =
    useStateContext();

  useEffect(() => {
    dispatch(getRecipes());
  }, [dispatch, selectedRecipeId]);

  const selectedRecipe = useSelector((state) =>
    selectedRecipeId ? state.recipes.recipes.find((r) => r._id === selectedRecipeId) : null
  );

  useEffect(() => {
    if (selectedRecipe) {
      setRecipe(selectedRecipe);
      setPage(1);
      setShowForm(true);
    }
  }, [selectedRecipeId]);

  return (
    <>
      <CssBaseline />
      <Container disableGutters maxWidth={false} sx={{ minWidth: "400px" }}>
        <BrowserRouter>
          <Navbar />
          <Modal
            open={showForm}
            onClose={handleCloseForm}
            sx={{ width: "100%", mx: "auto", overflow: "auto" }}
          >
            <Form />
          </Modal>
          <Routes>
            <Route path="/" element={<Recipes />} />
            <Route path="/:id" element={<RecipeDetails />} />
            <Route path="/auth" element={<Auth />} />
          </Routes>
        </BrowserRouter>
      </Container>
    </>
  );
}

export default App;
