import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./ApplicationListsPage.scss";
import axios from "axios";
const ApplicationListPage = () => {
  const [hasApplication, setHasApplication] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [applicationLists, setApplicationLists] = useState([]);
  const API_BASE_URL = "http://localhost:8080/";

  const getApplicationLists = () => {
    axios
      .get(`${API_BASE_URL}getAllApplications`)
      .then((respond) => {
        setApplicationLists(respond.data);
      })
      .then(() => {
        setHasLoaded(true);
        setHasApplication(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getApplicationLists();
  }, []);

  if (hasLoaded) {
    if (!hasApplication) {
      return (
        <article>
          <h1>Job Application Lists</h1>
          <h3>You don't have any job active job application </h3>

          <Link to="addApplication">
            <button>Add application</button>
          </Link>
        </article>
      );
    }
    if (hasApplication) {
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
