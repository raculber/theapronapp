import { accordionSummaryClasses } from "@mui/material";
import axios from "axios";
import { Fragment } from "react";
import { useSelector } from "react-redux";
import recipe from "../Recipe/recipe";
import recipe2 from "../Recipe/recipe2";
import recipe3 from "../Recipe/recipe3";
//Dummy data
let items = [
  { id: 1, name: "banana", amount: 10, unit: "" },
  { id: 2, name: "bread", amount: 5, unit: "" },
];
let updateItem = { id: 3, name: "milk", amount: 5, unit: "cups" };
let recipes = [
  recipe.nutrition.ingredients,
  recipe2.nutrition.ingredients,
  recipe3.nutrition.ingredients,
];
const GroceryLists = (props) => {
  const userId = useSelector((state) => state.user.userId);

  const addGroceryList = () => {
    axios
      .post("http://localhost:3001/api/add-grocery-list", {
        userId: userId,
        items: items,
        headers: {
          "access-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getGroceryLists = () => {
    axios
      .get("http://localhost:3001/api/get-grocery-lists?userId=" + userId, {
        headers: {
          "access-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getGroceryList = () => {
    axios
      .get(
        "http://localhost:3001/api/get-grocery-list?userId=" +
          userId +
          "&listName=Grocery List 2",
        {
          headers: {
            "access-token": localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteList = () => {
    axios
      .delete("http://localhost:3001/api/delete-grocery-list", {
        data: {
          userId: userId,
          name: "Grocery List 1",
        },
        headers: {
          "access-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  /**
   * Update a grocery list with a new list of items
   */
  const updateList = () => {
    let updatedItems = items.concat([updateItem]);

    //Name of grocery list to update
    let listName = "Grocery List 2";
    axios
      .put("http://localhost:3001/api/update-grocery-list", {
        userId: userId,
        items: updatedItems,
        listName: listName,
        headers: {
          "access-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  /**
   * Create a new grocery list by aggregating ingredients
   * from a list of recipes (inoring amount and units for now)
   */
  const aggregateList = () => {
    axios
      .post("http://localhost:3001/api/aggregate-grocery-lists", {
        userId: userId,
        recipes: recipes,
        headers: {
          "access-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Fragment>
      <button onClick={addGroceryList}>Add List</button>
      <button onClick={updateList}>Update List</button>
      <button onClick={deleteList}>Delete List</button>
      <button onClick={updateList}>Update List</button>
      <button onClick={aggregateList}>Aggregate List</button>
      <button onClick={getGroceryLists}>Get Grocery Lists</button>
      <button onClick={getGroceryList}>Get Grocery List</button>
    </Fragment>
  );
};

export default GroceryLists;
