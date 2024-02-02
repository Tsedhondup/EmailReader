import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ScheduleInterviewPage = () => {
  const BASE_URL = "http://localhost:8080/";
  const [allApplications, setAllApplications] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [companyName, setCompanyName] = useState("");
  const [about, setAbout] = useState("");
  const [hasLoaded, setHasLoaded] = useState(false);

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
    let applicationId;
    await allApplications.forEach((item) => {
      if (item.company_name === companyName) {
        applicationId = item.id;
      }
    });

    axios
      .post(
        `${BASE_URL}addInterviews`,
        {
          application_id: applicationId,
          company_name: companyName,
          interview_date: startDate,
          about: about,
          status: "active",
        },
        {
          headers: {
            userId: sessionStorage.getItem("userId"),
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
  useEffect(() => {
    axios
      .get(`${BASE_URL}getAllApplications`, {
        headers: {
          userId: sessionStorage.getItem("userId"),
        },
      })
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
      <article>
        <h1>Schedule interviews</h1>
        <form
          onSubmit={(event) => {
            event.preventDefault();
          }}
        >
          <select
            placeholder="Please Select"
            name="company"
            htmlform="company"
            onChange={(event) => {
              handleChangeCompany(event);
            }}
          >
            <option value="Please Select">Please Select</option>

            {allApplications.map((item, index) => {
              return (
                <option key={item.id} value={item.company_name}>
                  {item.company_name}
                </option>
              );
            })}
          </select>
          <input
            value={about}
            placeholder="about"
            onChange={handleChangeAbout}
          />
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
          />
          <button onClick={handleInterviewPost} type="button">
            Schedule
          </button>
        </form>
      </article>
    );
  }
};
export default ScheduleInterviewPage;
