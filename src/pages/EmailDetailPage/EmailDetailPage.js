import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import "./EmailDetailPage.scss";
const EmailDetailPage = () => {
  const { id } = useParams();
  const BASE_URL = "http://localhost:8080/";
  const [emailURL, setEmailURL] = useState("");
  const [emailData, setEmailData] = useState("");
  const [hasLoaded, setHasLoaded] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${BASE_URL}emailDetail/${id},`, {
        headers: {
          userId: sessionStorage.getItem("userId"),
        },
      })
      .then((response) => {
        setEmailURL(response.data.link_to_email_page);
        setEmailData(response.data);
      })
      .then(() => {
        setHasLoaded(true);
      })
      .catch((err) => {
        navigate("/Login");
        console.log(err);
      });
  }, [id]);
  if (!hasLoaded) {
    return (
      <div className="loader">
        <h1 className="loader__header">Loading....</h1>
      </div>
    );
  }
  if (hasLoaded) {
    return (
      <article className="email-detail">
        <section className="email-detail__data">
          <div className="email-detail__about-container">
            <h2 className="email-detail__about-container--about">
              <span className="email-subject">Subject:</span>
              {emailData.subject}
            </h2>
          </div>
          <div className="email-detail__about-container">
            <h2 className="email-detail__about-container--company-name">
              {emailData.company_name}
            </h2>
            <h3 className="email-detail__about-container--position">
              Position : {emailData.position}
            </h3>
          </div>
        </section>
        <section className="email-detail__iframe-container">
          <iframe
            src={emailURL}
            title="Fetched email detail"
            className="email-detail__iframe-container--iframe"
          ></iframe>
          ;
        </section>
        <section className="email-detail__button-container">
          <Link
            to={`/scheduleInterview`}
            className="email-detail__button-container--schedule-link"
          >
            <button className="schedule-button">
              Schedule Interview
            </button>
          </Link>
          <button className="email-detail__button-container--add-fav">
            Add to favourite
          </button>
          <button className="email-detail__button-container--delete">
            Delete
          </button>
        </section>
      </article>
    );
  }
};
export default EmailDetailPage;
