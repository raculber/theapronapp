import express from "express";

import Ingredients from "../models/ingredients.js";

const router = express.Router();

export const deleteIngredient = async (req, res) => {
  let { userId, ingredientId } = req.body;
  console.log(userId);
  console.log(ingredientId);

  const ingredient = await Ingredients.findOne({
    userId: userId,
    ingredients: {
      $elemMatch: { id: ingredientId },
    },
  });
  //Delete if ingredient exists
  if (ingredient) {
    console.log("exist");
    console.log(ingredient.ingredients);
    // ingredient.ingredients.pull({ id: ingredientId });
    // console.log(ingredient.ingredients);
    // ingredient.save();
    // ingredient.update({ $pull: { id: ingredientId } });
    Ingredients.updateOne(
      {
        userId: userId,
        ingredients: {
          $elemMatch: { id: ingredientId },
        },
      },
      { $pullAll: { id: ingredientId } }
    );
    console.log(ingredient.ingredients);
  } else res.json({ message: "Ingredient not found" });
};

export const getIngredients = async (req, res) => {
  let userId = req.query.userId;
  const ingredients = await Ingredients.findOne({
    userId: userId,
  });
  if (!ingredients) res.json({ message: "No ingredients saved " });
  else res.json({ ingredients: ingredients.ingredients });
};

export const addIngredient = async (req, res) => {
  console.log("In adding");
  let { userId, ingredientId } = req.body;
  const ingredientExists = await Ingredients.exists({
    userId: userId,
    ingredients: {
      $elemMatch: { id: ingredientId },
    },
  });
  //Add ingredient
  if (!ingredientExists) {
    let userIngredients = await Ingredients.findOne({
      userId: userId,
    });
    //Create new Ingredients object if it user doesn't exist
    //Otherwise, push to existing list
    if (userIngredients == null) {
      userIngredients = new Ingredients({
        userId: userId,
        ingredients: [{ id: ingredientId }],
      });
    } else userIngredients.ingredients.push({ id: ingredientId });
    userIngredients.save();

    res.status(200).json({
      data: {
        ingredientId: ingredientId,
      },
    });
  } else {
    res.json({ message: "Ingredient already exists" });
  }
};

export default router;
