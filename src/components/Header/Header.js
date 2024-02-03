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
  }, [location.pathname]);

  if (!hasUser) {
    return (
      <section className="header-log-out">
        <h2 className="header-log-out__app-name">Job Application Tracker</h2>
      </section>
    );
  }
  if (hasUser) {
    return (
      <section className="header-log-in">
        <div className="header-log-in__content">
          <div className="app-logo">
            <Link className="app-logo__link">
              <h2 className="app-logo__link--text">Job Application Tracker</h2>
            </Link>
          </div>

          <div className="page-link-container">
            <Link
              to="/applicationLists"
              className="page-link-container__applications"
            >
              Applications
            </Link>
            <Link
              to="/interviewLists"
              className="page-link-container__interviews"
            >
              Interviews
            </Link>

            <p className="page-link-container__profile">{user.full_name}</p>
          </div>
        </div>
      </section>
    );
  }
};
export default Header;
