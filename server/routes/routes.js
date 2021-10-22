import express from "express";

import { createUser } from "../controllers/user.js";
import { signInUser } from "../controllers/user.js";
import { verifyToken } from "../controllers/user.js";
import {
  addIngredient,
  getIngredients,
  deleteIngredient,
} from "../controllers/ingredients.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/api/sign-up", createUser);
router.post("/api/sign-in", signInUser);
router.get("/api/auth", auth, verifyToken);

router.get("/api/get-ingredients", auth, getIngredients);
router.post("/api/add-ingredient", auth, addIngredient);
router.delete("/api/delete-ingredient", auth, deleteIngredient);

export default router;
