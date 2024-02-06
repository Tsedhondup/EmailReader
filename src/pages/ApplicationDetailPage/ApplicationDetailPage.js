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
  const getDate = (dateData) => {
    const dateArray = new Date(dateData).toLocaleString().split(",");
    return dateArray[0];
  };
  const getTime = (dateData) => {
    const dateArray = new Date(dateData).toLocaleString().split(",");
    return dateArray[1];
  };

  const getApplicationDetails = () => {
    axios
      .get(`${BASE_URL}getApplicationDetails/${id}`, {
        headers: {
          session_id: sessionStorage.getItem("userId"),
        },
      })
      .then((response) => {
        console.log(response.data.message);
        setEmails(response.data.message);
      })
      .catch((err) => {
        navigate("/Login");
        console.log(err);
      });
  };

  const getAllInterviews = () => {
    axios
      .get(`${BASE_URL}allInterviews/${sessionStorage.getItem("profileId")}`, {
        headers: {
          session_id: sessionStorage.getItem("userId"),
        },
      })
      .then((response) => {
        setInterviews(response.data[0]);
      })
      .catch((err) => {
        navigate("/Login");
        console.log(err);
      });
  };
  const getAllApplications = () => {
    axios
      .get(
        `${BASE_URL}getAllApplications/${sessionStorage.getItem("profileId")}`,
        {
          headers: {
            session_id: sessionStorage.getItem("userId"),
          },
        }
      )
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
        navigate("/Login");
        console.log(err.message);
      });
  };

  useEffect(() => {
    if (!sessionStorage.getItem("userId")) {
      navigate("/Login");
    }
    getApplicationDetails();
    getAllApplications();
    getAllInterviews();
  }, [id]);

  if (hasLoaded) {
    return (
      <article className="application-detail">
        <ApplicationListsSidebar
          applicationLists={applicationLists}
          currentCompany={currentApplication.company_name}
        />

        <section className="application-detail__data-container">
          <section className="application-detail__data">
            <div className="application-detail__about">
              <h1 className="application-detail__about--company-name">
                {currentApplication.company_name}
              </h1>
              <h3 className="application-detail__about--position-header">
                position
              </h3>
              <h3 className="application-detail__about--position">
                {currentApplication.position}
              </h3>
            </div>
            <ApplicationDetailAnalytics
              emails={emails}
              interviews={interviews}
            />
          </section>
          <section className="application-detail__application-history">
            <h2 className="application-detail__email-table-header">
              Application history
            </h2>
            <div className="email-table-header">
              <h3 className="email-table-header__subject">Subject</h3>
              <h3 className="email-table-header__date">Date</h3>
              <h3 className="email-table-header__time">Time</h3>
            </div>
            <div className="emails">
              {emails.map((item) => {
                return (
                  <Link
                    to={`/emailDetail/${item.id}`}
                    key={item.id}
                    className="emails__email-item"
                  >
                    <span className="emails__email-item--subject">
                      {item.subject}
                    </span>
                    <span className="emails__email-item--date">
                      {getDate(item.email_date)}
                    </span>
                    <span className="emails__email-item--time">
                      {getTime(item.email_date)}
                    </span>
                  </Link>
                );
              })}
            </div>
          </section>
        </section>
      </article>
    );
  }
};
export default ApplicatioDetailPage;
