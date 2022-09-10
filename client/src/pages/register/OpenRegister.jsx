import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BsArrowLeft } from "react-icons/bs";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import BeatLoader from "react-spinners/BeatLoader";
import { useSelector } from "react-redux";

import { signupFailure, signupStart, signupSuccess } from "../../redux/userReducer";
import { BASE_URL } from "../../baseUrl";
import { openBox } from "../../redux/registerUpdateReducer";

const OpenRegister = ({ setOpenRegister }) => {
  const [registerPage, setRegisterPage] = useState(1);
  const [useEmail, setUseEmail] = useState(false);
  const [checked, setChecked] = useState(true);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    dobMonth: "",
    dobDay: "",
    dobYear: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      setPasswordError(true);
      setTimeout(() => {
        setPasswordError(false);
      }, 2500);
    }
    dispatch(signupStart());
    try {
      const res = await axios.post(`${BASE_URL}/auth/signup`, {
        name: formData.name,
        username: formData.username,
        password: password,
        email: formData.email,
        phone: formData.phone,
        dobMonth: formData.dobMonth,
        dobDay: formData.dobDay,
        dobYear: formData.dobYear,
        trackTwitterContent: checked
      });
      dispatch(signupSuccess(res.data));
      dispatch(openBox());
      navigate("/");
    } catch (err) {
      dispatch(signupFailure());
    };
  };

  const { error, isLoading } = useSelector((state) => state.user);

  return (
    <div className="openRegister">
      <div className="openRegisterWrapper">
        <div className="openRegisterTop">
          {registerPage === 1 ? (
            <AiOutlineClose
              className="openRegisterClose"
              onClick={() => setOpenRegister(false)}
            />
          ) : (
            <BsArrowLeft
              className="openRegisterClose"
              onClick={() => setRegisterPage((prev) => prev - 1)}
            />
          )}
          <h3>Step {registerPage} of 4</h3>
        </div>
        <div className="openRegisterContent">
          {registerPage === 1 && (
            <>
              <h1>Create your account</h1>
              <input
                type="text"
                className="openRegisterInput"
                placeholder="Username"
                name="username"
                onChange={handleChange}
              />
              <input
                type="text"
                className="openRegisterInput"
                placeholder="Name"
                name="name"
                onChange={handleChange}
              />
              {useEmail ? (
                <input
                  type="text"
                  className="openRegisterInput"
                  placeholder="Email"
                  name="email"
                  onChange={handleChange}
                />
              ) : (
                <input
                  type="text"
                  className="openRegisterInput"
                  placeholder="Phone"
                  name="phone"
                  onChange={handleChange}
                />
              )}
              <div
                className="openRegisterInputUseEmail"
                onClick={() => setUseEmail((prev) => !prev)}
              >
                {useEmail ? (
                  "Use phone instead"
                ) : (
                  "Use email instead"
                )}
              </div>
              <h4>Date of birth</h4>
              <div className="openRegisterText">
                This will not be shown publicly. Confirm your own age,
                even if this account is for a business, a pet, or
                something else.
              </div>
              <div className="openRegisterDOBInputsContainer">
                <select
                  name="dobMonth"
                  className="openRegisterSelect"
                  onChange={handleChange}
                >
                  <option value="" disabled selected hidden>
                    Month
                  </option>
                  <option value="1">Jan</option>
                  <option value="2">Feb</option>
                  <option value="3">Mar</option>
                  <option value="4">Apr</option>
                  <option value="5">May</option>
                  <option value="6">Jun</option>
                  <option value="7">Jul</option>
                  <option value="8">Aug</option>
                  <option value="9">Sep</option>
                  <option value="10">Oct</option>
                  <option value="11">Nov</option>
                  <option value="12">Dec</option>
                </select>
                <select
                  name="dobDay"
                  className="openRegisterSelect"
                  onChange={handleChange}
                >
                  <option value="" disabled selected hidden>
                    Day
                  </option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                  <option value="11">11</option>
                  <option value="12">12</option>
                  <option value="13">13</option>
                  <option value="14">14</option>
                  <option value="15">15</option>
                  <option value="16">16</option>
                  <option value="17">17</option>
                  <option value="18">18</option>
                  <option value="19">19</option>
                  <option value="20">20</option>
                  <option value="21">21</option>
                  <option value="22">22</option>
                  <option value="23">23</option>
                  <option value="24">24</option>
                  <option value="25">25</option>
                  <option value="26">26</option>
                  <option value="27">27</option>
                  <option value="28">28</option>
                  <option value="29">29</option>
                  <option value="30">30</option>
                  <option value="31">31</option>
                </select>
                <select
                  name="dobYear"
                  className="openRegisterSelect"
                  onChange={handleChange}
                >
                  <option value="" disabled selected hidden>
                    Year
                  </option>
                  <option value="1920">1920</option>
                  <option value="1921">1921</option>
                  <option value="1922">1922</option>
                  <option value="1923">1923</option>
                  <option value="1924">1924</option>
                  <option value="1925">1925</option>
                  <option value="1926">1926</option>
                  <option value="1927">1927</option>
                  <option value="1928">1928</option>
                  <option value="1929">1929</option>
                  <option value="1930">1930</option>
                  <option value="1931">1931</option>
                  <option value="1932">1932</option>
                  <option value="1933">1933</option>
                  <option value="1934">1934</option>
                  <option value="1935">1935</option>
                  <option value="1936">1936</option>
                  <option value="1937">1937</option>
                  <option value="1938">1938</option>
                  <option value="1939">1939</option>
                  <option value="1940">1940</option>
                  <option value="1941">1941</option>
                  <option value="1942">1942</option>
                  <option value="1943">1943</option>
                  <option value="1944">1944</option>
                  <option value="1945">1945</option>
                  <option value="1946">1946</option>
                  <option value="1947">1947</option>
                  <option value="1948">1948</option>
                  <option value="1949">1949</option>
                  <option value="1950">1950</option>
                  <option value="1951">1951</option>
                  <option value="1952">1952</option>
                  <option value="1953">1953</option>
                  <option value="1954">1954</option>
                  <option value="1955">1955</option>
                  <option value="1956">1956</option>
                  <option value="1957">1957</option>
                  <option value="1958">1958</option>
                  <option value="1959">1959</option>
                  <option value="1960">1960</option>
                  <option value="1961">1961</option>
                  <option value="1962">1962</option>
                  <option value="1963">1963</option>
                  <option value="1964">1964</option>
                  <option value="1965">1965</option>
                  <option value="1966">1966</option>
                  <option value="1967">1967</option>
                  <option value="1968">1968</option>
                  <option value="1969">1969</option>
                  <option value="1970">1970</option>
                  <option value="1971">1971</option>
                  <option value="1972">1972</option>
                  <option value="1973">1973</option>
                  <option value="1974">1974</option>
                  <option value="1975">1975</option>
                  <option value="1976">1976</option>
                  <option value="1977">1977</option>
                  <option value="1978">1978</option>
                  <option value="1979">1979</option>
                  <option value="1980">1980</option>
                  <option value="1981">1981</option>
                  <option value="1982">1982</option>
                  <option value="1983">1983</option>
                  <option value="1984">1984</option>
                  <option value="1985">1985</option>
                  <option value="1986">1986</option>
                  <option value="1987">1987</option>
                  <option value="1988">1988</option>
                  <option value="1989">1989</option>
                  <option value="1990">1990</option>
                  <option value="1991">1991</option>
                  <option value="1992">1992</option>
                  <option value="1993">1993</option>
                  <option value="1994">1994</option>
                  <option value="1995">1995</option>
                  <option value="1996">1996</option>
                  <option value="1997">1997</option>
                  <option value="1998">1998</option>
                  <option value="1999">1999</option>
                  <option value="2000">2000</option>
                  <option value="2000">2001</option>
                  <option value="2000">2002</option>
                  <option value="2000">2003</option>
                  <option value="2000">2004</option>
                  <option value="2000">2005</option>
                  <option value="2000">2006</option>
                  <option value="2000">2007</option>
                  <option value="2000">2008</option>
                  <option value="2000">2009</option>
                  <option value="2000">2010</option>
                </select>
              </div>
            </>
          )}
          {registerPage === 2 && (
            <>
              <h1>Customize your experience</h1>
              <h3 className="openRegisterSubtitle">
                Track where you see Twitter content across the web
              </h3>
              <div className="openRegisterTextWithInput">
                <p>
                  Twitter uses this data to personalize your experience.
                  This web browsing history will never be stored with your
                  name, email, or phone number.
                </p>
                <input
                  type="checkbox"
                  className="openRegisterCheckbox"
                  checked={checked}
                  onChange={(e) => setChecked(e.target.checked)}
                />
              </div>
              <p className="openRegisterTextLarger">
                By signing up, you agree to our Terms, <span className="activeSettingSpan">Privacy Policy</span>, and <span className="activeSettingSpan">Cookie Use</span>. Twitter may use your contact information, including your email address and phone number for purposes outlined in our Privacy Policy. <span className="activeSettingSpan">Learn more</span>
              </p>
            </>
          )}
          {registerPage === 3 && (
            <>
              <h1>Create your account</h1>
              <div className="openRegisterInputPreview">
                {formData.username}
              </div>
              <div className="openRegisterInputPreview">
                {formData.email === "" ? formData.phone : formData.email}
              </div>
              <div className="openRegisterInputPreview">
                {formData.dobDay + "." + formData.dobMonth + "." + formData.dobYear}
              </div>
              <p
                className="openRegisterText"
                style={{ width: "100%", marginTop: "30px" }}
              >
                By signing up, you agree to the <span className="activeSettingSpan">Terms of Service</span> and <span className="activeSettingSpan">Privacy Policy</span>, including <span className="activeSettingSpan">Cookie Use</span>. Twitter may use your contact information, including your email address and phone number for purposes outlined in our Privacy Policy, like keeping your account secure and personalizing our services, including ads. <span className="activeSettingSpan">Learn more</span>. Others will be able to find you by email or phone number, when provided, unless you choose otherwise <span className="activeSettingSpan">here</span>.
              </p>
            </>
          )}
          {registerPage === 4 && (
            <>
              <h1>Enter password</h1>
              <div className="openRegisterText">
                Enter password below to finish sign up process.
              </div>
              <input
                type="password"
                className="openRegisterInput"
                placeholder="Password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                type="password"
                className="openRegisterInput"
                placeholder="Confirm Password"
                name="confirmPassword"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {passwordError && (
                <div className="openRegisterError">
                  Passwords do not match!
                </div>
              )}
            </>
          )}
          {registerPage !== 4 ? (
            <button
              className="openRegisterButton"
              onClick={() => setRegisterPage((prev) => prev + 1)}
              disabled={formData.name === "" || formData.username === "" || formData.dobMonth === "" || formData.dobMonth === "" || formData.dobYear === "" || (formData.email === "" && formData.phone === "")}
            >
              Next
            </button>
          ) : (
            <>
              <button
                className="openRegisterButton"
                onClick={handleSubmit}
                disabled={password === "" || confirmPassword === ""}
              >
                {isLoading ? <BeatLoader size={10} color={"#ffffff"} /> : "Sign up"}
              </button>
              {error && (
                <div className="openRegisterError">
                  Something went wrong, please try again!
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default OpenRegister