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
    await Ingredients.updateOne(
      {
        userId: userId,
      },
      { $pull: { ingredients: { id: ingredientId } } }
    );
    res.json({ message: "Ingredient deleted" });
    // ingredient.save();
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
  let { userId, ingredientId, ingredientName } = req.body;
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
        ingredients: [{ id: ingredientId, name: ingredientName }],
      });
    } else
      userIngredients.ingredients.push({
        id: ingredientId,
        name: ingredientName,
      });
    userIngredients.save();

    res.status(200).json({
      data: {
        ingredientId: ingredientId,
        ingredientName,
        ingredientName,
      },
    });
  } else {
    res.json({ message: "Ingredient already exists" });
  }
};

export default router;
