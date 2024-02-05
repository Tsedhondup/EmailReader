import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./LoginPage.scss";
const LoginPage = () => {
  const API_BASE_URL = "http://localhost:8080/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(false);

  const navigate = useNavigate();

  const handlPassword = (event) => {
    setPassword(event.target.value);
  };
  const handlEmail = (event) => {
    setEmail(event.target.value);
  };
  const handleLogin = () => {
    axios
      .post(`${API_BASE_URL}login`, {
        email: email,
        password: password,
      })
      .then((response) => {
        sessionStorage.setItem("userId", response.data[0].session_id);
        sessionStorage.setItem("profileId", response.data[1].profile_id);
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
        <section className="form__inputs">
          <label htmlFor="name" className="form__inputs--label">
            Password
          </label>
          <input
            className="form__inputs--name"
            id="name"
            name="name"
            placeholder="enter username"
            value={password}
            type="password"
            onChange={(event) => {
              handlPassword(event);
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
        <Link to="/SignUp">
          <button className="redirect-sign-up">Sign Up</button>
        </Link>
      </form>
    );
  }
};
export default LoginPage;
