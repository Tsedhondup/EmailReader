import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./HomePage.scss";
const HomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem("userId")) {
      navigate("/applicationLists");
    }
  }, []);
  return (
    <>
      <Link to="/Login">
        <button>Log In</button>
      </Link>
    </>
  );
};
export default HomePage;
