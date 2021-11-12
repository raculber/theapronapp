import axios from "axios";
import { useEffect, useState } from "react";
import RecipeCard from "../Recipe/RecipeCard";
import "./Home.css";
const Home = () => {
  const [recipes, setRecipes] = useState([]);
  useEffect(() => {
    console.log("In response");
    if (recipes.length === 0) {
      axios
        .get("http://localhost:3001/api/get-random-recipes?number=10")
        .then((res) => {
          console.log(res.data.recipes.results);
          setRecipes(res.data.recipes.results);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [recipes]);
  console.log(recipes);
  return (
    <div className="home">
      {recipes.map((recipe) => (
        <RecipeCard recipe={recipe} key={recipe.id} />
      ))}
    </div>
  );
};
export default Home;
