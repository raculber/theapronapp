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
  getRecipesByDate,
} from "../controllers/calendar.js";
import {
  addList,
  aggregateList,
  deleteList,
  getLists,
  updateList,
} from "../controllers/grocery-list.js";
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

router.post("/api/add-recipe-to-date", auth, addRecipeToDate);
router.delete("/api/delete-recipe-from-date", auth, deleteRecipeFromDate);
router.get("/api/get-recipes-by-date", auth, getRecipesByDate);

router.post("/api/add-grocery-list", auth, addList);
router.delete("/api/delete-grocery-list", auth, deleteList);
router.get("/api/get-grocery-lists", auth, getLists);
router.put("/api/update-grocery-list", auth, updateList);
router.post("/api/aggregate-grocery-lists", auth, aggregateList);
export default router;
