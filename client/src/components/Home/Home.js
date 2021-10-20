import { useSelector } from "react-redux";
const Home = () => {
  const userEmail = useSelector((state) => state.user.email);

  return <h1>{userEmail}</h1>;
};
export default Home;
