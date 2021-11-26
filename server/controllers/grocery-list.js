import express from "express";

import GroceryList from "../models/grocerylist.js";

const router = express.Router();

export const deleteList = async (req, res) => {
  let { userId, name } = req.body;
  let deletedNum = Number(name.slice(-1));

  const userLists = await GroceryList.findOneAndUpdate(
    { userId: userId },
    { $pull: { groceryLists: { name: name } } }
  );
  //List exists
  if (userLists) {
    //Update names for grocery lists
    let groceryLists = userLists.groceryLists;

    groceryLists.forEach(async (item) => {
      let listName = item.name;
      //Get grocery list number
      let listNum = Number(listName.slice(-1));
      //If list appeared after the deleted list
      //Subtract 1 from name
      if (listNum > deletedNum) {
        listNum -= 1;
        let newName = "Grocery List " + listNum;
        await GroceryList.updateOne(
          { userId: userId, groceryLists: { $elemMatch: { name: listName } } },
          {
            $set: {
              "groceryLists.$.name": newName,
            },
          }
        );
      }
    });
    res.json({ message: "Removed grocery list" });
  } else res.json({ message: "Grocery list not found" });
};

//Get all grocery lists
export const getLists = async (req, res) => {
  let userId = req.query.userId;
  const userLists = await GroceryList.findOne({
    userId: userId,
  });
  if (!userLists) res.json({ message: "No lists found" });
  else res.json({ lists: userLists.groceryLists });
};

export const updateList = async (req, res) => {
  let userId = req.query.userId;
  let items = req.query.items;
  await GroceryList.updateOne(
    { userId: userId, groceryLists: { $elemMatch: { name: listName } } },
    {
      $set: {
        "groceryLists.$.items": items,
      },
    }
  );
};

export const addList = async (req, res) => {
  let { userId, items } = req.body;
  items.forEach((item) => {
    if (item.name.length == 0)
      res.json({ message: "Item name must not be empty" });
    else if (item.amount <= 0)
      res.json({ message: "Amount must be greater than 0" });
  });
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
    userLists.groceryLists.push({
      name: listName,
      items: items,
    });
    userLists.save();
  }
};

export default router;
