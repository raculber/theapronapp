import express from "express";

import User from "../models/user.js";

const bcrypt = require("bcrypt");

const router = express.Router();

export const createUser = async (req, res) => {
  const { username, email, password, reenteredPassword } = req.body;
  const findUser = User.findOne({ username });
  const findEmail = User.findOne({ email });

  if (findUser || findEmail) return res.send("Email already exists");
  else if (password !== reenteredPassword)
    return res.send("Passwords must match");
  else {
    try {
      const securedPass = await bcrypt.hash(password, 12);
      const User = new User({ username, email, securedPass });
      User.save();
      res.send("Success");
    } catch (error) {
      res.send(error);
    }
  }
};

export default router;
