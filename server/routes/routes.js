import express from "express";

import { createUser } from "../controllers/user.js";
import { signInUser } from "../controllers/user.js";
import { verifyToken } from "../controllers/user.js";
import {
  addIngredient,
  getIngredients,
  deleteIngredient,
} from "../controllers/ingredients.js";
import {
  saveRecipe,
  getRecipeSaved,
  getSavedRecipes,
  getRandomRecipes,
  getRecipesByQuery,
} from "../controllers/recipe.js";
import {
  addRecipeToDate,
  deleteRecipeFromDate,
} from "../controllers/calendar.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/api/sign-up", createUser);
router.post("/api/sign-in", signInUser);
router.get("/api/auth", auth, verifyToken);

router.get("/api/get-ingredients", auth, getIngredients);
router.post("/api/add-ingredient", auth, addIngredient);
router.delete("/api/delete-ingredient", auth, deleteIngredient);

router.post("/api/save-recipe", auth, saveRecipe);
router.get("/api/get-recipe-saved", getRecipeSaved);
router.get("/api/get-saved-recipes", auth, getSavedRecipes);
router.get("/api/get-random-recipes", getRandomRecipes);
router.get("/api/get-recipes-by-query", getRecipesByQuery);
router.get("/api/get-recipes-by-query", getRecipesByQuery);

router.post("/api/add-recipe-to-date", addRecipeToDate);
router.post("/api/delete-recipe-from-date", deleteRecipeFromDate);
export default router;
