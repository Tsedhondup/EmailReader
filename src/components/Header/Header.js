import axios from "axios";
import "./Header.scss";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
const Header = () => {
  const API_BASE_URL = "http://localhost:8080/";
  let location = useLocation();
  const [user, setUser] = useState("");
  const [hasUser, setHasUser] = useState(false);
  const handleLogOut = () => {
    axios
      .post(`${API_BASE_URL}logOut`)
      .then(() => {
        sessionStorage.removeItem("authToken");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  useEffect(() => {
    if (sessionStorage.getItem("profileId")) {
      axios
        .get(`${API_BASE_URL}profile/${sessionStorage.getItem("profileId")}`, {
          headers: {
            authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
          },
        })
        .then((response) => {
          setUser(response.data[0]);
          console.log(response.data[0]);
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
  if (location.pathname === "/Login") {
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
            <Link
              to="/scheduleInterview"
              className="page-link-container__add-interviews"
            >
              add interviews
            </Link>
            <Link
              to="/addApplication"
              className="page-link-container__add-application"
            >
              add application
            </Link>
            <p className="page-link-container__profile">{user.full_name}</p>
            <Link
              to="/Login"
              className="page-link-container__sign-out"
              onClick={() => {
                sessionStorage.removeItem("userId");
                sessionStorage.removeItem("profileId");
                setHasUser(false);
                handleLogOut();
              }}
            >
              sign out
            </Link>
          </div>
        </div>
      </section>
    );
  }
};
export default Header;
