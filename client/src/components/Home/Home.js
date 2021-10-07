import { useSelector } from "react-redux";
const Home = () => {
  const userEmail = useSelector((state) => state.user);
  return <h1>{userEmail}</h1>;
};
export default Home;
