import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./ApplicationListsPage.scss";
import axios from "axios";
const ApplicationListPage = () => {
  const [hasLoaded, setHasLoaded] = useState(false);
  const [applicationLists, setApplicationLists] = useState([]);
  const API_BASE_URL = "http://localhost:8080/";

  const navigate = useNavigate();
  const getDate = (dateData) => {
    const dateArray = new Date(dateData).toLocaleString().split(",");
    return dateArray[0];
  };
  const getTime = (dateData) => {
    const dateArray = new Date(dateData).toLocaleString().split(",");
    return dateArray[1];
  };
  const getApplicationLists = () => {
    axios
      .get(
        `${API_BASE_URL}getAllApplications/${sessionStorage.getItem(
          "profileId"
        )}`,
        {
          headers: {
            authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
          },
        }
      )
      .then((respond) => {
        setApplicationLists(respond.data);
      })
      .then(() => {
        setHasLoaded(true);
      })
      .catch((err) => {
        navigate("/Login");
        console.log(err);
      });
  };
  useEffect(() => {
    getApplicationLists();
  }, []);

  if (hasLoaded) {
    if (applicationLists.length === 0) {
      return (
        <article className="zero-applications">
          <h1 className="zero-applications__header">Application Lists</h1>
          <h3 className="zero-applications__message">
            "You don't have any job active job application"
          </h3>

          <Link to="/addApplication" className="zero-applications__link">
            <button className="zero-applications__link--button">
              Add application
            </button>
          </Link>
        </article>
      );
    }
    if (applicationLists.length > 0) {
      return (
        <article className="application-table">
          <h1 className="application-table__header">Application lists</h1>
          <section className="application-table__item-header">
            <h3 className="application-table__item-header--company-name">
              Company name
            </h3>
            <h3 className="application-table__item-header--position">
              Position
            </h3>
            <h3 className="application-table__item-header--date">
              Date Applied
            </h3>
            <h3 className="application-table__item-header--time">Time</h3>
          </section>
          <section className="application-table__item">
            {applicationLists.map((item) => {
              return (
                <Link
                  to={`/applicationDetail/${item.id}`}
                  key={item.id}
                  className="application-table__item--link"
                >
                  <h2 className="company-name">{item.company_name}</h2>
                  <h2 className="position">{item.position}</h2>
                  <h2 className="date">{getDate(item.date_applied)}</h2>
                  <h2 className="time">{getTime(item.date_applied)}</h2>
                </Link>
              );
            })}
          </section>
        </article>
      );
    }
  }
};
export default ApplicationListPage;
