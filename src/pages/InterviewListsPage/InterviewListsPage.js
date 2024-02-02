import { useEffect, useState } from "react";
import axios from "axios";
import "./InterviewListsPage.scss";
const InterviewListPage = () => {
  const API_BASE_URL = "http://localhost:8080/";

  const [applications, setApplications] = useState([]);
  const [interviewLists, setInterviewLists] = useState([]);
  const [hasLoaded, setHasloaded] = useState(false);

  const getAllApplications = () => {
    axios
      .get(`${API_BASE_URL}getAllApplications`)
      .then((response) => {
        setApplications(response.data);
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

  if (hasLoaded) {
    return (
      <>
        <article>
          {applications.map((item) => {
            return <p key={item.id}>{item.company_name}</p>;
          })}
        </article>
        <article>
          <section>
            <h3>Company</h3>
            <h3>About</h3>
            <h3>Date</h3>
            <h3>Reschedule</h3>
            <h3>Status</h3>
          </section>
          <section className="interview-lists">
            {interviewLists.map((item) => {
              return (
                <div key={item.id} className="interview-lists__interview">
                  <p>{item.company_name}</p>
                  <p>{item.about}</p>
                  <p>{item.iterview_date}</p>
                  <button id={item.id}>Change</button>
                  <p>{item.status}</p>
                </div>
              );
            })}
          </section>
        </article>
      </>
    );
  }

  if (!hasLoaded) {
    return <h1>Loading.....</h1>;
  }
};
export default InterviewListPage;
