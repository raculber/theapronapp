import { useSelector } from "react-redux";
import axios from "axios";

const Pantry = () => {
  const userId = useSelector((state) => state.user.userId);
  console.log(userId);

  const addIngredient = () => {
    //Send ingredient to database
    //Replace ingredientId with correct id
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
