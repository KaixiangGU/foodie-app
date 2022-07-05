import axios from "axios";

const url = "https://foodie-app-project.herokuapp.com/recipes";

export const fetchRecipes = () => axios.get(url);
export const createRecipe = (newRecipe) => axios.post(url, newRecipe);
export const deleteRecipe = (id) => axios.delete(`${url}/${id}`);
export const updateRecipe = (id, updatedRecipe) => axios.patch(`${url}/${id}`, updatedRecipe);
export const fetchRecipe = (id) => axios.get(`${url}/${id}`);
