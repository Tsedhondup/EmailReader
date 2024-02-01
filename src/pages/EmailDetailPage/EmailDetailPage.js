import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./EmailDetailPage.scss";
const EmailDetailPage = () => {
  const { id } = useParams();
  const BASE_URL = "http://localhost:8080/";
  const [emailURL, setEmailURL] = useState("");
  const [hasLoaded, setHasLoaded] = useState(false);
  useEffect(() => {
    axios
      .get(`${BASE_URL}emailDetail/${id}`)
      .then((response) => {
        setEmailURL(response.data.link_to_email_page);
      })
      .then(() => {
        setHasLoaded(true);
      })
      .catch((err) => {
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
    return <iframe src={emailURL} title="Fetched email detail"></iframe>;
  }
};
export default EmailDetailPage;
