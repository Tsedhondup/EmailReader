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
      <div className="button-container">
        <Link to="/Login" className="button-container__link">
          <button className="button-container__link--button">Log In</button>
        </Link>
        <Link to="/SignUp" className="button-container__link">
          <button className="button-container__link--button">Sign Up</button>
        </Link>
      </div>
    </>
  );
};
export default HomePage;
