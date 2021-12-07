import { createSlice } from "@reduxjs/toolkit";

const groceryListSlice = createSlice({
  name: "groceryList",
  initialState: {
    count: 0,
    recipes: [],
  },
  reducers: {
    addRecipe(state, action) {
      const newRecipe = action.payload;
      state.recipes.push({
        id: newRecipe.id,
        ingredients: newRecipe.ingredients,
      });
    },
    removeRecipe(state, action) {
      const recipeId = action.payload.id;
      state.recipes = state.recipes.filter((recipe) => recipe.id != recipeId);
    },
  },
});

export const { addRecipe, removeRecipe } = groceryListSlice.actions;
export default groceryListSlice;
