import express from "express";

import { createUser } from "../controllers/user.js";
import { signInUser } from "../controllers/user.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/api/sign-up", createUser);
router.post("/api/sign-in", signInUser);

export default router;
