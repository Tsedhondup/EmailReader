import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
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
    <>
      <h1>Add job application</h1>
      <form
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <label>Company Name</label>
        <input
          name="company-name"
          placeholder="company name"
          value={companyName}
          onChange={(event) => {
            setCompanyName(event.target.value);
          }}
        ></input>
        <label>Company Name</label>
        <input
          name="position"
          placeholder="position"
          value={position}
          onChange={(event) => {
            setPosition(event.target.value);
          }}
        ></input>
        <label>Company email</label>
        <input
          name="contact-email"
          placeholder="company email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        ></input>
        <label>Contact Number</label>
        <input
          name="contact-phone"
          placeholder="contact number"
          value={contactNumber}
          onChange={(event) => {
            setContactNumber(event.target.value);
          }}
        ></input>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
        />
        <section>
          <button
            onClick={() => {
              handleAddApplication();
            }}
          >
            Add
          </button>
          <button
            onClick={() => {
              navigate("/applicationLists");
            }}
          >
            Cancel
          </button>
        </section>
      </form>
    </>
  );
};
export default AddApplication;
