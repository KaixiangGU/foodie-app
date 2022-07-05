import express from "express";
import {
  addRecipe,
  getRecipes,
  deleteRecipe,
  updateRecipe,
  getRecipe,
} from "../controller/recipe.js";

const router = express.Router();

router.get("/", getRecipes);
router.get("/:id", getRecipe);
router.post("/", addRecipe);
router.delete("/:id", deleteRecipe);
router.patch("/:id", updateRecipe);

export default router;
