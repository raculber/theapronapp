import { useRef } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import recipe from "../Recipe/recipe";
const Calendar = () => {
  const dateRef = useRef("");
  const userId = useSelector((state) => state.user.userId);
  console.log(userId);

  const addRecipe = () => {
    console.log(dateRef.current.value);
    const dateRecipeInfo = {
      userId: userId,
      date: dateRef.current.value,
      recipe: recipe,
    };
    axios
      .post("http://localhost:3001/api/add-recipe-to-date", {
        userId: userId,
        date: dateRef.current.value,
        recipe: recipe,
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
  const deleteRecipe = () => {
    axios
      .delete("http://localhost:3001/api/delete-recipe-from-date", {
        data: {
          userId: userId,
          date: dateRef.current.value,
          recipeId: recipe.id,
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
  const getRecipesByDate = () => {
    axios
      .get(
        "http://localhost:3001/api/get-recipes-by-date?userId=" +
          userId +
          "&date=" +
          dateRef.current.value,
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
  return (
    <div>
      <input
        type="date"
        id="start"
        name="trip-start"
        defaultValue="2018-07-22"
        ref={dateRef}
      />
      <button onClick={addRecipe}>Add recipe</button>
      <button onClick={deleteRecipe}>Delete recipe</button>
      <button onClick={getRecipesByDate}>Get Recipes</button>
    </div>
  );
};

export default Calendar;
