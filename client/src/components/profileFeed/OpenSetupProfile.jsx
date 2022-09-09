import { MdOutlineAddAPhoto } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";
import { BsArrowLeft, BsTwitter } from "react-icons/bs";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { ClipLoader } from "react-spinners";

import noAvatar from "../../assets/noAvatar.webp";
import { BASE_URL } from "../../baseUrl";
import { updateUser } from "../../redux/userReducer";

const OpenSetupProfile = ({
  user,
  setUser,
  currentUser,
  setOpenSetUpProfile,
  setUpProfilePage,
  setSetUpProfilePage,
  profilePicture,
  setProfilePicture,
  coverPicture,
  setCoverPicture,
  about,
  setAbout,
  location,
  setLocation
}) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleClose = () => {
    setOpenSetUpProfile(false);
    setSetUpProfilePage(1);
    setProfilePicture(null);
    setCoverPicture(null);
    setAbout("");
    setLocation("");
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
        if (user._id === currentUser._id) {
          setUser(res.data);
        };
      } catch (err) {
        console.log(err);
      };
    };
    if (coverPicture) {
      try {
        const data = new FormData();
        data.append("file", coverPicture);
        data.append("upload_preset", "uploads");

        const uploadRes = await axios.post(
          process.env.REACT_APP_CLOUDINARY_IMAGE_URL,
          data
        );
        const { url } = uploadRes.data; //Getting image url for storing to mongo

        const updatedUser = {
          userId: currentUser._id,
          coverPicture: url
        };

        const res = await axios.put(`${BASE_URL}/users/${currentUser._id}`, updatedUser);
        dispatch(updateUser(res.data));
        if (user._id === currentUser._id) {
          setUser(res.data);
        };
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
    if (location !== "") {
      try {
        const res = await axios.put(`${BASE_URL}/users/${currentUser._id}`, {
          userId: currentUser._id,
          location: location
        });
        dispatch(updateUser(res.data));
        if (user._id === currentUser._id) {
          setUser(res.data);
        };
      } catch (err) {
        console.log(err);
      };
    };
    setLoading(false);
    setSetUpProfilePage(setUpProfilePage + 1);
  };

  const handleReload = () => {
    setOpenSetUpProfile(false);
  };

  return (
    <div className="profileFeedSetUpProfilePopupContainer">
      <div className="profileFeedSetUpProfilePopupWrapper">
        <div className="profileFeedSetUpProfileLogoContainer">
          <BsArrowLeft
            style={setUpProfilePage === 1 && { visibility: "hidden" }}
            className="profileFeedSetUpProfileIcon"
            onClick={() => setSetUpProfilePage(setUpProfilePage - 1)}
          />
          <BsTwitter style={{ color: "#1da1f2", fontSize: "30px" }} />
          <AiOutlineClose
            className="profileFeedSetUpProfileIcon"
            onClick={handleClose}
          />
        </div>
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
              Pick a header
            </h1>
            <p className="profileFeedSetUpProfileText">
              People who visit your profile will see it. Show your style.
            </p>
            <div className="profileFeedSetUpProfileImgContainer">
              <img
                src={coverPicture ? URL.createObjectURL(coverPicture) : currentUser?.coverPicture ? currentUser.coverPicture : "https://www.solidbackgrounds.com/images/1920x1080/1920x1080-dark-gray-solid-color-background.jpg"}
                alt="cover"
                className="profileFeedSetUpProfileCoverImg"
              />
              {coverPicture ? (
                <AiOutlineClose
                  className="profileFeedSetUpProfileResetImg"
                  onClick={() => setCoverPicture(null)}
                />
              ) : (
                <label
                  htmlFor="coverPicture"
                  className="profileFeedSetUpProfileProfileLabel"
                >
                  <MdOutlineAddAPhoto
                    className="profileFeedSetUpProfileProfileImgIcon"
                  />
                  <input
                    type="file"
                    accept="image/*"
                    id="coverPicture"
                    name="coverPicture"
                    onChange={(e) => setCoverPicture(e.target.files[0])}
                    style={{ display: "none" }}
                  />
                </label>
              )}
            </div>
            {coverPicture ? (
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
        {setUpProfilePage === 4 && (
          <>
            <h1 className="profileFeedSetUpProfileTitle">
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
                onChange={(e) => setLocation(e.target.value)}
                value={location}
              />
            </div>
            {(location !== "" || about !== "" || coverPicture || profilePicture) ? (
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
            )}
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
  )
}

export default OpenSetupProfile