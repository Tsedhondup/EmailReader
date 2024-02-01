import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
  console.log(currentApplication);
  const getApplicationDetails = () => {
    axios
      .get(`${BASE_URL}getApplicationDetails/${id}`)
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  const getAllApplications = () => {
    axios
      .get(`${BASE_URL}getAllApplications`)
      .then((response) => {
        setApplicationLists(response.data);
        console.log(response.data);
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
        console.log(err.message);
      });
  };
  useEffect(() => {
    getApplicationDetails();
    getAllApplications();
  }, []);
  return (
    <article className="application-detail">
      <ApplicationListsSidebar />
    </article>
  );
};
export default ApplicatioDetailPage;
