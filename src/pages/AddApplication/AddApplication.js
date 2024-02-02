import { useState } from "react";
import axios from "axios";
const AddApplication = () => {
  const API_BASE_URL = "http://localhost:8080/";
  const [companyName, setCompanyName] = useState("");
  const [position, setPosition] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");

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
          onChange={() => {}}
        ></input>
        <label>Company Name</label>
        <input
          name="position"
          placeholder="position"
          value={position}
          onChange={() => {}}
        ></input>
        <label>Company email</label>
        <input
          name="contact-email"
          placeholder="company email"
          value={email}
          onChange={() => {}}
        ></input>
        <label>Contact Number</label>
        <input
          name="contact-phone"
          placeholder="contact number"
          value={contactNumber}
          onChange={() => {}}
        ></input>
        <section>
          <button>Add</button>
          <button>Cancel</button>
        </section>
      </form>
    </>
  );
};
export default AddApplication;
