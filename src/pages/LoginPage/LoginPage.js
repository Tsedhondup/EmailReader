import axios from "axios";
import { useState } from "react";
import { redirect, useNavigate } from "react-router-dom";
const LoginPage = () => {
  const API_BASE_URL = "http://localhost:8080/";

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [isLogin, setIsLogin] = useState(false);

  const navigate = useNavigate();

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
        sessionStorage.setItem("userId", response.data.userId);
      })
      .then(() => {
        setIsLogin(true);
      })
      .then(() => {
        navigate("/applicationLists");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  if (!isLogin) {
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
        <button
          onClick={() => {
            handleLogin();
          }}
        >
          Login
        </button>
      </form>
    );
  }
  // if (isLogin) return redirect("/applicationLists");
};
export default LoginPage;
