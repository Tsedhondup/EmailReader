import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
const EmailDetailPage = () => {
  const { id } = useParams();
  const BASE_URL = "http://localhost:8080/";

  useEffect(() => {
    axios
      .get(`${BASE_URL}emailDetail/${id}`)
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return <h1>Email detail Page</h1>;
};
export default EmailDetailPage;
