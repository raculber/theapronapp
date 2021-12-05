import express from "express";

import Ingredients from "../models/ingredients.js";
import https from "https";
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

export const getAutoComplete = async (req, res) => {
  let query = req.query.query;
  const options = {
    hostname: "api.spoonacular.com",
    path:
      "/food/ingredients/autocomplete?apiKey=" +
      process.env.API_KEY +
      "&number=5&query=" +
      query,
    method: "GET",
  };
  const request = https.request(options, (response) => {
    let data = "";
    response.on("data", (chunk) => {
      data = data + chunk.toString();
    });

    response.on("end", () => {
      const body = JSON.parse(data);
      res.json({ results: body });
    });
  });
  request.on("error", (error) => {
    res.status(401).json({ message: "Error completing query" });
  });

  request.end();
};

export const addIngredient = async (req, res) => {
  let { userId, ingredientName, image } = req.body;
  if (ingredientName == "") {
    res.json({ message: "Error adding ingredient" });
  }
  const BASE_IMAGE_URL = "https://spoonacular.com/cdn/ingredients_100x100/";
  image = BASE_IMAGE_URL + image;
  const ingredientExists = await Ingredients.exists({
    userId: userId,
    ingredients: {
      $elemMatch: { name: ingredientName },
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
        ingredients: [{ name: ingredientName, image: image }],
      });
    } else
      userIngredients.ingredients.push({
        name: ingredientName,
        image: image,
      });
    userIngredients.save();

    res.status(200).json({
      data: {
        ingredientName,
        image,
      },
    });
  } else {
    res.json({ message: "Ingredient already exists" });
  }
};

export default router;
