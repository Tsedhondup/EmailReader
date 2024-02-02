import { useEffect, useState } from "react";
import axios from "axios";
import "./InterviewListsPage.scss";
const InterviewListPage = () => {
  const API_BASE_URL = "http://localhost:8080/";

  const [applications, setApplications] = useState([]);
  const [interviewLists, setInterviewLists] = useState([]);
  const [sortedInterviews, setSortedInterviews] = useState([]);
  const [hasLoaded, setHasloaded] = useState(false);
  const [scheduledInterviews, setScheduledInterviews] = useState("");
  const [activeInterviews, setActiveInterviews] = useState("");
  const [completedInterviews, setCompletedInterviews] = useState("");

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
        setScheduledInterviews(response.data.length);
        // VARIABLE TO STORE INTERVIEWS
        let activeInterviews = 0;
        let completedInterviews = 0;
        // SET INTERVIEW DATA
        response.data.forEach((item) => {
          if (item.status === "active") {
            activeInterviews = activeInterviews + 1;
          }
        });
        response.data.forEach((item) => {
          if (item.status === "completed") {
            completedInterviews = completedInterviews + 1;
          }
        });
        setActiveInterviews(activeInterviews);
        setCompletedInterviews(completedInterviews);
      })
      .then(() => {
        setHasloaded(true);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const sortInterviewLists = (applicationId) => {
    let scheduled = 0;
    let actives = 0;
    let completed = 0;

    // SORT INTERVIEW LISTS
    const sortedInterviewLists = interviewLists.filter((item) => {
      return item.application_id === applicationId;
    });
    // SORT SCHEDULED  INTERVIEWS
    interviewLists.forEach((item) => {
      if (item.application_id === applicationId) {
        scheduled = scheduled + 1;
      }
    });
    // SORT ACTIVE INTERVIEWS
    interviewLists.forEach((item) => {
      if (item.application_id === applicationId) {
        if (item.status === "active") {
          actives = actives + 1;
        }
      }
    });
    // SORT COMPLETED INTERVIEWS
    interviewLists.forEach((item) => {
      if (item.application_id === applicationId) {
        if (item.status === "completed") {
          completed = completed + 1;
        }
      }
    });
    setSortedInterviews(sortedInterviewLists);
    setScheduledInterviews(scheduled);
    setActiveInterviews(actives);
    setCompletedInterviews(completed);
  };

  const renderSortedInterviews = () => {
    return sortedInterviews.map((item) => {
      return (
        <div key={item.id} className="interview-lists__interview">
          <p>{item.company_name}</p>
          <p>{item.about}</p>
          <p>{item.interview_date}</p>
          <button id={item.id}>Change</button>
          <p>{item.status}</p>
        </div>
      );
    });
  };
  const renderUnsortedInterviews = () => {
    return interviewLists.map((item) => {
      return (
        <div key={item.id} className="interview-lists__interview">
          <p>{item.company_name}</p>
          <p>{item.about}</p>
          <p>{item.interview_date}</p>
          <button id={item.id}>Change</button>
          <p>{item.status}</p>
        </div>
      );
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
          <section>
            <h1>Interviews</h1>
          </section>
          <section>
            <h3>{`Scheduled: ${scheduledInterviews}`}</h3>
            <h3>{`Active: ${activeInterviews}`}</h3>
            <h3>{`Completed: ${completedInterviews}`}</h3>
          </section>
        </article>
        <article>
          {applications.map((item) => {
            return (
              <p
                className="company"
                key={item.id}
                onClick={() => {
                  sortInterviewLists(item.id);
                }}
              >
                {item.company_name}
              </p>
            );
          })}
        </article>
        <article>
          <section className="interviews-header">
            <h3>Company</h3>
            <h3>About</h3>
            <h3>Date</h3>
            <h3>Reschedule</h3>
            <h3>Status</h3>
          </section>
          <section className="interview-lists">
            {sortedInterviews.length > 0
              ? renderSortedInterviews()
              : renderUnsortedInterviews()}
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
