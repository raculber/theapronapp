import express from "express";

import Ingredients from "../models/ingredients.js";

const router = express.Router();

export const addIngredient = async (req, res) => {
  console.log("In add");
  let { userId, ingredientId } = req.body;
  const ingredientExists = await Ingredients.exists({
    userId: userId,
    ingredients: {
      $elemMatch: { id: ingredientId },
    },
  });
  console.log(ingredientExists);
  //Add ingredient
  if (!ingredientExists) {
    let userIngredients = await Ingredients.findOne({
      userId: userId,
      ingredients: {
        $elemMatch: { id: ingredientId },
      },
    });
    //Create new Ingredients object if it doesn't exist
    //Otherwise, push to existing list
    if (userIngredients == null) {
      userIngredients = new Ingredients({
        userId: userId,
        ingredients: [{ id: ingredientId }],
      });
    } else userIngredients.ingredients.push({ id: ingredientId });
    console.log("In add ingredient");
    console.log(userIngredients.ingredients);
    userIngredients.save();
    res.status(200).json({
      data: {
        ingredientId: ingredientId,
      },
    });
  }
};

export default router;
