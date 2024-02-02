import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.scss";
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
        className="form"
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <h2 className="form__header">Enter credentials</h2>

        <section className="form__inputs">
          <label htmlFor="name" className="form__inputs--label">
            Username
          </label>
          <input
            className="form__inputs--name"
            id="name"
            name="name"
            placeholder="enter username"
            value={userName}
            type="name"
            onChange={(event) => {
              handlUserName(event);
            }}
          ></input>
        </section>

        <section className="form__inputs">
          <label htmlFor="email" className="form__inputs--label">
            Email
          </label>
          <input
            className="form__inputs--email"
            id="email"
            name="email"
            placeholder="enter email"
            value={email}
            type="email"
            onChange={(event) => {
              handlEmail(event);
            }}
          ></input>
        </section>

        <button
          className="form__submit-button"
          onClick={() => {
            handleLogin();
          }}
        >
          Login
        </button>
      </form>
    );
  }
};
export default LoginPage;
