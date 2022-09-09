import axios from "axios";
import { useState } from "react";
import { AiOutlineClose, AiFillApple } from "react-icons/ai";
import { BsTwitter } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import BeatLoader from "react-spinners/BeatLoader";

import { BASE_URL } from "../../baseUrl";
import { loginFailure, loginStart, loginSuccess } from "../../redux/userReducer";

const OpenSignIn = ({ setOpenSignIn, setOpenRegister }) => {
  const [goToPasswordPage, setGoToPasswordPage] = useState(false);
  const [userEmailPhone, setUserEmailPhone] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleOpenRegister = () => {
    setOpenSignIn(false);
    setOpenRegister(true);
  };

  const { isLoading, error } = useSelector((state) => state.user);

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      const res = await axios.post(`${BASE_URL}/auth/signin`, {
        userEmailPhone,
        password
      });
      dispatch(loginSuccess(res.data));
      navigate("/");
    } catch (err) {
      dispatch(loginFailure());
    };
  };

  return (
    <div className="openRegister">
      <div className="openRegisterWrapper">
        <div className="openSignInTop">
          <AiOutlineClose
            className="openRegisterClose"
            onClick={() => setOpenSignIn(false)}
          />
          <BsTwitter className="registerLogo" />
          <div></div>
        </div>
        <div className="openSignInContent">
          <h1 className="openSignInTitle">
            {goToPasswordPage ? "Enter your password" : "Sign in to Twitter"}
          </h1>
          {goToPasswordPage ? (
            <>
              <div className="openSignInEmailContainer">
                <div className="openSignInEmailText">
                  Credential
                </div>
                <div className="openSignInEmail">
                  {userEmailPhone}
                </div>
              </div>
              <input
                type="password"
                className="openSignInInput"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="openSignInForgotPasswordText">
                <span className="activeSettingSpan">Forgot password?</span>
              </div>
              {error && (
                <div
                  className="openRegisterError"
                  style={{ textAlign: "center" }}
                >
                  Wrong Credentials!
                </div>
              )}
              <button
                className="openSignInNextButton"
                onClick={handleLogin}
                disabled={password === ""}
              >
                {isLoading ? <BeatLoader size={10} color={"#ffffff"} /> : "Log in"}
              </button>
            </>
          ) : (
            <>
              <button
                className="registerButton"
                style={{ width: "100%" }}
              >
                <FcGoogle />Sign in with Google
              </button>
              <br />
              <button
                className="registerButton"
                style={{ width: "100%" }}
                disabled
              >
                <AiFillApple />Sign in with Apple
              </button>
              <div
                className="registerOrContainer"
                style={{ margin: "10px auto" }}
              >
                <div className="registerHr"></div>
                or
                <div className="registerHr"></div>
              </div>
              <input
                type="text"
                className="openSignInInput"
                placeholder="Phone, email, or username"
                onChange={(e) => setUserEmailPhone(e.target.value)}
              />
              <button
                className="openSignInNextButton"
                onClick={() => setGoToPasswordPage(true)}
                disabled={userEmailPhone === ""}
              >
                Next
              </button>
              <button className="openSignInForgotButton" disabled>
                Forgot password?
              </button>
            </>
          )}
          <p className="openSignInText">
            Don't have an account? <span className="activeSettingSpan" onClick={handleOpenRegister}>Sign up</span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default OpenSignIn