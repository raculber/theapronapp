import express from "express";

import Calendar from "../models/calendar.js";
import Recipe from "../models/recipe.js";

const router = express.Router();

export const addRecipeToDate = async (req, res) => {
  let { userId, date, recipe } = req.body;
  console.log(userId);
  console.log(date);
  //   console.log(recipe);
  const userExists = await Calendar.exists({
    userId: userId,
  });
  //Add Recipe for Date
  let calendarUser = new Calendar({
    userId: userId,
    recipes: [],
  });
  if (userExists) {
    calendarUser = await Calendar.findOne({
      userId: userId,
    });
  }
  const calendarRecipe = new Recipe({
    userId: userId,
    id: recipe.id,
    title: recipe.title,
    ingredients: recipe.ingredients,
    vegetarian: recipe.vegetarian,
    vegan: recipe.vegan,
    glutenFree: recipe.glutenFree,
    dairyFree: recipe.dairyFree,
    veryHealthy: recipe.veryHealthy,
    cheap: recipe.cheap,
    summary: recipe.summary,
    image: recipe.image,
    instructions: recipe.instructions,
    nutrients: recipe.nutrients,
    readyInMinutes: recipe.readyInMinutes,
  });
  calendarUser.recipes.push({
    date: date,
    recipe: calendarRecipe,
  });
  calendarUser.save();

  res.status(200).json({
    data: {
      recipe: recipe,
      date: date,
    },
  });
};

export const deleteRecipeFromDate = async (req, res) => {};
export default router;
