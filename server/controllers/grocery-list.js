import express from "express";

import GroceryList from "../models/grocerylist.js";

const router = express.Router();

export const deleteList = async (req, res) => {
  let { userId, name } = req.body;

  console.log(name);
  const list = await GroceryList.findOne({
    userId: userId,
    groceryLists: {
      $elemMatch: { name: name },
    },
  });
  //Delete if list exists
  if (list) {
    console.log("exist");
    console.log(list.groceryLists);
    await GroceryList.updateOne(
      {
        userId: userId,
      },
      { $pull: { groceryLists: { name: name } } }
    );
    //Update names for grocery lists
    res.json({ message: "Removed grocery list" });
  } else res.json({ message: "Grocery list not found" });
};

export const addList = async (req, res) => {
  let { userId, items } = req.body;
  const userExists = await GroceryList.exists({
    userId: userId,
  });
  let listName = "Grocery List 1";
  //Create new user if user does not exist
  //Otherwise, add to existing array
  if (!userExists) {
    let userLists = new GroceryList({
      userId: userId,
      groceryLists: [{ name: listName, items: items }],
    });
    userLists.save();
  } else {
    let userLists = await GroceryList.findOne({
      userId: userId,
    });
    console.log(userLists.groceryLists.length);
    let listNum = userLists.groceryLists.length + 1;
    listName = "Grocery List " + listNum;
    console.log(listName);

    userLists.groceryLists.push({
      name: listName,
      items: items,
    });
    userLists.save();
  }
};

export default router;
