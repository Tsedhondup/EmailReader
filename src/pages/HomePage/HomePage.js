import { Link } from "react-router-dom";
const HomePage = () => {
  return (
    <>
      <h1>Home Page</h1>
      <Link to="/Login">
        <button>Log In</button>
      </Link>
    </>
  );
};
export default HomePage;
