import express from "express";

import { createUser } from "../controllers/user.js";
import { signInUser } from "../controllers/user.js";
import { verifyToken } from "../controllers/user.js";
import { addIngredient } from "../controllers/ingredients.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/api/sign-up", createUser);
router.post("/api/sign-in", signInUser);
router.get("/api/auth", auth, verifyToken);
router.post("/api/add-ingredient", addIngredient);

export default router;
