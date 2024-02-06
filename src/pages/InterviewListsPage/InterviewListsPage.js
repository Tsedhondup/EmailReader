import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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

  const navigate = useNavigate();

  const getAllApplications = () => {
    axios
      .get(
        `${API_BASE_URL}getAllApplications/${sessionStorage.getItem(
          "profileId"
        )}`,
        {
          headers: {
            session_id: sessionStorage.getItem("userId"),
          },
        }
      )
      .then((response) => {
        setApplications(response.data);
      })
      .catch((err) => {
        navigate("/Login");
        console.log(err.message);
      });
  };
  const getAllInterviews = () => {
    axios
      .get(
        `${API_BASE_URL}allInterviews/${sessionStorage.getItem("profileId")}`,
        {
          headers: {
            session_id: sessionStorage.getItem("userId"),
          },
        }
      )
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
        <div key={item.id} className="interview-table-container__data--item">
          <p className="interview-table-data">{item.company_name}</p>
          <p className="interview-table-data">{item.about}</p>
          <p className="interview-table-data">
            {new Date(item.interview_date).toDateString()}
          </p>
          <button id={item.id} className="interview-table-data change-button">
            Change
          </button>
          <p className="interview-table-data">{item.status}</p>
        </div>
      );
    });
  };
  const renderUnsortedInterviews = () => {
    return interviewLists.map((item) => {
      return (
        <div key={item.id} className="interview-table-container__data--item">
          <p className="interview-table-data">{item.company_name}</p>
          <p className="interview-table-data">{item.about}</p>
          <p className="interview-table-data">
            {new Date(item.interview_date).toDateString()}
          </p>
          <button id={item.id} className="interview-table-data change-button">
            Change
          </button>
          <p className="interview-table-data">{item.status}</p>
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
      <article className="interview-list-container">
        <section className="company-list-container">
          {applications.map((item) => {
            return (
              <p
                className="company-list-container__company"
                key={item.id}
                onClick={() => {
                  sortInterviewLists(item.id);
                }}
              >
                {item.company_name}
              </p>
            );
          })}
        </section>

        <section className="interview-data-container">
          <section className="interview-header-data-container">
            <h1 className="interview-header-data-container__header">
              Interview Lists
            </h1>
            <section className="interview-header-data-container__analytics">
              <h3 className="interview-header-data-container__analytics--data">{`Scheduled: ${scheduledInterviews}`}</h3>
              <h3 className="interview-header-data-container__analytics--data">{`Active: ${activeInterviews}`}</h3>
              <h3 className="interview-header-data-container__analytics--data">{`Completed: ${completedInterviews}`}</h3>
            </section>
          </section>
          <section className="interview-table-container">
            <section className="interview-table-container__headers">
              <h3 className="interview-table-container__headers--name">
                Company
              </h3>
              <h3 className="interview-table-container__headers--name">
                About
              </h3>
              <h3 className="interview-table-container__headers--name">Date</h3>
              <h3 className="interview-table-container__headers--name">
                Reschedule
              </h3>
              <h3 className="interview-table-container__headers--name">
                Status
              </h3>
            </section>
            <section className="interview-table-container__data">
              {sortedInterviews.length > 0
                ? renderSortedInterviews()
                : renderUnsortedInterviews()}
            </section>
          </section>
        </section>
      </article>
    );
  }

  if (!hasLoaded) {
    return <h1 className="interview-loader">Loading.....</h1>;
  }
};
export default InterviewListPage;
