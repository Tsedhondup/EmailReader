import { Link } from "react-router-dom";
const HomePage = () => {
  return (
    <>
      <h1>Home Page</h1>
      <link to="/Login">
        <button>Log In</button>
      </link>
    </>
  );
};
export default HomePage;
