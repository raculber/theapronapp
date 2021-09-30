import express from "express";

import User from "../models/user.js";

import bcrypt from "bcrypt";

const router = express.Router();

export const createUser = async (req, res) => {
  console.log(req.body);
  const { enteredUser, enteredEmail, enteredPassword, reenteredPassword } =
    req.body;
  const findUser = User.findOne({ enteredUser });
  const findEmail = User.findOne({ enteredEmail });

  if (findUser || findEmail) return res.send("Email already exists");
  else if (enteredPassword !== reenteredPassword)
    return res.send("Passwords must match");
  else {
    try {
      const securedPass = await bcrypt.hash(enteredPassword, 12);
      const User = new User({ enteredUser, enteredEmail, securedPass });
      User.save();
      res.send("Success");
    } catch (error) {
      res.send(error);
    }
  }
};

export default router;
