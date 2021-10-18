import { useSelector } from "react-redux";
const Home = () => {
  //Ignore this warning
  const userEmail = useSelector((state) => state.user.email);

  console.log(userEmail);
  return <h1>{userEmail}</h1>;
};
export default Home;
