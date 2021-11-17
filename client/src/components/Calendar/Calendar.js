import { useRef } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import recipe from "../Recipe/recipe";
const Calendar = () => {
  const dateRef = useRef("");
  const userId = useSelector((state) => state.user.userId);
  console.log(userId);

  const addRecipe = (event) => {
    console.log(dateRef.current.value);
    const dateRecipeInfo = {
      userId: userId,
      date: dateRef.current.value,
      recipe: recipe,
    };
    axios
      .post("http://localhost:3001/api/add-recipe-to-date", dateRecipeInfo)
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
        value="2018-07-22"
        min="2018-01-01"
        max="2018-12-31"
        ref={dateRef}
      />
      <button onClick={addRecipe}>Add recipe</button>
    </div>
  );
};

export default Calendar;
