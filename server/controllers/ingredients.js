import express from "express";

import Ingredients from "../models/ingredients.js";

const router = express.Router();

export const addIngredient = async (req, res) => {
  console.log("In add");
  let { userId, recipeId } = req.body;
  console.log(userId);
  console.log(recipeId);
  const userExists = await Ingredients.exists({
    userId: userId,
  });
  const ingredientExists = await Ingredients.exists({
    userId: userId,
    ingredients: { $in: [recipeId] },
  });
  //Add new user to database
  if (!userExists) {
    const ingredients = new Ingredients({
      userId: userId,
      ingredients: [recipeId],
    });
    res.status(200).json({
      data: {
        recipeId: recipeId,
      },
    });
    ingredients.save();
  }
  //Add ingredient for current user
  else if (!ingredientExists) {
    const userIngredients = await Ingredients.findOne({
      userId: userId,
      ingredients: { $in: [recipeId] },
    });
    userIngredients.ingredients.push(recipeId);
    userIngredients.save();
    res.status(200).json({
      data: {
        recipeId: recipeId,
      },
    });
  }
};

export default router;
