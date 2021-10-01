import express from "express";

import User from "../models/user.js";

import bcrypt from "bcrypt";
import emailValidator from "email-validator";

const router = express.Router();

export const createUser = async (req, res) => {
  console.log(req.body);
  const { enteredUser, enteredEmail, enteredPassword, reenteredPass } =
    req.body;

  enteredUser = enteredUser.trim();
  enteredEmail = enteredEmail.trim();
  enteredPassword = enteredPassword.trim();
  reenteredPass = reenteredPass.trim();

  const findUser = User.findOne({ username: enteredUser });
  const findEmail = User.findOne({ email: enteredEmail });

  if (findUser.username || findEmail.enteredEmail)
    return res.json({ message: "User already exists" });
  else if (enteredPassword !== reenteredPass)
    return res.json({ message: "Passwords must match" });
  else if (!emailValidator.validate(enteredEmail))
    return res.json({ message: "Invalid email" });
  else if (enteredPassword.length < 6)
    return res.json({ message: "Password must be at least six characters" });
  else {
    try {
      const securedPass = await bcrypt.hash(enteredPassword, 12);
      const User = new User({ enteredUser, enteredEmail, securedPass });
      User.save();
      res.json({ message: "Success" });
    } catch (error) {
      res.json({ message: error });
    }
  }
};

export default router;
