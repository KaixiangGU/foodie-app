import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

// const url = "https://foodie-app-project.herokuapp.com/recipes";
// const url = "http://localhost:5000/recipes";
API.interceptors.request.use((req) => {
  const user = JSON.parse(localStorage.getItem("profile"));
  if (user?.token) {
    req.headers.authorization = `Bearer ${user.token}`;
  } else if (user?.credential) {
    req.headers.authorization = `Bearer ${user.credential}`;
  }
  return req;
});

export const fetchRecipes = () => API.get("/recipes");
export const createRecipe = (newRecipe) => API.post("/recipes", newRecipe);
export const deleteRecipe = (id) => API.delete(`/recipes/${id}`);
export const updateRecipe = (id, updatedRecipe) => API.patch(`recipes/${id}`, updatedRecipe);
export const fetchRecipe = (id) => API.get(`recipes/${id}`);

export const signIn = (formData) => API.post("/user/signin", formData);
export const signUp = (formData) => API.post("/user/signup", formData);
