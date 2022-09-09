import { FcGoogle } from "react-icons/fc";
import { AiFillApple } from "react-icons/ai";
import { BsTwitter } from "react-icons/bs";

import "./register.css";
import { useState } from "react";
import OpenRegister from "./OpenRegister";
import OpenSignIn from "./OpenSignIn";

const Register = () => {
  const [openRegister, setOpenRegister] = useState(false);
  const [openSignIn, setOpenSignIn] = useState(false);

  return (
    <>
      <div className="register">
        <div className="registerLeft">
          <img
            src="https://abs.twimg.com/sticky/illustrations/lohp_en_1302x955.png"
            alt=""
            className="registerLeftImgBackground"
          />
          <img
            src="https://icon-library.com/images/twitter-icon-white-transparent/twitter-icon-white-transparent-24.jpg"
            alt=""
            className="registerLeftImgLogo"
          />
        </div>
        <div className="registerRight">
          <div className="registerRightWrapper">
            <BsTwitter className="registerLogo" />
            <h1 className="registerTitle">Happening now</h1>
            <h2 className="registerSubtitle">Join Twitter today.</h2>
            <button className="registerButton">
              <FcGoogle />Sign in with Google
            </button>
            <button
              className="registerButton"
              disabled
            >
              <AiFillApple />Sign in with Apple
            </button>
            <div className="registerOrContainer">
              <div className="registerHr"></div>
              or
              <div className="registerHr"></div>
            </div>
            <button
              className="registerButtonPhoneEmail"
              onClick={() => setOpenRegister(true)}
            >
              Sign up with phone or email
            </button>
            <p className="registerText">
              By signing up, you agree to the <span className="activeSettingSpan">Terms of Service</span> and <span className="activeSettingSpan">Privacy Policy</span>, including <span className="activeSettingSpan">Cookie Use</span>.
            </p>
            <h3 className="registerSignInTitle">
              Already have an account?
            </h3>
            <button
              className="registerSignInButton"
              onClick={() => setOpenSignIn(true)}
            >
              Sign in
            </button>
          </div>
        </div>
        {openRegister && (
          <OpenRegister setOpenRegister={setOpenRegister} />
        )}
        {openSignIn && (
          <OpenSignIn setOpenSignIn={setOpenSignIn} setOpenRegister={setOpenRegister} />
        )}
      </div>
      <div>
        <div className="registerFooterItems">
          <p className="registerFooterItem">About</p>
          <p className="registerFooterItem">Help Center</p>
          <p className="registerFooterItem">Terms of Service</p>
          <p className="registerFooterItem">Privacy Policy</p>
          <p className="registerFooterItem">Cookie Policy</p>
          <p className="registerFooterItem">Accessibility</p>
          <p className="registerFooterItem">Ads Info</p>
          <p className="registerFooterItem">Blog</p>
          <p className="registerFooterItem">Status</p>
          <p className="registerFooterItem">Careers</p>
          <p className="registerFooterItem">Brand Resources</p>
          <p className="registerFooterItem">Advertising</p>
          <p className="registerFooterItem">Marketing</p>
          <p className="registerFooterItem">Twitter for Buisiness</p>
          <p className="registerFooterItem">Developers</p>
          <p className="registerFooterItem">Directory</p>
          <p className="registerFooterItem">Settings</p>
        </div>
        <p className="registerFooterTrademark">
          © 2022 Twitter, Inc.
        </p>
      </div>
    </>
  )
}

export default Register