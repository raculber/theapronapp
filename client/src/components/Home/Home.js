import { useSelector } from "react-redux";
import RecipeCard from "../UI/RecipeCard";
const Home = () => {
  const userEmail = useSelector((state) => state.user.email);

  return (
    <div>
      <h1>{userEmail}</h1>
      <RecipeCard id="715594" />
    </div>
  );
};
export default Home;
