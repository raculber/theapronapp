import { useSelector } from "react-redux";
import axios from "axios";

const Pantry = () => {
  const userId = useSelector((state) => state.user.userId);
  console.log(userId);

  const removeIngredient = () => {
    axios
      .delete("http://localhost:3001/api/delete-ingredient", {
        data: { userId: userId, ingredientId: 18064 },
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

  const getIngredients = () => {
    axios
      .get("http://localhost:3001/api/get-ingredients?userId=" + userId, {
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

  const addIngredient = () => {
    //Send ingredient to database
    //Replace ingredientId with correct id
    axios
      .post("http://localhost:3001/api/add-ingredient", {
        userId: userId,
        ingredientId: 18064,
        ingredientName: "bread",
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
    <div>
      <button onClick={addIngredient}>Add Ingredient</button>
      <button onClick={getIngredients}>Get Ingredients</button>
      <button onClick={removeIngredient}>Remove Ingredient</button>
    </div>
  );
};

export default Pantry;
