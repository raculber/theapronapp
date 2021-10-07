import express from "express";

import User from "../models/user.js";

import bcrypt from "bcrypt";
import emailValidator from "email-validator";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";

const router = express.Router();

export const createUser = async (req, res) => {
  let { enteredEmail, enteredPassword, reenteredPassword } = req.body;

  if (enteredEmail) enteredEmail = enteredEmail.trim();
  if (enteredPassword) enteredPassword = enteredPassword.trim();
  if (reenteredPassword) reenteredPassword = reenteredPassword.trim();

  const findEmail = await User.exists({ email: enteredEmail });

  if (findEmail) return res.json({ message: "User already exists" });
  else if (enteredPassword !== reenteredPassword)
    return res.json({ message: "Passwords must match" });
  else if (!emailValidator.validate(enteredEmail))
    return res.json({ message: "Invalid email" });
  else if (enteredPassword.length < 6)
    return res.json({ message: "Password must be at least six characters" });
  else {
    try {
      const userId = uuidv4();
      const securedPass = await bcrypt.hash(enteredPassword, 12);

      const user = new User({
        userId: userId,
        email: enteredEmail,
        password: securedPass,
      });
      user.save();
      const accessToken = jwt.sign({ userId }, process.env.TOKEN_KEY);

      res.json({
        token: accessToken,
        result: { userId, enteredEmail },
      });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }
};

export const signInUser = async (req, res) => {
  let { enteredEmail, enteredPassword } = req.body;

  enteredEmail = enteredEmail.trim();
  enteredPassword = enteredPassword.trim();

  const user = await User.findOne({ email: enteredEmail });
  const userId = user.userId;

  if (!userId) return res.json({ message: "User does not exist" });
  else {
    const validPass = await bcrypt.compare(enteredPassword, user.password);
    if (validPass) {
      const accessToken = jwt.sign({ userId }, process.env.TOKEN_KEY);

      res.json({
        token: accessToken,
        result: { userId, enteredEmail },
      });
    } else {
      res.json({ message: "Invalid login" });
    }
  }
};

export const verifyToken = async (req, res) => {
  res.json({ message: "User Authenticated" });
};
export default router;
