import axios from "axios";
import "./Header.scss";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
const Header = () => {
  const API_BASE_URL = "http://localhost:8080/";
  let location = useLocation();
  const [user, setUser] = useState("");
  const [hasUser, setHasUser] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("userId")) {
      axios
        .get(`${API_BASE_URL}profile`, {
          headers: {
            userId: sessionStorage.getItem("userId"),
          },
        })
        .then((response) => {
          setUser(response.data[0]);
        })
        .then(() => {
          setHasUser(true);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
    // setPageLocation(location.pathname);
  }, [location.pathname]);

  if (!hasUser) {
    return (
      <section className="header">
        <div>
          <Link className="header-logo-container">
            <h2 className="header-logo-container__logo">
              Job Application Tracker
            </h2>
          </Link>
        </div>
      </section>
    );
  }
  if (hasUser) {
    return (
      <section className="header">
        <div className="header__content">
          <div>
            <Link className="header-logo-container">
              <h2 className="header-logo-container__logo">
                Job Application Tracker
              </h2>
            </Link>
          </div>
          <div className="header-button-container">
            <Link to="addApplication">
              <button className="header-button-container__button">
                Add Application
              </button>
            </Link>

            <p>{user.full_name}</p>
            <Link
              to="/interviewLists"
              className="header-button-container__button"
            >
              Interviews
            </Link>
          </div>
        </div>
      </section>
    );
  }
};
export default Header;
