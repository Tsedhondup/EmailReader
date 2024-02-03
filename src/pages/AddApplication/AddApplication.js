import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./AddApplication.scss";
const AddApplication = () => {
  const API_BASE_URL = "http://localhost:8080/";

  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState("");
  const [position, setPosition] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [startDate, setStartDate] = useState(new Date());

  const handleAddApplication = () => {
    axios
      .post(
        `${API_BASE_URL}addApplication`,
        {
          profile_id: Number(sessionStorage.getItem("userId")),
          company_name: companyName,
          company_email: email,
          date_applied: startDate,
          position: position,
        },
        {
          headers: {
            userId: sessionStorage.getItem("userId"),
          },
        }
      )
      .then(() => {
        navigate("/applicationLists");
      })
      .catch((err) => {
        navigate("/Login");
      });
  };

  return (
    <article className="form-container">
      <h1 className="form-container__header">Add application</h1>
      <form
        className="form-container__form"
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <label className="form-container__form--label" htmlFor="company-name">
          Company Name
        </label>
        <input
          id="company-name"
          className="form-container__form--input"
          name="company-name"
          placeholder="company name"
          value={companyName}
          onChange={(event) => {
            setCompanyName(event.target.value);
          }}
        ></input>
        <label className="form-container__form--label" htmlFor="position">
          position
        </label>
        <input
          id="position"
          className="form-container__form--input"
          name="position"
          placeholder="position"
          value={position}
          onChange={(event) => {
            setPosition(event.target.value);
          }}
        ></input>
        <label className="form-container__form--label" htmlFor="email">
          Company email
        </label>
        <input
          id="email"
          className="form-container__form--input"
          name="contact-email"
          placeholder="company email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        ></input>
        <label className="form-container__form--label" htmlFor="contact-phone">
          Contact Number
        </label>
        <input
          id="contact-phone"
          className="form-container__form--input"
          name="contact-phone"
          placeholder="contact number"
          value={contactNumber}
          onChange={(event) => {
            setContactNumber(event.target.value);
          }}
        ></input>
        <label className="form-container__form--label" htmlFor="date">
          Date
        </label>

        <DatePicker
          id="date"
          className="form-container__form--input"
          selected={startDate}
          onChange={(date) => setStartDate(date)}
        />
        <section className="form-button-container">
          <button
            className="form-button-container__add"
            onClick={() => {
              handleAddApplication();
            }}
          >
            Add
          </button>
          <button
            className="form-button-container__cancel"
            onClick={() => {
              navigate("/applicationLists");
            }}
          >
            Cancel
          </button>
        </section>
      </form>
    </article>
  );
};
export default AddApplication;
