import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./ScheduleInterviewPage.scss";

const ScheduleInterviewPage = () => {
  const BASE_URL = "http://localhost:8080/";
  const [allApplications, setAllApplications] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [companyName, setCompanyName] = useState("");
  const [about, setAbout] = useState("");
  const [hasLoaded, setHasLoaded] = useState(false);
  const [isFormCompleted, setIsFormCompleted] = useState(false);

  const navigate = useNavigate();

  const handleChangeCompany = (event) => {
    const companyName = event.target.value;
    setCompanyName(companyName);
  };
  const handleChangeAbout = (event) => {
    const about = event.target.value;
    setAbout(about);
  };

  const handleInterviewPost = async () => {
    axios
      .post(
        `${BASE_URL}addInterviews`,
        {
          profile_id: sessionStorage.getItem("profileId"),
          company_name: companyName,
          interview_date: startDate,
          about: about,
          status: "active",
        },
        {
          headers: {
            authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        navigate("/Login");
        console.log(err.message);
      });
  };
  const handleValidation = () => {
    // this function handles form validation
  };
  useEffect(() => {
    axios
      .get(
        `${BASE_URL}getAllApplications/${sessionStorage.getItem("profileId")}`,
        {
          headers: {
            authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
          },
        }
      )
      .then((response) => {
        setAllApplications(response.data);
      })
      .then(() => {
        setHasLoaded(true);
      })
      .catch((err) => {
        navigate("/Login");
        console.log(err.message);
      });
  }, []);

  if (hasLoaded) {
    return (
      <article className="interview-container">
        <h1 className="interview-container__header">Add interviews</h1>
        <form
          className="interview-container__form"
          onSubmit={(event) => {
            event.preventDefault();
          }}
        >
          <labeL
            className="interview-container__form-label"
            htmlFor="company-list"
          >
            company name
          </labeL>
          <select
            id="company-list"
            className="drop-down-list"
            placeholder="Select company"
            name="company"
            htmlform="company"
            onChange={(event) => {
              handleChangeCompany(event);
            }}
          >
            <option value="Select company" className="drop-down-list__select">
              Please Select
            </option>

            {allApplications.map((item, index) => {
              return (
                <option
                  key={item.id}
                  value={item.company_name}
                  className="drop-down-list__item"
                >
                  {item.company_name}
                </option>
              );
            })}
          </select>
          <label htmlFor="about" className="interview-container__form-label">
            About
          </label>
          <input
            className="interview-container__input"
            id="about"
            value={about}
            placeholder="about"
            onChange={handleChangeAbout}
          />
          <label className="interview-container__form-label" htmlFor="date">
            Date
          </label>

          <DatePicker
            id="date"
            className="interview-container__input interview-container__date"
            selected={startDate}
            onChange={(date) => setStartDate(date)}
          />
          <Link to="/interviewLists" className="interview-list-link">
            <button
              onClick={handleInterviewPost}
              type="button"
              className="interview-container__add-button"
            >
              Schedule
            </button>
          </Link>
        </form>
      </article>
    );
  }
};
export default ScheduleInterviewPage;
