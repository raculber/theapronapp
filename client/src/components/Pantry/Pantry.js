import { useSelector } from "react-redux";
import axios from "axios";

const Pantry = () => {
  const userId = useSelector((state) => state.user.userId);

  const addIngredient = () => {
    //Retrieve searched for ingredient
    // axios
    //   .get(
    //     "https://api.spoonacular.com/food/ingredients/search?apiKey=" +
    //       process.env.REACT_APP_API_KEY +
    //       "&query=broccoli"
    //   )
    //   .then((res) => {
    //     console.log(res);
    //   });
    //Send ingredient to database
    axios
      .post("http://localhost:3001/api/add-ingredient", {
        userId: userId,
        ingredientId: 11090,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return <button onClick={addIngredient}>Add Ingredient</button>;
};

export default Pantry;
