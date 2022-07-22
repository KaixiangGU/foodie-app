import express from "express";
import {
  addRecipe,
  getRecipes,
  deleteRecipe,
  updateRecipe,
  getRecipe,
} from "../controller/recipe.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", getRecipes);
router.get("/:id", getRecipe);
router.post("/", auth, addRecipe);
router.delete("/:id", auth, deleteRecipe);
router.patch("/:id", auth, updateRecipe);

export default router;
