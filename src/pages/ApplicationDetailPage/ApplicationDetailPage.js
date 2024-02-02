import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import "./ApplicationDetailPage.scss";
import ApplicationListsSidebar from "../../components/ApplicationListsSidebar/ApplicationListsSidebar";
import ApplicationDetailAnalytics from "../../components/ApplicationDetailAnalytics/ApplicationDetailAnalytics";
import axios from "axios";

const ApplicatioDetailPage = () => {
  const { id } = useParams();
  const BASE_URL = "http://localhost:8080/";

  const [currentApplication, setCurrentApplicaton] = useState(" ");
  const [applicationLists, setApplicationLists] = useState([]);
  const [emails, setEmails] = useState([]);
  const [interviews, setInterviews] = useState([]);
  const [hasLoaded, setHasLoaded] = useState(false);

  const navigate = useNavigate();

  const getApplicationDetails = () => {
    axios
      .get(`${BASE_URL}getApplicationDetails/${id}`, {
        headers: {
          userId: sessionStorage.getItem("userId"),
        },
      })
      .then((response) => {
        setEmails(response.data.message.emails);
        setInterviews(response.data.message.interviews);
      })
      .catch((err) => {
        navigate("/Login");
        console.log(err.message);
      });
  };
  const getAllApplications = () => {
    // setIsLoading(true);
    axios
      .get(`${BASE_URL}getAllApplications`, {
        headers: {
          userId: sessionStorage.getItem("userId"),
        },
      })
      .then((response) => {
        setApplicationLists(response.data);
        return response.data;
      })
      .then((applications) => {
        applications.forEach((item) => {
          if (`${item.id}` === id) {
            setCurrentApplicaton(item);
          }
        });
      })
      .then(() => {
        setHasLoaded(true);
      })
      .catch((err) => {
        navigate("Login");
        console.log(err.message);
      });
  };

  useEffect(() => {
    getApplicationDetails();
    getAllApplications();
  }, [id]);

  if (hasLoaded) {
    return (
      <article className="application-detail">
        <ApplicationListsSidebar applicationLists={applicationLists} />
        <section>
          <div>
            <h1>{currentApplication.company_name}</h1>
            <h3>{currentApplication.position}</h3>
          </div>
          <ApplicationDetailAnalytics emails={emails} interviews={interviews} />
        </section>
        <section>
          <h2>Application history</h2>
          <div className="email-table-header">
            <h3>Subject</h3>
            <h3>Date</h3>
          </div>
          <div className="emails">
            {emails.map((item) => {
              return (
                <Link
                  to={`/emailDetail/${item.id}`}
                  key={item.id}
                  className="emails__email-item"
                >
                  <p>{item.subject}</p>
                  <p>{new Date(item.email_date).toLocaleString()}</p>
                </Link>
              );
            })}
          </div>
        </section>
      </article>
    );
  }
};
export default ApplicatioDetailPage;
