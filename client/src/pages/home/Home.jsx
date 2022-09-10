import "./home.css";
import { useLocation } from "react-router-dom";
import { MdOutlineAddAPhoto } from "react-icons/md";
import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";

import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import noAvatar from "../../assets/noAvatar.webp";
import { updateUser } from "../../redux/userReducer";
import { BASE_URL } from "../../baseUrl";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import { IoIosNotificationsOutline } from "react-icons/io";
import { BsTwitter } from "react-icons/bs";

const Home = () => {
  const [setUpProfilePage, setSetUpProfilePage] = useState(1);
  const [profilePicture, setProfilePicture] = useState(null);
  const [about, setAbout] = useState("");
  const [allowNotifications, setAllowNotifications] = useState(false);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState({});
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const location = useLocation();

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (profilePicture) {
      try {
        const data = new FormData();
        data.append("file", profilePicture);
        data.append("upload_preset", "uploads");

        const uploadRes = await axios.post(
          process.env.REACT_APP_CLOUDINARY_IMAGE_URL,
          data
        );
        const { url } = uploadRes.data; //Getting image url for storing to mongo

        const updatedUser = {
          userId: currentUser._id,
          profilePicture: url
        };

        const res = await axios.put(`${BASE_URL}/users/${currentUser._id}`, updatedUser);
        dispatch(updateUser(res.data));
      } catch (err) {
        console.log(err);
      };
    };
    if (about !== "") {
      try {
        const res = await axios.put(`${BASE_URL}/users/${currentUser._id}`, {
          userId: currentUser._id,
          about: about
        });
        dispatch(updateUser(res.data));
      } catch (err) {
        console.log(err);
      };
    };
    setLoading(false);
    setSetUpProfilePage(setUpProfilePage + 1);
  };

  const handleReload = () => {
    // setOpenSetUpProfile(false);
  };

  const handleAddToCategory = (e) => {
    setCategory({ ...category, [e.target.name]: e.target.value })
  };

  const openRegisterInput = true
  console.log(category)

  return (
    <div className="home">
      {/* {location?.state?.openRegisterInput && ( */}
      {openRegisterInput && (
        <div className="homeOpenRegister">
          <div className="homeOpenRegisterWrapper">
            {setUpProfilePage === 1 && (
              <>
                <h1 className="profileFeedSetUpProfileTitle">
                  Pick a profile picture
                </h1>
                <p className="profileFeedSetUpProfileText">
                  Have a favorite selfie? Upload it now.
                </p>
                <div className="profileFeedSetUpProfileImgContainer">
                  <img
                    src={profilePicture ? URL.createObjectURL(profilePicture) : currentUser?.profilePicture ? currentUser.profilePicture : noAvatar}
                    alt="profile"
                    className="profileFeedSetUpProfileProfileImg"
                  />
                  {profilePicture ? (
                    <AiOutlineClose
                      className="profileFeedSetUpProfileResetImg"
                      onClick={() => setProfilePicture(null)}
                    />
                  ) : (
                    <label
                      htmlFor="profilePicture"
                      className="profileFeedSetUpProfileProfileLabel"
                    >
                      <MdOutlineAddAPhoto
                        className="profileFeedSetUpProfileProfileImgIcon"
                      />
                      <input
                        type="file"
                        accept="image/*"
                        id="profilePicture"
                        name="profilePicture"
                        onChange={(e) => setProfilePicture(e.target.files[0])}
                        style={{ display: "none" }}
                      />
                    </label>
                  )}
                </div>
                {profilePicture ? (
                  <button
                    className="profileFeedSetUpProfileNextButton"
                    onClick={() => setSetUpProfilePage(setUpProfilePage + 1)}
                  >
                    Next
                  </button>
                ) : (
                  <button
                    className="profileFeedSetUpProfileButton"
                    onClick={() => setSetUpProfilePage(setUpProfilePage + 1)}
                  >
                    Skip for now
                  </button>
                )}
              </>
            )}
            {setUpProfilePage === 2 && (
              <>
                <h1 className="profileFeedSetUpProfileTitle">
                  Describe yourself
                </h1>
                <p className="profileFeedSetUpProfileText">
                  What makes you special? Don't think too hard, just have fun with it.
                </p>
                <div className="profileFeedSetUpProfileImgContainer">
                  <textarea
                    className="profileFeedSetUpProfileTextarea"
                    cols="30"
                    rows="6"
                    placeholder="Your bio"
                    maxLength={160}
                    onChange={(e) => setAbout(e.target.value)}
                    value={about}
                  />
                </div>
                {about !== "" ? (
                  <button
                    className="profileFeedSetUpProfileNextButton"
                    onClick={() => setSetUpProfilePage(setUpProfilePage + 1)}
                  >
                    Next
                  </button>
                ) : (
                  <button
                    className="profileFeedSetUpProfileButton"
                    onClick={() => setSetUpProfilePage(setUpProfilePage + 1)}
                  >
                    Skip for now
                  </button>
                )}
              </>
            )}
            {setUpProfilePage === 3 && (
              <>
                <div className="homeOpenRegisterIconContainer">
                  <IoIosNotificationsOutline className="homeOpenRegisterIcon" />
                </div>
                <h1>Turn on notifications</h1>
                <p className="profileFeedSetUpProfileText">
                  Get the most out of Twitter by staying up to date with
                  what's happening
                </p>
                <button
                  className="profileFeedSetUpProfileNextButton"
                  onClick={() => {
                    setAllowNotifications(true);
                    setSetUpProfilePage(setUpProfilePage + 1);
                  }}
                >
                  Allow Notifications
                </button>
                <button
                  className="profileFeedSetUpProfileButton"
                  onClick={() => setSetUpProfilePage(setUpProfilePage + 1)}
                >
                  Skip for now
                </button>
              </>
            )}
            {setUpProfilePage === 4 && (
              <>
                <div className="homeOpenRegisterIconContainer">
                  <BsTwitter fontSize={40} color="#1da1f2" style={{ marginBottom: "20px" }} />
                </div>
                <h1>What do you want to see on Twitter?</h1>
                <p className="profileFeedSetUpProfileText">
                  Select at least 3 interests to personalize your
                  Twitter experience. They will be visible on your
                  profile.
                </p>
                <div className="homeOpenRegisterMiddleContainer">
                  <div
                    className="homeOpenRegisterMiddleItem"
                    value="fashion"
                    name="fashion"
                    onClick={handleAddToCategory}
                  >
                    Fashion &<br />beauty
                  </div>
                  <div
                    className="homeOpenRegisterMiddleItem"
                    value="outdoors"
                    name="outdoors"
                    onClick={handleAddToCategory}
                  >
                    Outdoors
                  </div>
                  <div className="homeOpenRegisterMiddleItem">
                    Arts &<br />cluture
                  </div>
                  <div className="homeOpenRegisterMiddleItem">
                    Animation &<br />comics
                  </div>
                  <div className="homeOpenRegisterMiddleItem">
                    Business &<br />finance
                  </div>
                  <div className="homeOpenRegisterMiddleItem">
                    Food
                  </div>
                  <div className="homeOpenRegisterMiddleItem">
                    Travel
                  </div>
                  <div className="homeOpenRegisterMiddleItem">
                    Entertainment
                  </div>
                  <div className="homeOpenRegisterMiddleItem">
                    Music
                  </div>
                  <div className="homeOpenRegisterMiddleItem">
                    Gaming
                  </div>
                  <div className="homeOpenRegisterMiddleItem">
                    Careers
                  </div>
                  <div className="homeOpenRegisterMiddleItem">
                    Family &<br />relationships
                  </div>
                  <div className="homeOpenRegisterMiddleItem">
                    Fitness
                  </div>
                  <div className="homeOpenRegisterMiddleItem">
                    Sports
                  </div>
                  <div className="homeOpenRegisterMiddleItem">
                    Technology
                  </div>
                  <div className="homeOpenRegisterMiddleItem">
                    Science
                  </div>
                </div>
                <div className="homeOpenRegisterBottomContainer">
                  <div className="homeOpenRegisterBottomContainerLeft">
                    0 of 3 selected
                  </div>
                  <div className="homeOpenRegisterBottomContainerRight">
                    <button
                      className="homeOpenRegisterBlackButton"
                      onClick={() => {
                        // setAllowNotifications(true);
                        setSetUpProfilePage(setUpProfilePage + 1);
                      }}
                    >
                      Next
                    </button>
                  </div>
                </div>
                {/* <h1 className="profileFeedSetUpProfileTitle">
                  Where do you live
                </h1>
                <p className="profileFeedSetUpProfileText">
                  Find accounts in the same location as you.
                </p>
                <div className="profileFeedSetUpProfileImgContainer">
                  <input
                    type="text"
                    placeholder="Location"
                    className="profileFeedSetUpProfileInput"
                    onChange={(e) => setYourLocation(e.target.value)}
                    value={yourLocation}
                  />
                </div>
                {(yourLocation !== "" || about !== "" || profilePicture) ? (
                  <button
                    className="profileFeedSetUpProfileNextButton"
                    onClick={handleUpdate}
                    disabled={loading}
                  >
                    {loading ? <ClipLoader color="#fff" size={14} /> : "Update Account"}
                  </button>
                ) : (
                  <button
                    className="profileFeedSetUpProfileButton"
                    onClick={() => setSetUpProfilePage(setUpProfilePage + 1)}
                  >
                    Skip for now
                  </button>
                )} */}
              </>
            )}
            {setUpProfilePage === 5 && (
              <>
                <h1 className="profileFeedSetUpProfileTitle">
                  Your profile is updated
                </h1>
                <div className="profileFeedSetUpProfileImgContainer">
                  <button
                    className="profileFeedSetUpProfileNextButton"
                    onClick={handleReload}
                  >
                    See profile
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
      <Sidebar />
      <Feed title="Home" location={location} />
      <Rightbar page="home" />
    </div>
  )
}

export default Home