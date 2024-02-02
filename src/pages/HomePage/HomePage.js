import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
const HomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem("userId")) {
      navigate("/applicationLists");
    }
  }, []);
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
