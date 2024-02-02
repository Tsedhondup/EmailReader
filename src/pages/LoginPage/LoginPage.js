import axios from "axios";
import { useState } from "react";
const LoginPage = () => {
  const API_BASE_URL = "http://localhost:8080/";

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");

  const handlUserName = (event) => {
    setUserName(event.target.value);
  };
  const handlEmail = (event) => {
    setEmail(event.target.value);
  };
  const handleLogin = () => {
    axios
      .post(`${API_BASE_URL}login`, {
        userName: userName,
        email: email,
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
      <h2>Enter credentials</h2> <label>Username</label>
      <input
        name="name"
        placeholder="enter username"
        value={userName}
        type="name"
        onChange={(event) => {
          handlUserName(event);
        }}
      ></input>
      <label>Email</label>
      <input
        name="email"
        placeholder="enter email"
        value={email}
        type="email"
        onChange={(event) => {
          handlEmail(event);
        }}
      ></input>
      <button onClick={handleLogin}>Login</button>
    </form>
  );
};
export default LoginPage;
