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
        <h1 className="loadder__header">Loading....</h1>
      </div>
    );
  }
  if (hasLoaded) {
    return (
      <article>
        <section>
          <div>
            <h2>{emailData.subject}</h2>
          </div>
          <div>
            <h2>{emailData.company_name}</h2>
            <h3>Position : {emailData.position}</h3>
          </div>
        </section>
        <section>
          <iframe src={emailURL} title="Fetched email detail"></iframe>;
        </section>
        <section>
          <Link to={`/scheduleInterview`}>
            <button>Schedule Interview</button>
          </Link>
          <button>Add to favourite</button>
          <button>Delete</button>
        </section>
      </article>
    );
  }
};
export default EmailDetailPage;
