import { useSelector } from "react-redux";
const Home = () => {
  /*Why this is giving an error I have no idea... im not even using typescript and it worked on
  my other project*/
  const userEmail = useSelector((state) => state.user.userEmail);
  console.log(userEmail);
  return <h1>Home</h1>;
};
export default Home;
