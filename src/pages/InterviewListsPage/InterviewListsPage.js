import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import FollowUpEmailPage from "../FollowUpEmailPage/FollowUpEmailPage";
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
  const [changeButtonClass, setChangeButtonClass] = useState("display-show");
  const [changeDateClass, setChangeDateClass] = useState("display-hidden");
  const [followUpClass, setFollowUpClass] = useState("");
  // NPM DATE LIBRARY
  const [startDate, setStartDate] = useState();

  const navigate = useNavigate();

  const getAllApplications = () => {
    axios
      .get(
        `${API_BASE_URL}getAllApplications/${sessionStorage.getItem(
          "profileId"
        )}`,
        {
          headers: {
            authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
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
            authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
          },
        }
      )
      .then((response) => {
        setInterviewLists(response.data.interviewData);
        setScheduledInterviews(response.data.interviewData.length);
        // VARIABLE TO STORE INTERVIEWS
        let activeInterviews = 0;
        let completedInterviews = 0;

        // SET INTERVIEW DATA
        response.data.interviewData.forEach((item) => {
          if (item.status === "active") {
            activeInterviews = activeInterviews + 1;
          }
        });
        response.data.interviewData.forEach((item) => {
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

  const handleInterviewStatus = (id) => {
    const updateInterviews = interviewLists;
    updateInterviews.forEach((interview) => {
      if (interview.id === id) {
        interview.status = "Completed";
      }
    });
    setInterviewLists(updateInterviews);
    console.log(interviewLists);
  };
  const handleInterviewActionUpdate = (event) => {
    axios
      .patch(
        `${API_BASE_URL}updateInterview/${event.target.id}`,
        {
          status: event.target.value,
        },
        {
          headers: {
            authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
          },
        }
      )
      .catch((err) => {
        console.log("cannot update application");
      });
  };

  const handleInterviewDateUpdate = (interviewId) => {
    axios
      .patch(
        `${API_BASE_URL}updateInterview/${interviewId}`,
        {
          interview_date: startDate,
        },
        {
          headers: {
            authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
          },
        }
      )
      .then(() => {
        getAllInterviews();
      })
      .catch((err) => {
        console.log("cannot update application");
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
          <button
            id={item.id}
            className="interview-table-data change-button"
            onClick={(event) => {
              event.stopPropagation();
              handleInterviewStatus(item.id);
            }}
          >
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
          <button
            id={item.id}
            className="interview-table-data change-button"
            onClick={(event) => {
              event.stopPropagation();
              handleInterviewStatus(item.id);
            }}
          >
            Change
          </button>
          <p className="interview-table-data">{item.status}</p>
        </div>
      );
    });
  };

  const handleChageDateElementClasses = (elClassName) => {
    setChangeDateClass("display-show");
    setChangeButtonClass("display-hidden");
  };
  const handleDatePicker = (interviewId) => {
    const newInterviewList = interviewLists.map((item) => {
      if (item.id === interviewId) {
        item.datePicker = true;
      } else {
        item.datePicker = false;
      }
      return item;
    });
    setInterviewLists(newInterviewList);
  };

  const handleFollowUpEmail = (event) => {
    if (event.target.value === "Completed") {
      setFollowUpClass("display-show");
    } else {
      setFollowUpClass("");
    }
  };
  useEffect(() => {
    getAllApplications();
    getAllInterviews();
  }, []);

  useEffect(() => {}, [startDate]);

  if (hasLoaded) {
    if (interviewLists.length === 0) {
      return (
        <h1>
          You do not active any interview! Please schedule your up comming
          interviews
        </h1>
      );
    } else {
      return (
        <>
          <div className={`follow-up ${followUpClass}`}>
            <h3 className="follo-up__header">Write follow up email</h3>
            <Link to="/FollowUp">
              <button className="follow-up__button-continue">Continue</button>
            </Link>
            <button
              className="follow-up__button-skip"
              onClick={(event) => {
                handleFollowUpEmail(event);
              }}
            >
              skip
            </button>
          </div>
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
                  <h3 className="interview-table-container__headers--name">
                    Date
                  </h3>
                  <h3 className="interview-table-container__headers--name">
                    Reschedule
                  </h3>
                  <h3 className="interview-table-container__headers--name">
                    Action
                  </h3>
                </section>
                <section className="interview-table-container__data">
                  {interviewLists.map((item) => {
                    return (
                      <div
                        key={item.id}
                        className="interview-table-container__data--item"
                      >
                        <p className="interview-table-data">
                          {item.company_name}
                        </p>
                        <p className="interview-table-data">{item.about}</p>
                        <p className="interview-table-data">
                          {new Date(item.interview_date).toDateString()}
                        </p>

                        <section>
                          {item.datePicker ? (
                            <div></div>
                          ) : (
                            <button
                              id={item.id}
                              className={`interview-table-data change-button ${changeButtonClass}`}
                              onClick={(event) => {
                                event.stopPropagation();
                                handleDatePicker(item.id);
                              }}
                            >
                              Change
                            </button>
                          )}

                          {item.datePicker ? (
                            <>
                              <DatePicker
                                id="date"
                                selected={startDate}
                                onChange={(date) => setStartDate(date)}
                              />
                              <button
                                disabled={startDate ? false : true}
                                onClick={() => {
                                  handleInterviewDateUpdate(item.id);
                                }}
                              >
                                confirm
                              </button>
                              <button
                                disabled={startDate ? false : true}
                                onClick={() => {
                                  setStartDate();
                                  getAllInterviews();
                                }}
                              >
                                cancel
                              </button>
                            </>
                          ) : (
                            <div></div>
                          )}
                        </section>

                        <select
                          id={item.id}
                          className="interview-table-data"
                          onChange={(event) => {
                            handleInterviewActionUpdate(event);
                            handleFollowUpEmail(event);
                          }}
                        >
                          <option value={item.status}>{item.status}</option>
                          <option value="Completed">Completed</option>
                          <option value="Pending">Pending</option>
                          <option value="Cancel">Cancel</option>
                          <option value="Active">Active</option>
                        </select>
                      </div>
                    );
                  })}
                  {/* {sortedInterviews.length > 
                ? renderSortedInterviews()
                : renderUnsortedInterviews()} */}
                </section>
              </section>
            </section>
          </article>
        </>
      );
    }
  }

  if (!hasLoaded) {
    return <h1 className="interview-loader">Loading.....</h1>;
  }
};
export default InterviewListPage;
   