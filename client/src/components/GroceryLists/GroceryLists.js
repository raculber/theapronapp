import axios from "axios";
import { Fragment } from "react";
import { useSelector } from "react-redux";

const GroceryLists = (props) => {
  let items = [{ id: 1, name: "banana", amount: 10, unit: "" }];
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

  return (
    <Fragment>
      <button onClick={addGroceryList}>Add List</button>
      <button onClick={deleteList}>Delete List</button>
    </Fragment>
  );
};

export default GroceryLists;
