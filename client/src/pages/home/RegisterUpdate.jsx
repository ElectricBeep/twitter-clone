import { MdOutlineAddAPhoto } from "react-icons/md";
import { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import { IoIosNotificationsOutline } from "react-icons/io";
import { BsTwitter } from "react-icons/bs";

import noAvatar from "../../assets/noAvatar.webp";
import { updateUser } from "../../redux/userReducer";
import { BASE_URL } from "../../baseUrl";
import UsersItem from "../../components/users/UsersItem";
import { closeBox } from "../../redux/registerUpdateReducer";

const RegisterUpdate = () => {
  const [setUpProfilePage, setSetUpProfilePage] = useState(1);
  const [profilePicture, setProfilePicture] = useState(null);
  const [about, setAbout] = useState("");
  const [allowNotifications, setAllowNotifications] = useState(false);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);

  //get all users
  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/users`);
        setUsers(res.data.filter((user) => user._id !== currentUser._id));
      } catch (err) {
        console.log(err);
      };
    };
    getAllUsers();
  }, [currentUser]);

  const handleAdd = (item) => {
    if (!categories.includes(item)) {
      setCategories([...categories, item]);
    } else {
      setCategories(categories.filter((i) => i !== item));
    };
  };

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

    const updatedUser = {
      userId: currentUser._id,
      allowNotifications: allowNotifications,
      preferredContent: categories
    };
    try {
      const res = await axios.put(`${BASE_URL}/users/${currentUser._id}`, updatedUser);
      dispatch(updateUser(res.data));
    } catch (err) {
      console.log(err);
    };
    setLoading(false);
    setSetUpProfilePage(setUpProfilePage + 1)
  };

  const handleFinish = () => {
    dispatch(closeBox());
  };

  return (
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
                className={categories.includes("fashion") ? "homeOpenRegisterItemActive" : "homeOpenRegisterMiddleItem"}
                onClick={() => handleAdd("fashion")}
              >
                Fashion &<br />beauty
              </div>
              <div
                className={categories.includes("outdoors") ? "homeOpenRegisterItemActive" : "homeOpenRegisterMiddleItem"}
                onClick={() => handleAdd("outdoors")}
              >
                Outdoors
              </div>
              <div className={categories.includes("arts") ? "homeOpenRegisterItemActive" : "homeOpenRegisterMiddleItem"}
                onClick={() => handleAdd("arts")}
              >
                Arts &<br />cluture
              </div>
              <div className={categories.includes("animation") ? "homeOpenRegisterItemActive" : "homeOpenRegisterMiddleItem"}
                onClick={() => handleAdd("animation")}
              >
                Animation &<br />comics
              </div>
              <div className={categories.includes("business") ? "homeOpenRegisterItemActive" : "homeOpenRegisterMiddleItem"}
                onClick={() => handleAdd("business")}
              >
                Business &<br />finance
              </div>
              <div className={categories.includes("food") ? "homeOpenRegisterItemActive" : "homeOpenRegisterMiddleItem"}
                onClick={() => handleAdd("food")}
              >
                Food
              </div>
              <div className={categories.includes("travel") ? "homeOpenRegisterItemActive" : "homeOpenRegisterMiddleItem"}
                onClick={() => handleAdd("travel")}
              >
                Travel
              </div>
              <div className={categories.includes("entertainment") ? "homeOpenRegisterItemActive" : "homeOpenRegisterMiddleItem"}
                onClick={() => handleAdd("entertainment")}
              >
                Entertainment
              </div>
              <div className={categories.includes("music") ? "homeOpenRegisterItemActive" : "homeOpenRegisterMiddleItem"}
                onClick={() => handleAdd("music")}
              >
                Music
              </div>
              <div className={categories.includes("gaming") ? "homeOpenRegisterItemActive" : "homeOpenRegisterMiddleItem"}
                onClick={() => handleAdd("gaming")}
              >
                Gaming
              </div>
              <div className={categories.includes("careers") ? "homeOpenRegisterItemActive" : "homeOpenRegisterMiddleItem"}
                onClick={() => handleAdd("careers")}
              >
                Careers
              </div>
              <div className={categories.includes("family") ? "homeOpenRegisterItemActive" : "homeOpenRegisterMiddleItem"}
                onClick={() => handleAdd("family")}
              >
                Family &<br />relationships
              </div>
              <div className={categories.includes("fitness") ? "homeOpenRegisterItemActive" : "homeOpenRegisterMiddleItem"}
                onClick={() => handleAdd("fitness")}
              >
                Fitness
              </div>
              <div className={categories.includes("sports") ? "homeOpenRegisterItemActive" : "homeOpenRegisterMiddleItem"}
                onClick={() => handleAdd("sports")}
              >
                Sports
              </div>
              <div className={categories.includes("technology") ? "homeOpenRegisterItemActive" : "homeOpenRegisterMiddleItem"}
                onClick={() => handleAdd("technology")}
              >
                Technology
              </div>
              <div className={categories.includes("science") ? "homeOpenRegisterItemActive" : "homeOpenRegisterMiddleItem"}
                onClick={() => handleAdd("science")}
              >
                Science
              </div>
            </div>
            <div className="homeOpenRegisterBottomContainer">
              <div className="homeOpenRegisterBottomContainerLeft">
                {categories.length} of 3 selected
              </div>
              <div className="homeOpenRegisterBottomContainerRight">
                <button
                  className="homeOpenRegisterBlackButton"
                  onClick={handleUpdate}
                  disabled={categories.length < 3 || loading}
                >
                  Next
                </button>
              </div>
            </div>
          </>
        )}
        {setUpProfilePage === 5 && (
          <>
            <div className="homeOpenRegisterIconContainer">
              <BsTwitter fontSize={40} color="#1da1f2" style={{ marginBottom: "20px" }} />
            </div>
            <h1>Don't miss out</h1>
            <p className="profileFeedSetUpProfileText">
              When you follow someone, you'll see their Tweets in
              your Timeline. You'll also get more relevant
              recommendations.
            </p>
            <h3 className="homeOpenRegisterSubtitle">
              Follow 1 or more accounts
            </h3>
            <div className="homeOpenRegisterUsersContainer">
              {users?.map((user) => (
                <UsersItem user={user} key={user._id} type="register" />
              ))}
            </div>
            <div className="homeOpenRegisterBottomContainer">
              {currentUser?.followings.length === 0 ? (
                <button
                  className="profileFeedSetUpProfileButton"
                  style={{ marginTop: "0" }}
                  onClick={handleFinish}
                >
                  Skip for now
                </button>
              ) : (
                <button
                  className="profileFeedSetUpProfileNextButton"
                  style={{ marginTop: "0" }}
                  onClick={handleFinish}
                >
                  {loading ? <ClipLoader color="#fff" size={14} /> : "Next"}
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default RegisterUpdate