import express from "express";

import { createUser } from "../controllers/user.js";

const router = express.Router();

router.post("/api/sign-up", createUser);

export default router;
