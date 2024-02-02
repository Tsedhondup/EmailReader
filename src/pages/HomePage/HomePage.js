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
      <div className="log-in-button-container">
        <Link to="/Login" className="log-in-button-container__link">
          <button className="log-in-button-container__link--button">
            Log In
          </button>
        </Link>
      </div>
    </>
  );
};
export default HomePage;
