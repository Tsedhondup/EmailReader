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

  const handleApplicationStatus = (event) => {
    axios
      .patch(
        `${API_BASE_URL}updateApplication/${event.target.id}`,
        {
          status: event.target.value,
        },
        {
          headers: {
            authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
          },
        }
      )
      .catch((err) => {
        console.log("cannot update application");
      });
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
            <h3 className="application-table__item-header--time">Status</h3>
          </section>
          <section className="application-table__item">
            {applicationLists.map((item) => {
              return (
                <div key={item.id} className="application-table__item--link">
                  <Link
                    className="company-name"
                    to={`/applicationDetail/${item.id}`}
                  >
                    {item.company_name}
                  </Link>
                  <Link
                    className="position"
                    to={`/applicationDetail/${item.id}`}
                  >
                    {item.position}
                  </Link>
                  <h2 className="date">{getDate(item.date_applied)}</h2>
                  <h2 className="time">{getTime(item.date_applied)}</h2>
                  <div
                    className="status-options-container"
                    onClick={(event) => {
                      event.stopPropagation();
                    }}
                  >
                    <select
                      id={item.id}
                      className="status-options-container__options"
                      onChange={(event) => {
                        handleApplicationStatus(event);
                      }}
                    >
                      <option value={item.status}>{item.status}</option>
                      <option value="Applied">Applied</option>
                      <option value="Processing">Processing</option>
                      <option value="Offered">Offered</option>
                      <option value="Accepted">Accepted</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </div>
                </div>
              );
            })}
          </section>
        </article>
      );
    }
  }
};
export default ApplicationListPage;
