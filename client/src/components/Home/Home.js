import { useSelector } from "react-redux";
import RecipeCard from "../Recipe/RecipeCard";
const Home = () => {
  const userEmail = useSelector((state) => state.user.email);

  return (
    <div>
      <RecipeCard id="715594" />
    </div>
  );
};
export default Home;
