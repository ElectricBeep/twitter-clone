import { AiOutlineFileImage, AiOutlineClose, AiOutlineVideoCameraAdd } from "react-icons/ai";
import { GiNetworkBars } from "react-icons/gi";
import { BsEmojiSmile, BsPersonCheck } from "react-icons/bs";
import { AiOutlineCheck } from "react-icons/ai";
import { FiAtSign } from "react-icons/fi";
import { useState } from "react";
import { GoGlobe } from "react-icons/go";
import { useSelector } from "react-redux";
import { FaGlobeAmericas } from "react-icons/fa";
import Picker from 'emoji-picker-react';
import axios from "axios";
import toast from 'react-hot-toast';
import { ClipLoader } from "react-spinners";
// import {
//   getStorage,
//   ref,
//   uploadBytesResumable,
//   getDownloadURL,
// } from "firebase/storage";

import "./share.css";
import Navbar from "../navbar/Navbar";
import noAvatar from "../../assets/noAvatar.webp";
import { BASE_URL } from "../../baseUrl";

const Share = ({ type, setPosts }) => {
  const [active, setActive] = useState(false);
  const [whoCanReplyMenu, setWhoCanReplyMenu] = useState(false);
  const [whoCanReplyOption, setWhoCanReplyOption] = useState("Everyone");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isSmileHovered, setIsSmileHovered] = useState(false);
  const [isPictureHovered, setIsPictureHovered] = useState(false);
  const [isVideoHovered, setIsVideoHovered] = useState(false);
  const [postInputText, setPostInputText] = useState("");
  const [imagesArray, setImagesArray] = useState([]);
  const [images, setImages] = useState([]);
  const [video, setVideo] = useState(undefined);
  const [loading, setLoading] = useState(false);

  const { currentUser } = useSelector((state) => state.user);

  let filesArray = [];

  const handleEmojiClick = (e, emoji) => {
    let text = postInputText;
    text += emoji.emoji;
    setPostInputText(text);
  };

  const handleWhoCanReply = (option) => {
    if (option === "Everyone") {
      setWhoCanReplyOption("Everyone");
    } else if (option === "People you follow") {
      setWhoCanReplyOption("People you follow");
    } else if (option === "Only people you mention") {
      setWhoCanReplyOption("Only people you mention");
    };
    setWhoCanReplyMenu(false);
  };

  //create images array for previewing before upload
  const handleImageChange = (e) => {
    if (video) {
      setVideo(undefined);
    };
    if (e.target.files) {
      setImages(e.target.files);
      filesArray = Array.from(e.target.files).map((file) => URL.createObjectURL(file));

      if (filesArray.length > 4) {
        setImages([]);
        toast.error("You can't add more than 4 images!", {
          style: {
            backgroundColor: "#1da1f2",
            color: "white",
          },
        });
        return;
      };

      setImagesArray((prevImages) => prevImages.concat(filesArray));

      Array.from(e.target.files).map(
        (file) => URL.revokeObjectURL(file) // avoid memory leak
      );
    };
  };

  //remove selected image
  const handleRemoveImage = (index) => {
    // const newImages = images;
    // newImages.splice(index, 1);
    setImagesArray((prev) => prev.splice(index, 1));
    // setImagesArray(newImages);
  };

  const handleVideoChange = (e) => {
    if (imagesArray.length > 0) {
      setImagesArray([]);
      setImages([]);
    };
    setVideo(e.target.files[0]);
  };

  const resetValues = () => {
    setPostInputText("");
    setImages([]);
    setImagesArray([]);
    setVideo(undefined);
    setLoading(false);
    setShowEmojiPicker(false);
    filesArray = [];
  };

  //create a post
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (video) {
      try {
        const data = new FormData();
        data.append("file", video);
        data.append("upload_preset", "uploads");

        const uploadRes = await axios.post(
          process.env.REACT_APP_CLOUDINARY_VIDEO_URL,
          data
        );
        const { url } = uploadRes.data; //Getting image url for storing to mongo

        const newPost = {
          userId: currentUser._id,
          userUsername: currentUser.username,
          desc: postInputText,
          video: url,
        };

        const res = await axios.post(`${BASE_URL}/posts`, newPost);
        setPosts((prev) => [...prev, res.data]);
        resetValues();
      } catch (err) {
        console.log(err);
      };
    } else if (!video && filesArray.length <= 4) {
      try {
        const imagesList = await Promise.all(
          Object.values(images).map(async (file) => {
            const data = new FormData();
            data.append("file", file);
            data.append("upload_preset", "uploads");

            const uploadRes = await axios.post(
              process.env.REACT_APP_CLOUDINARY_IMAGE_URL,
              data
            );
            const { url } = uploadRes.data; //Getting image url for storing to mongo
            return url;
          })
        );
        const newPost = {
          userId: currentUser._id,
          userUsername: currentUser.username,
          desc: postInputText,
          images: imagesList,
        };
        const res = await axios.post(`${BASE_URL}/posts`, newPost);
        setPosts((prev) => [res.data, ...prev]);
        resetValues();
      } catch (err) {
        console.log(err);
      }
    } else if (!video && images === []) {
      try {
        const newPost = {
          userId: currentUser._id,
          userUsername: currentUser.username,
          desc: postInputText
        };
        const res = await axios.post(`${BASE_URL}/posts`, newPost);
        setPosts((prev) => [...prev, res.data]);
        resetValues();
      } catch (err) {
        console.log(err);
      };
    };
  };

  return (
    <div className="share">
      {type === "tweet" && (
        <Navbar title="Tweet" />
      )}
      <div className="shareWrapper">
        <div className="shareTop">
          <img
            src={currentUser.profilePicture ? currentUser.profilePicture : noAvatar}
            alt="user profile"
            className="shareProfileImg"
          />
          <input
            type="text"
            placeholder="What's happening?"
            className="shareInput"
            onClick={() => setActive(true)}
            value={postInputText}
            onChange={(e) => setPostInputText(e.target.value)}
          />
        </div>
        <div
          className={`postContentImagesContainer${imagesArray?.length}`}
          style={{ marginTop: "15px" }}
        >
          {imagesArray.length > 0 && imagesArray.map((photo, i) => (
            <div key={i} style={{ position: "relative" }}>
              <img
                src={photo}
                alt="post"
                className={`postContentImg postContentImg${i}`}
              />
              <AiOutlineClose
                className="shareRemoveImgButton"
                onClick={() => handleRemoveImage(i)}
              />
            </div>
          ))}
        </div>
        {video && (
          <div className="shareVideoPreviewContainer">
            <video
              controls
              className="shareVideoPreview"
            >
              <source src={URL.createObjectURL(video)} />
            </video>
            <AiOutlineClose
              style={{ top: "25px" }}
              className="shareRemoveImgButton"
              onClick={() => setVideo(undefined)}
            />
          </div>
        )}
        {active && (
          <div className="shareActive">
            <div
              className="shareActiveWrapper"
              onClick={() => setWhoCanReplyMenu((prev) => !prev)}
            >
              <GoGlobe />
              <span className="shareActiveText">
                {whoCanReplyOption} can reply
              </span>
            </div>
            {whoCanReplyMenu && (
              <div className="shareActiveMenu">
                <div className="shareActiveMenuTexts">
                  <h4>Who can reply?</h4>
                  <p className="shareActiveMenuText">
                    Choose who can reply to this Tweet.
                  </p>
                  <p className="shareActiveMenuText">
                    Anyone mentioned can always reply.
                  </p>
                </div>
                <div
                  className="shareActiveMenuItem"
                  onClick={() => handleWhoCanReply("Everyone")}
                >
                  <div className="shareActiveMenuItemLeft">
                    <div className="shareActiveMenuIconContainer">
                      <FaGlobeAmericas className="shareActiveMenuIcon" />
                    </div>
                    <p className="shareActiveMenuIconText">
                      Everyone
                    </p>
                  </div>
                  <div className="shareActiveMenuItemRight">
                    <AiOutlineCheck className={whoCanReplyOption === "Everyone" ? "activeMenuCheckmark active" : "activeMenuCheckmark"} />
                  </div>
                </div>
                <div
                  className="shareActiveMenuItem"
                  onClick={() => handleWhoCanReply("People you follow")}
                >
                  <div className="shareActiveMenuItemLeft">
                    <div className="shareActiveMenuIconContainer">
                      <BsPersonCheck className="shareActiveMenuIcon" />
                    </div>
                    <p className="shareActiveMenuIconText">
                      People you follow
                    </p>
                  </div>
                  <div className="shareActiveMenuItemRight">
                    <AiOutlineCheck className={whoCanReplyOption === "People you follow" ? "activeMenuCheckmark active" : "activeMenuCheckmark"} />
                  </div>
                </div>
                <div
                  className="shareActiveMenuItem"
                  onClick={() => handleWhoCanReply("Only people you mention")}
                >
                  <div className="shareActiveMenuItemLeft">
                    <div className="shareActiveMenuIconContainer">
                      <FiAtSign className="shareActiveMenuIcon" />
                    </div>
                    <p className="shareActiveMenuIconText">
                      Only people you mention
                    </p>
                  </div>
                  <div className="shareActiveMenuItemRight">
                    <AiOutlineCheck className={whoCanReplyOption === "Only people you mention" ? "activeMenuCheckmark active" : "activeMenuCheckmark"} />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
        <div className="shareBottom">
          <div className="shareIconsContainer">
            <div className="shareIcon">
              <label style={{ cursor: "pointer" }} htmlFor="images">
                <AiOutlineFileImage
                  onMouseEnter={() => setIsPictureHovered(true)}
                  onMouseLeave={() => setIsPictureHovered(false)}
                />
              </label>
              <input
                type="file"
                accept="image/*"
                id="images"
                name="images"
                multiple
                onChange={handleImageChange}
                style={{ display: "none" }}
              />
              {isPictureHovered && (
                <div className="shareIsHovered">
                  <span>Picture</span>
                </div>
              )}
            </div>
            <div className="shareIcon">
              <label style={{ cursor: "pointer" }} htmlFor="video">
                <AiOutlineVideoCameraAdd
                  onMouseEnter={() => setIsVideoHovered(true)}
                  onMouseLeave={() => setIsVideoHovered(false)}
                />
              </label>
              <input
                type="file"
                accept="video/*"
                id="video"
                name="video"
                onChange={handleVideoChange}
                style={{ display: "none" }}
              />
              {isVideoHovered && (
                <div className="shareIsHovered">
                  <span>Video</span>
                </div>
              )}
            </div>
            <div className="shareIcon">
              <GiNetworkBars />
            </div>
            <div className="shareIcon">
              <BsEmojiSmile
                onMouseEnter={() => setIsSmileHovered(true)}
                onMouseLeave={() => setIsSmileHovered(false)}
                onClick={() => setShowEmojiPicker((prev) => !prev)}
              />
              {isSmileHovered && (
                <div className="shareIsHovered">
                  <span>Emoji</span>
                </div>
              )}
              {showEmojiPicker && (
                <div className="emojiPickerContainer">
                  <Picker onEmojiClick={handleEmojiClick} />
                </div>
              )}
            </div>
          </div>
          {loading ? (
            <button
              className="shareButton"
              disabled={loading}
            >
              <ClipLoader color="#fff" size={14} />
            </button>
          ) : (
            <button
              className="shareButton"
              disabled={postInputText === ""}
              onClick={handleSubmit}
            >
              Tweet
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Share