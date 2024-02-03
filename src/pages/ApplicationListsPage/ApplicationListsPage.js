import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./ApplicationListsPage.scss";
import axios from "axios";
const ApplicationListPage = () => {
  const [hasLoaded, setHasLoaded] = useState(false);
  const [applicationLists, setApplicationLists] = useState([]);
  const API_BASE_URL = "http://localhost:8080/";

  const navigate = useNavigate();

  const getApplicationLists = () => {
    axios
      .get(`${API_BASE_URL}getAllApplications`, {
        headers: {
          userId: sessionStorage.getItem("userId"),
        },
      })
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
          <h1 className="zero-applications__header">Job Application Lists</h1>
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
          <h1 className="application-table__header">Job Application lists</h1>
          <section>
            {applicationLists.map((item) => {
              return (
                <Link
                  to={`/applicationDetail/${item.id}`}
                  key={item.id}
                  className="application"
                >
                  <h2 className="application__company">{item.company_name}</h2>
                  <h2 className="application__position">{item.position}</h2>
                  <h2 className="application__date">{item.date_applied}</h2>
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
