import { useEffect, useState } from "react";
import axios from "axios";
const InterviewListPage = () => {
  const API_BASE_URL = "http://localhost:8080/";

  const [applications, setApplications] = useState("");
  const [interviewLists, setInterviewLists] = useState("");
  const [hasLoaded, setHasloaded] = useState(false);

  const getAllApplications = () => {
    axios
      .get(`${API_BASE_URL}getAllApplications`)
      .then((response) => {
        setApplications(response.data);
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  const getAllInterviews = () => {
    axios
      .get(`${API_BASE_URL}allInterviews`)
      .then((response) => {
        setInterviewLists(response.data);
      })
      .then(() => {
        setHasloaded(true);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    getAllApplications();
    getAllInterviews();
  }, []);
  return <h1>Interview Lists Page</h1>;
};
export default InterviewListPage;
