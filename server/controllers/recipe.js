import express from "express";

import Recipe from "../models/recipe.js";

const router = express.Router();

export const saveRecipe = async (req, res) => {
  console.log(req.body.instructions);
  let {
    userId,
    id,
    title,
    ingredients,
    vegetarian,
    vegan,
    glutenFree,
    dairyFree,
    veryHealthy,
    cheap,
    summary,
    image,
    instructions,
    nutrients,
    readyInMinutes,
  } = req.body;
  const recipeExists = await Recipe.exists({
    userId: userId,
    id: id,
  });
  //Add recipe
  if (!recipeExists) {
    const recipe = new Recipe({
      userId: userId,
      id: id,
      title: title,
      ingredients: ingredients,
      vegetarian: vegetarian,
      vegan: vegan,
      glutenFree: glutenFree,
      dairyFree: dairyFree,
      veryHealthy: veryHealthy,
      cheap: cheap,
      summary: summary,
      image: image,
      instructions: instructions,
      nutrients: nutrients,
      readyInMinutes: readyInMinutes,
    });
    recipe.save();
  }
  //Delete recipe
  else {
    Recipe.deleteOne({ userId: userId, id: id }, function (err) {
      if (err) console.log(err);
    });
  }
};

export default router;
