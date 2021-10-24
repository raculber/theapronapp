import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const recipeData = {
  vegetarian: true,
  vegan: true,
  glutenFree: false,
  dairyFree: true,
  veryHealthy: true,
  cheap: false,
  veryPopular: true,
  sustainable: false,
  weightWatcherSmartPoints: 19,
  gaps: "no",
  lowFodmap: false,
  aggregateLikes: 1669,
  spoonacularScore: 99.0,
  healthScore: 78.0,
  creditsText: "Jen West",
  sourceName: "Pink When",
  pricePerServing: 83.23,
  extendedIngredients: [
    {
      id: 2044,
      aisle: "Produce;Spices and Seasonings",
      image: "basil.jpg",
      consistency: "solid",
      name: "basil",
      nameClean: "fresh basil",
      original: "1/4 cup basil",
      originalString: "1/4 cup basil",
      originalName: "basil",
      amount: 0.25,
      unit: "cup",
      meta: [],
      metaInformation: [],
      measures: {
        us: { amount: 0.25, unitShort: "cups", unitLong: "cups" },
        metric: { amount: 59.147, unitShort: "ml", unitLong: "milliliters" },
      },
    },
    {
      id: 20081,
      aisle: "Baking",
      image: "flour.png",
      consistency: "solid",
      name: "flour",
      nameClean: "wheat flour",
      original: "1 cup flour",
      originalString: "1 cup flour",
      originalName: "flour",
      amount: 1.0,
      unit: "cup",
      meta: [],
      metaInformation: [],
      measures: {
        us: { amount: 1.0, unitShort: "cup", unitLong: "cup" },
        metric: { amount: 236.588, unitShort: "ml", unitLong: "milliliters" },
      },
    },
    {
      id: 1022020,
      aisle: "Spices and Seasonings",
      image: "garlic-powder.png",
      consistency: "solid",
      name: "garlic powder",
      nameClean: "garlic powder",
      original: "1/4 garlic powder",
      originalString: "1/4 garlic powder",
      originalName: "garlic powder",
      amount: 0.25,
      unit: "",
      meta: [],
      metaInformation: [],
      measures: {
        us: { amount: 0.25, unitShort: "", unitLong: "" },
        metric: { amount: 0.25, unitShort: "", unitLong: "" },
      },
    },
    {
      id: 1062047,
      aisle: "Spices and Seasonings",
      image: "garlic-salt.jpg",
      consistency: "solid",
      name: "garlic salt",
      nameClean: "garlic salt",
      original: "garlic salt with parsley (to sprinkle)",
      originalString: "garlic salt with parsley (to sprinkle)",
      originalName: "garlic salt with parsley (to sprinkle)",
      amount: 2.0,
      unit: "servings",
      meta: ["with parsley (to sprinkle)"],
      metaInformation: ["with parsley (to sprinkle)"],
      measures: {
        us: { amount: 2.0, unitShort: "servings", unitLong: "servings" },
        metric: { amount: 2.0, unitShort: "servings", unitLong: "servings" },
      },
    },
    {
      id: 11352,
      aisle: "Produce",
      image: "potatoes-yukon-gold.png",
      consistency: "solid",
      name: "potatoes",
      nameClean: "potato",
      original: "4 sliced, fresh potatoes",
      originalString: "4 sliced, fresh potatoes",
      originalName: "sliced, fresh potatoes",
      amount: 4.0,
      unit: "",
      meta: ["fresh", "sliced"],
      metaInformation: ["fresh", "sliced"],
      measures: {
        us: { amount: 4.0, unitShort: "", unitLong: "" },
        metric: { amount: 4.0, unitShort: "", unitLong: "" },
      },
    },
    {
      id: 4513,
      aisle: null,
      image: null,
      consistency: null,
      name: "vegetable oil",
      nameClean: null,
      original: "vegetable oil",
      originalString: "vegetable oil",
      originalName: "vegetable oil",
      amount: 2.0,
      unit: "servings",
      meta: [],
      metaInformation: [],
      measures: {
        us: { amount: 2.0, unitShort: "servings", unitLong: "servings" },
        metric: { amount: 2.0, unitShort: "servings", unitLong: "servings" },
      },
    },
  ],
  id: 715594,
  title: "Homemade Garlic and Basil French Fries",
  readyInMinutes: 45,
  servings: 2,
  sourceUrl: "http://www.pinkwhen.com/homemade-french-fries/",
  image: "https://spoonacular.com/recipeImages/715594-556x370.jpg",
  imageType: "jpg",
  nutrition: {
    nutrients: [
      {
        name: "Calories",
        title: "Calories",
        amount: 556.62,
        unit: "kcal",
        percentOfDailyNeeds: 27.83,
      },
      {
        name: "Fat",
        title: "Fat",
        amount: 1.02,
        unit: "g",
        percentOfDailyNeeds: 1.56,
      },
      {
        name: "Saturated Fat",
        title: "Saturated Fat",
        amount: 0.21,
        unit: "g",
        percentOfDailyNeeds: 1.31,
      },
      {
        name: "Carbohydrates",
        title: "Carbohydrates",
        amount: 122.29,
        unit: "g",
        percentOfDailyNeeds: 40.76,
      },
      {
        name: "Net Carbohydrates",
        title: "Net Carbohydrates",
        amount: 111.17,
        unit: "g",
        percentOfDailyNeeds: 40.42,
      },
      {
        name: "Sugar",
        title: "Sugar",
        amount: 3.5,
        unit: "g",
        percentOfDailyNeeds: 3.89,
      },
      {
        name: "Cholesterol",
        title: "Cholesterol",
        amount: 0.0,
        unit: "mg",
        percentOfDailyNeeds: 0.0,
      },
      {
        name: "Sodium",
        title: "Sodium",
        amount: 220.8,
        unit: "mg",
        percentOfDailyNeeds: 9.6,
      },
      {
        name: "Protein",
        title: "Protein",
        amount: 15.18,
        unit: "g",
        percentOfDailyNeeds: 30.35,
      },
      {
        name: "Vitamin C",
        title: "Vitamin C",
        amount: 84.46,
        unit: "mg",
        percentOfDailyNeeds: 102.38,
      },
      {
        name: "Vitamin B6",
        title: "Vitamin B6",
        amount: 1.29,
        unit: "mg",
        percentOfDailyNeeds: 64.55,
      },
      {
        name: "Manganese",
        title: "Manganese",
        amount: 1.11,
        unit: "mg",
        percentOfDailyNeeds: 55.71,
      },
      {
        name: "Vitamin B1",
        title: "Vitamin B1",
        amount: 0.83,
        unit: "mg",
        percentOfDailyNeeds: 55.53,
      },
      {
        name: "Potassium",
        title: "Potassium",
        amount: 1870.72,
        unit: "mg",
        percentOfDailyNeeds: 53.45,
      },
      {
        name: "Folate",
        title: "Folate",
        amount: 184.63,
        unit: "µg",
        percentOfDailyNeeds: 46.16,
      },
      {
        name: "Fiber",
        title: "Fiber",
        amount: 11.12,
        unit: "g",
        percentOfDailyNeeds: 44.48,
      },
      {
        name: "Vitamin B3",
        title: "Vitamin B3",
        amount: 8.21,
        unit: "mg",
        percentOfDailyNeeds: 41.04,
      },
      {
        name: "Iron",
        title: "Iron",
        amount: 6.33,
        unit: "mg",
        percentOfDailyNeeds: 35.15,
      },
      {
        name: "Selenium",
        title: "Selenium",
        amount: 22.5,
        unit: "µg",
        percentOfDailyNeeds: 32.15,
      },
      {
        name: "Phosphorus",
        title: "Phosphorus",
        amount: 312.52,
        unit: "mg",
        percentOfDailyNeeds: 31.25,
      },
      {
        name: "Magnesium",
        title: "Magnesium",
        amount: 113.75,
        unit: "mg",
        percentOfDailyNeeds: 28.44,
      },
      {
        name: "Copper",
        title: "Copper",
        amount: 0.56,
        unit: "mg",
        percentOfDailyNeeds: 28.12,
      },
      {
        name: "Vitamin B2",
        title: "Vitamin B2",
        amount: 0.45,
        unit: "mg",
        percentOfDailyNeeds: 26.33,
      },
      {
        name: "Vitamin K",
        title: "Vitamin K",
        amount: 20.73,
        unit: "µg",
        percentOfDailyNeeds: 19.74,
      },
      {
        name: "Vitamin B5",
        title: "Vitamin B5",
        amount: 1.54,
        unit: "mg",
        percentOfDailyNeeds: 15.42,
      },
      {
        name: "Zinc",
        title: "Zinc",
        amount: 1.7,
        unit: "mg",
        percentOfDailyNeeds: 11.34,
      },
      {
        name: "Calcium",
        title: "Calcium",
        amount: 66.02,
        unit: "mg",
        percentOfDailyNeeds: 6.6,
      },
      {
        name: "Vitamin A",
        title: "Vitamin A",
        amount: 166.77,
        unit: "IU",
        percentOfDailyNeeds: 3.34,
      },
    ],
    properties: [
      {
        name: "Glycemic Index",
        title: "Glycemic Index",
        amount: 116.88,
        unit: "",
      },
      {
        name: "Glycemic Load",
        title: "Glycemic Load",
        amount: 89.01,
        unit: "",
      },
    ],
    flavonoids: [
      { name: "Cyanidin", title: "Cyanidin", amount: 0.0, unit: "mg" },
      { name: "Petunidin", title: "Petunidin", amount: 0.0, unit: "mg" },
      { name: "Delphinidin", title: "Delphinidin", amount: 0.0, unit: "mg" },
      { name: "Malvidin", title: "Malvidin", amount: 0.0, unit: "mg" },
      { name: "Pelargonidin", title: "Pelargonidin", amount: 0.0, unit: "mg" },
      { name: "Peonidin", title: "Peonidin", amount: 0.0, unit: "mg" },
      { name: "Catechin", title: "Catechin", amount: 0.0, unit: "mg" },
      {
        name: "Epigallocatechin",
        title: "Epigallocatechin",
        amount: 0.0,
        unit: "mg",
      },
      { name: "Epicatechin", title: "Epicatechin", amount: 0.0, unit: "mg" },
      {
        name: "Epicatechin 3-gallate",
        title: "Epicatechin 3-gallate",
        amount: 0.0,
        unit: "mg",
      },
      {
        name: "Epigallocatechin 3-gallate",
        title: "Epigallocatechin 3-gallate",
        amount: 0.0,
        unit: "mg",
      },
      { name: "Theaflavin", title: "Theaflavin", amount: 0.0, unit: "" },
      { name: "Thearubigins", title: "Thearubigins", amount: 0.0, unit: "" },
      { name: "Eriodictyol", title: "Eriodictyol", amount: 0.0, unit: "" },
      { name: "Hesperetin", title: "Hesperetin", amount: 0.0, unit: "mg" },
      { name: "Naringenin", title: "Naringenin", amount: 0.0, unit: "mg" },
      { name: "Apigenin", title: "Apigenin", amount: 0.0, unit: "mg" },
      { name: "Luteolin", title: "Luteolin", amount: 0.0, unit: "mg" },
      { name: "Isorhamnetin", title: "Isorhamnetin", amount: 0.0, unit: "mg" },
      { name: "Kaempferol", title: "Kaempferol", amount: 3.41, unit: "mg" },
      { name: "Myricetin", title: "Myricetin", amount: 0.0, unit: "mg" },
      { name: "Quercetin", title: "Quercetin", amount: 2.98, unit: "mg" },
      {
        name: "Theaflavin-3,3'-digallate",
        title: "Theaflavin-3,3'-digallate",
        amount: 0.0,
        unit: "",
      },
      {
        name: "Theaflavin-3'-gallate",
        title: "Theaflavin-3'-gallate",
        amount: 0.0,
        unit: "",
      },
      {
        name: "Theaflavin-3-gallate",
        title: "Theaflavin-3-gallate",
        amount: 0.0,
        unit: "",
      },
      {
        name: "Gallocatechin",
        title: "Gallocatechin",
        amount: 0.0,
        unit: "mg",
      },
    ],
    ingredients: [
      {
        id: 2044,
        name: "basil",
        amount: 0.13,
        unit: "cup",
        nutrients: [
          {
            title: "Mono Unsaturated Fat",
            name: "Mono Unsaturated Fat",
            amount: 0.0,
            unit: "g",
          },
          { title: "Fat", name: "Fat", amount: 0.02, unit: "g" },
          { title: "Vitamin B3", name: "Vitamin B3", amount: 0.03, unit: "mg" },
          {
            title: "Carbohydrates",
            name: "Carbohydrates",
            amount: 0.08,
            unit: "g",
          },
          { title: "Vitamin A", name: "Vitamin A", amount: 158.25, unit: "IU" },
          { title: "Vitamin B6", name: "Vitamin B6", amount: 0.0, unit: "mg" },
          { title: "Iron", name: "Iron", amount: 0.1, unit: "mg" },
          { title: "Potassium", name: "Potassium", amount: 8.85, unit: "mg" },
          { title: "Vitamin C", name: "Vitamin C", amount: 0.54, unit: "mg" },
          { title: "Protein", name: "Protein", amount: 0.09, unit: "g" },
          { title: "Vitamin B2", name: "Vitamin B2", amount: 0.0, unit: "mg" },
          {
            title: "Poly Unsaturated Fat",
            name: "Poly Unsaturated Fat",
            amount: 0.01,
            unit: "g",
          },
          { title: "Magnesium", name: "Magnesium", amount: 1.92, unit: "mg" },
          { title: "Vitamin D", name: "Vitamin D", amount: 0.0, unit: "µg" },
          { title: "Calcium", name: "Calcium", amount: 5.31, unit: "mg" },
          { title: "Caffeine", name: "Caffeine", amount: 0.0, unit: "mg" },
          {
            title: "Saturated Fat",
            name: "Saturated Fat",
            amount: 0.0,
            unit: "g",
          },
          { title: "Phosphorus", name: "Phosphorus", amount: 1.68, unit: "mg" },
          { title: "Vitamin E", name: "Vitamin E", amount: 0.02, unit: "mg" },
          { title: "Vitamin B1", name: "Vitamin B1", amount: 0.0, unit: "mg" },
          { title: "Folate", name: "Folate", amount: 2.04, unit: "µg" },
          { title: "Sodium", name: "Sodium", amount: 0.12, unit: "mg" },
          { title: "Vitamin B5", name: "Vitamin B5", amount: 0.01, unit: "mg" },
          {
            title: "Net Carbohydrates",
            name: "Net Carbohydrates",
            amount: 0.03,
            unit: "g",
          },
          { title: "Calories", name: "Calories", amount: 0.69, unit: "kcal" },
          {
            title: "Cholesterol",
            name: "Cholesterol",
            amount: 0.0,
            unit: "mg",
          },
          {
            title: "Vitamin B12",
            name: "Vitamin B12",
            amount: 0.0,
            unit: "µg",
          },
          { title: "Selenium", name: "Selenium", amount: 0.01, unit: "µg" },
          { title: "Vitamin K", name: "Vitamin K", amount: 12.44, unit: "µg" },
          { title: "Fiber", name: "Fiber", amount: 0.05, unit: "g" },
          { title: "Folic Acid", name: "Folic Acid", amount: 0.0, unit: "µg" },
          { title: "Copper", name: "Copper", amount: 0.01, unit: "mg" },
          { title: "Choline", name: "Choline", amount: 0.34, unit: "mg" },
          { title: "Alcohol", name: "Alcohol", amount: 0.0, unit: "g" },
          { title: "Zinc", name: "Zinc", amount: 0.02, unit: "mg" },
          { title: "Manganese", name: "Manganese", amount: 0.03, unit: "mg" },
          { title: "Sugar", name: "Sugar", amount: 0.01, unit: "g" },
        ],
      },
      {
        id: 20081,
        name: "flour",
        amount: 0.5,
        unit: "cup",
        nutrients: [
          {
            title: "Mono Unsaturated Fat",
            name: "Mono Unsaturated Fat",
            amount: 0.05,
            unit: "g",
          },
          { title: "Fat", name: "Fat", amount: 0.61, unit: "g" },
          { title: "Vitamin B3", name: "Vitamin B3", amount: 3.69, unit: "mg" },
          {
            title: "Carbohydrates",
            name: "Carbohydrates",
            amount: 47.69,
            unit: "g",
          },
          { title: "Vitamin A", name: "Vitamin A", amount: 0.0, unit: "IU" },
          { title: "Vitamin B6", name: "Vitamin B6", amount: 0.03, unit: "mg" },
          { title: "Iron", name: "Iron", amount: 2.9, unit: "mg" },
          { title: "Potassium", name: "Potassium", amount: 66.88, unit: "mg" },
          { title: "Vitamin C", name: "Vitamin C", amount: 0.0, unit: "mg" },
          { title: "Protein", name: "Protein", amount: 6.46, unit: "g" },
          { title: "Vitamin B2", name: "Vitamin B2", amount: 0.31, unit: "mg" },
          {
            title: "Poly Unsaturated Fat",
            name: "Poly Unsaturated Fat",
            amount: 0.26,
            unit: "g",
          },
          { title: "Magnesium", name: "Magnesium", amount: 13.75, unit: "mg" },
          { title: "Vitamin D", name: "Vitamin D", amount: 0.0, unit: "µg" },
          { title: "Calcium", name: "Calcium", amount: 9.38, unit: "mg" },
          { title: "Caffeine", name: "Caffeine", amount: 0.0, unit: "mg" },
          {
            title: "Saturated Fat",
            name: "Saturated Fat",
            amount: 0.1,
            unit: "g",
          },
          { title: "Phosphorus", name: "Phosphorus", amount: 67.5, unit: "mg" },
          { title: "Vitamin E", name: "Vitamin E", amount: 0.04, unit: "mg" },
          { title: "Vitamin B1", name: "Vitamin B1", amount: 0.49, unit: "mg" },
          { title: "Folate", name: "Folate", amount: 114.38, unit: "µg" },
          { title: "Sodium", name: "Sodium", amount: 1.25, unit: "mg" },
          { title: "Vitamin B5", name: "Vitamin B5", amount: 0.27, unit: "mg" },
          {
            title: "Net Carbohydrates",
            name: "Net Carbohydrates",
            amount: 46.01,
            unit: "g",
          },
          { title: "Calories", name: "Calories", amount: 227.5, unit: "kcal" },
          {
            title: "Cholesterol",
            name: "Cholesterol",
            amount: 0.0,
            unit: "mg",
          },
          {
            title: "Vitamin B12",
            name: "Vitamin B12",
            amount: 0.0,
            unit: "µg",
          },
          { title: "Selenium", name: "Selenium", amount: 21.19, unit: "µg" },
          { title: "Vitamin K", name: "Vitamin K", amount: 0.19, unit: "µg" },
          { title: "Fiber", name: "Fiber", amount: 1.69, unit: "g" },
          {
            title: "Folic Acid",
            name: "Folic Acid",
            amount: 96.25,
            unit: "µg",
          },
          { title: "Copper", name: "Copper", amount: 0.09, unit: "mg" },
          { title: "Choline", name: "Choline", amount: 6.5, unit: "mg" },
          { title: "Alcohol", name: "Alcohol", amount: 0.0, unit: "g" },
          { title: "Zinc", name: "Zinc", amount: 0.44, unit: "mg" },
          { title: "Manganese", name: "Manganese", amount: 0.43, unit: "mg" },
          { title: "Sugar", name: "Sugar", amount: 0.17, unit: "g" },
        ],
      },
      {
        id: 1022020,
        name: "garlic powder",
        amount: 0.13,
        unit: "",
        nutrients: [
          {
            title: "Mono Unsaturated Fat",
            name: "Mono Unsaturated Fat",
            amount: 0.0,
            unit: "g",
          },
          { title: "Fat", name: "Fat", amount: 0.0, unit: "g" },
          { title: "Vitamin B3", name: "Vitamin B3", amount: 0.0, unit: "mg" },
          {
            title: "Carbohydrates",
            name: "Carbohydrates",
            amount: 0.09,
            unit: "g",
          },
          { title: "Vitamin A", name: "Vitamin A", amount: 0.0, unit: "IU" },
          { title: "Vitamin B6", name: "Vitamin B6", amount: 0.0, unit: "mg" },
          { title: "Iron", name: "Iron", amount: 0.01, unit: "mg" },
          { title: "Potassium", name: "Potassium", amount: 1.49, unit: "mg" },
          { title: "Vitamin C", name: "Vitamin C", amount: 0.0, unit: "mg" },
          { title: "Protein", name: "Protein", amount: 0.02, unit: "g" },
          { title: "Vitamin B2", name: "Vitamin B2", amount: 0.0, unit: "mg" },
          {
            title: "Poly Unsaturated Fat",
            name: "Poly Unsaturated Fat",
            amount: 0.0,
            unit: "g",
          },
          { title: "Magnesium", name: "Magnesium", amount: 0.1, unit: "mg" },
          { title: "Vitamin D", name: "Vitamin D", amount: 0.0, unit: "µg" },
          { title: "Calcium", name: "Calcium", amount: 0.1, unit: "mg" },
          { title: "Caffeine", name: "Caffeine", amount: 0.0, unit: "mg" },
          {
            title: "Saturated Fat",
            name: "Saturated Fat",
            amount: 0.0,
            unit: "g",
          },
          { title: "Phosphorus", name: "Phosphorus", amount: 0.52, unit: "mg" },
          { title: "Vitamin E", name: "Vitamin E", amount: 0.0, unit: "mg" },
          { title: "Vitamin B1", name: "Vitamin B1", amount: 0.0, unit: "mg" },
          { title: "Folate", name: "Folate", amount: 0.06, unit: "µg" },
          { title: "Sodium", name: "Sodium", amount: 0.08, unit: "mg" },
          { title: "Vitamin B5", name: "Vitamin B5", amount: 0.0, unit: "mg" },
          {
            title: "Net Carbohydrates",
            name: "Net Carbohydrates",
            amount: 0.08,
            unit: "g",
          },
          { title: "Calories", name: "Calories", amount: 0.41, unit: "kcal" },
          {
            title: "Cholesterol",
            name: "Cholesterol",
            amount: 0.0,
            unit: "mg",
          },
          {
            title: "Vitamin B12",
            name: "Vitamin B12",
            amount: 0.0,
            unit: "µg",
          },
          { title: "Selenium", name: "Selenium", amount: 0.03, unit: "µg" },
          { title: "Vitamin K", name: "Vitamin K", amount: 0.0, unit: "µg" },
          { title: "Trans Fat", name: "Trans Fat", amount: 0.0, unit: "g" },
          { title: "Fiber", name: "Fiber", amount: 0.01, unit: "g" },
          { title: "Folic Acid", name: "Folic Acid", amount: 0.0, unit: "µg" },
          { title: "Copper", name: "Copper", amount: 0.0, unit: "mg" },
          { title: "Choline", name: "Choline", amount: 0.08, unit: "mg" },
          { title: "Alcohol", name: "Alcohol", amount: 0.0, unit: "g" },
          { title: "Zinc", name: "Zinc", amount: 0.0, unit: "mg" },
          { title: "Manganese", name: "Manganese", amount: 0.0, unit: "mg" },
          { title: "Sugar", name: "Sugar", amount: 0.0, unit: "g" },
        ],
      },
      {
        id: 1062047,
        name: "garlic salt",
        amount: 1.0,
        unit: "servings",
        nutrients: [
          {
            title: "Mono Unsaturated Fat",
            name: "Mono Unsaturated Fat",
            amount: 0.0,
            unit: "g",
          },
          { title: "Fat", name: "Fat", amount: 0.0, unit: "g" },
          { title: "Vitamin B3", name: "Vitamin B3", amount: 0.0, unit: "mg" },
          {
            title: "Carbohydrates",
            name: "Carbohydrates",
            amount: 0.0,
            unit: "g",
          },
          { title: "Vitamin A", name: "Vitamin A", amount: 0.0, unit: "IU" },
          { title: "Vitamin B6", name: "Vitamin B6", amount: 0.0, unit: "mg" },
          { title: "Iron", name: "Iron", amount: 0.0, unit: "mg" },
          { title: "Potassium", name: "Potassium", amount: 0.04, unit: "mg" },
          { title: "Vitamin C", name: "Vitamin C", amount: 0.0, unit: "mg" },
          { title: "Protein", name: "Protein", amount: 0.0, unit: "g" },
          { title: "Vitamin B2", name: "Vitamin B2", amount: 0.0, unit: "mg" },
          {
            title: "Poly Unsaturated Fat",
            name: "Poly Unsaturated Fat",
            amount: 0.0,
            unit: "g",
          },
          { title: "Magnesium", name: "Magnesium", amount: 0.01, unit: "mg" },
          { title: "Vitamin D", name: "Vitamin D", amount: 0.0, unit: "µg" },
          { title: "Calcium", name: "Calcium", amount: 0.12, unit: "mg" },
          { title: "Caffeine", name: "Caffeine", amount: 0.0, unit: "mg" },
          {
            title: "Saturated Fat",
            name: "Saturated Fat",
            amount: 0.0,
            unit: "g",
          },
          { title: "Phosphorus", name: "Phosphorus", amount: 0.0, unit: "mg" },
          { title: "Vitamin E", name: "Vitamin E", amount: 0.0, unit: "mg" },
          { title: "Vitamin B1", name: "Vitamin B1", amount: 0.0, unit: "mg" },
          { title: "Folate", name: "Folate", amount: 0.0, unit: "µg" },
          { title: "Sodium", name: "Sodium", amount: 193.79, unit: "mg" },
          { title: "Vitamin B5", name: "Vitamin B5", amount: 0.0, unit: "mg" },
          {
            title: "Net Carbohydrates",
            name: "Net Carbohydrates",
            amount: 0.0,
            unit: "g",
          },
          { title: "Fluoride", name: "Fluoride", amount: 0.01, unit: "mg" },
          { title: "Calories", name: "Calories", amount: 0.0, unit: "kcal" },
          {
            title: "Cholesterol",
            name: "Cholesterol",
            amount: 0.0,
            unit: "mg",
          },
          {
            title: "Vitamin B12",
            name: "Vitamin B12",
            amount: 0.0,
            unit: "µg",
          },
          { title: "Selenium", name: "Selenium", amount: 0.0, unit: "µg" },
          { title: "Vitamin K", name: "Vitamin K", amount: 0.0, unit: "µg" },
          { title: "Fiber", name: "Fiber", amount: 0.0, unit: "g" },
          { title: "Folic Acid", name: "Folic Acid", amount: 0.0, unit: "µg" },
          { title: "Copper", name: "Copper", amount: 0.0, unit: "mg" },
          { title: "Choline", name: "Choline", amount: 0.0, unit: "mg" },
          { title: "Alcohol", name: "Alcohol", amount: 0.0, unit: "g" },
          { title: "Zinc", name: "Zinc", amount: 0.0, unit: "mg" },
          { title: "Manganese", name: "Manganese", amount: 0.0, unit: "mg" },
          { title: "Sugar", name: "Sugar", amount: 0.0, unit: "g" },
        ],
      },
      {
        id: 11352,
        name: "potatoes",
        amount: 2.0,
        unit: "",
        nutrients: [
          {
            title: "Mono Unsaturated Fat",
            name: "Mono Unsaturated Fat",
            amount: 0.01,
            unit: "g",
          },
          { title: "Fat", name: "Fat", amount: 0.38, unit: "g" },
          { title: "Vitamin B3", name: "Vitamin B3", amount: 4.49, unit: "mg" },
          {
            title: "Carbohydrates",
            name: "Carbohydrates",
            amount: 74.42,
            unit: "g",
          },
          { title: "Vitamin A", name: "Vitamin A", amount: 8.52, unit: "IU" },
          { title: "Vitamin B6", name: "Vitamin B6", amount: 1.26, unit: "mg" },
          { title: "Iron", name: "Iron", amount: 3.32, unit: "mg" },
          {
            title: "Potassium",
            name: "Potassium",
            amount: 1793.46,
            unit: "mg",
          },
          { title: "Vitamin C", name: "Vitamin C", amount: 83.92, unit: "mg" },
          { title: "Protein", name: "Protein", amount: 8.61, unit: "g" },
          { title: "Vitamin B2", name: "Vitamin B2", amount: 0.14, unit: "mg" },
          {
            title: "Poly Unsaturated Fat",
            name: "Poly Unsaturated Fat",
            amount: 0.18,
            unit: "g",
          },
          { title: "Magnesium", name: "Magnesium", amount: 97.98, unit: "mg" },
          { title: "Vitamin D", name: "Vitamin D", amount: 0.0, unit: "µg" },
          { title: "Calcium", name: "Calcium", amount: 51.12, unit: "mg" },
          { title: "Caffeine", name: "Caffeine", amount: 0.0, unit: "mg" },
          {
            title: "Saturated Fat",
            name: "Saturated Fat",
            amount: 0.11,
            unit: "g",
          },
          {
            title: "Phosphorus",
            name: "Phosphorus",
            amount: 242.82,
            unit: "mg",
          },
          { title: "Vitamin E", name: "Vitamin E", amount: 0.04, unit: "mg" },
          { title: "Vitamin B1", name: "Vitamin B1", amount: 0.34, unit: "mg" },
          { title: "Folate", name: "Folate", amount: 68.16, unit: "µg" },
          { title: "Sodium", name: "Sodium", amount: 25.56, unit: "mg" },
          { title: "Vitamin B5", name: "Vitamin B5", amount: 1.26, unit: "mg" },
          {
            title: "Net Carbohydrates",
            name: "Net Carbohydrates",
            amount: 65.05,
            unit: "g",
          },
          { title: "Calories", name: "Calories", amount: 328.02, unit: "kcal" },
          {
            title: "Cholesterol",
            name: "Cholesterol",
            amount: 0.0,
            unit: "mg",
          },
          {
            title: "Vitamin B12",
            name: "Vitamin B12",
            amount: 0.0,
            unit: "µg",
          },
          { title: "Selenium", name: "Selenium", amount: 1.28, unit: "µg" },
          { title: "Vitamin K", name: "Vitamin K", amount: 8.09, unit: "µg" },
          { title: "Fiber", name: "Fiber", amount: 9.37, unit: "g" },
          { title: "Folic Acid", name: "Folic Acid", amount: 0.0, unit: "µg" },
          { title: "Copper", name: "Copper", amount: 0.46, unit: "mg" },
          { title: "Choline", name: "Choline", amount: 51.55, unit: "mg" },
          { title: "Alcohol", name: "Alcohol", amount: 0.0, unit: "g" },
          { title: "Zinc", name: "Zinc", amount: 1.24, unit: "mg" },
          { title: "Manganese", name: "Manganese", amount: 0.65, unit: "mg" },
          { title: "Sugar", name: "Sugar", amount: 3.32, unit: "g" },
        ],
      },
      {
        id: 4513,
        name: "vegetable oil",
        amount: 1.0,
        unit: "servings",
        nutrients: [
          {
            title: "Net Carbohydrates",
            name: "Net Carbohydrates",
            amount: 0.0,
            unit: "g",
          },
        ],
      },
    ],
    caloricBreakdown: {
      percentProtein: 10.86,
      percentFat: 1.64,
      percentCarbs: 87.5,
    },
    weightPerServing: { amount: 506, unit: "g" },
  },
  summary:
    'The recipe Homemade Garlic and Basil French Fries is ready <b>in roughly 45 minutes</b> and is definitely a super <b>vegan</b> option for lovers of American food. One serving contains <b>596 calories</b>, <b>18g of protein</b>, and <b>15g of fat</b>. For <b>83 cents per serving</b>, you get a side dish that serves 2. Several people made this recipe, and 1669 would say it hit the spot. If you have garlic salt, flour, garlic powder, and a few other ingredients on hand, you can make it. All things considered, we decided this recipe <b>deserves a spoonacular score of 100%</b>. This score is outstanding. Try <a href="https://spoonacular.com/recipes/homemade-french-fries-with-fresh-garlic-and-dill-494220">Homemade French Fries with Fresh Garlic and Dill</a>, <a href="https://spoonacular.com/recipes/roasted-garlic-french-fries-519898">Roasted Garlic French Fries</a>, and <a href="https://spoonacular.com/recipes/sweet-potato-fries-with-basil-salt-and-garlic-mayonnaise-120735">Sweet Potato Fries With Basil Salt and Garlic Mayonnaise</a> for similar recipes.',
  cuisines: ["American"],
  dishTypes: ["lunch", "main course", "main dish", "dinner"],
  diets: ["dairy free", "lacto ovo vegetarian", "vegan"],
  occasions: [],
  winePairing: { pairedWines: [], pairingText: "", productMatches: [] },
  instructions: null,
  analyzedInstructions: [],
  originalId: null,
  spoonacularSourceUrl:
    "https://spoonacular.com/homemade-garlic-and-basil-french-fries-715594",
};

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const RecipeCard = (props) => {
  const [expanded, setExpanded] = useState(false);

  const [recipe, setRecipe] = useState(recipeData);

  //   const getRecipe = useCallback(() => {
  //     axios
  //       .get(
  //         "https://api.spoonacular.com/recipes/informationBulk?apiKey=" +
  //           process.env.REACT_APP_API_KEY +
  //           "&ids=" +
  //           props.id +
  //           "&includeNutrition=true"
  //       )
  //       .then((res) => {
  //         setRecipe(res.data[0]);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   }, [props.id]);
  //   useEffect(() => {
  //     console.log("In effect");
  //     getRecipe();
  //   }, [getRecipe]);
  let modifiedSummary = recipe.summary ? recipe.summary : null;

  modifiedSummary = modifiedSummary.replace(/<\/?[^>]+(>|$)/g, "");

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        action={
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
        }
        title={recipe.title ? recipe.title : "No title"}
        subheader={
          "Servings: " +
          recipe.servings +
          " Calories: " +
          recipe.nutrition.nutrients[0].amount
        }
      />
      <CardMedia
        component="img"
        height="150"
        image={recipe.image}
        alt={recipe.title ? recipe.title : "No title"}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {modifiedSummary}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        {recipe.instructions && (
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        )}
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>{recipe.instructions}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default RecipeCard;
