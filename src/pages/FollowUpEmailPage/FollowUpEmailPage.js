import { useState } from "react";
import axios from "axios";
const FollowUpEmailPage = () => {
  const API_BASE_URL = "http://localhost:8080/";

  const [recipient, setRecipient] = useState();
  const [subject, setSubject] = useState();
  const [sender, setSender] = useState();
  const [body, setBody] = useState();
  const [generalError, setGeneralError] = useState();
  const mail = {
    sender: sender,
    to_email: recipient,
    subject: subject,
    email_text: body,
    email_html: body,
  };
  const handleSendEmail = () => {
    if (!sender || !recipient || !subject || !body) {
      setGeneralError("Please complete email form!");
    } else {
      axios
        .post(
          `${API_BASE_URL}sendEmail`,
          mail,

          {
            headers: {
              authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
            },
          }
        )
        .then((response) => {
          // setApplications(response.data);
          console.log(response.data);
        })
        .catch((err) => {
          // navigate("/Login");
          console.log(err);
        });
    }
  };
  return (
    <>
      <h2>New Message</h2>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          handleSendEmail();
        }}
      >
        <input type="text" placeholder="Sender" />
        <input type="text" placeholder="Recipient" />
        <input type="text" placeholder="Subject" />
        <textarea type="text" placeholder="Write your message" />
        <button type="submit">Send</button>
      </form>
    </>
  );
};
export default FollowUpEmailPage;
