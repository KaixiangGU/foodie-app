import express from "express";
import RecipeMessage from "../models/recipeMessages.js";

export const getRecipes = async (req, res) => {
  try {
    const recipeMessages = await RecipeMessage.find();
    res.status(200).json(recipeMessages);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const recipeMessage = await RecipeMessage.findById(id);
    res.status(200).json(recipeMessage);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const addRecipe = async (req, res) => {
  const recipe = req.body;
  const newRecipe = new RecipeMessage(recipe);

  try {
    await newRecipe.save();
    res.status(202).json(newRecipe);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const deleteRecipe = async (req, res) => {
  const { id } = req.params;
  await RecipeMessage.findByIdAndRemove(id);
  res.json({ message: "recipe deleted" });
};

export const updateRecipe = async (req, res) => {
  const { id } = req.params;
  const recipe = req.body;
  const updatedRecipe = await RecipeMessage.findByIdAndUpdate(id, { ...recipe, id }, { new: true });
  res.json(updatedRecipe);
};
