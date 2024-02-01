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
  }, []);

  if (hasLoaded) {
    return <iframe src={emailURL}></iframe>;
  }
};
export default EmailDetailPage;
