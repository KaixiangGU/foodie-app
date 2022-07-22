import mongoose from "mongoose";

const recipeSchema = mongoose.Schema({
  title: String,
  author: String,
  creator: String,
  cookTime: String,
  servings: {
    type: Number,
    default: 0,
  },
  difficulty: String,
  image: String,
  ingredients: [
    {
      name: String,
      amount: String,
    },
  ],
  methods: [
    {
      method: String,
    },
  ],
  createdAt: {
    type: Date,
    default: new Date(),
  },
  favorite: {
    type: Boolean,
    default: false,
  },
});

const RecipeMessage = mongoose.model("RecipeMessage", recipeSchema);

export default RecipeMessage;
