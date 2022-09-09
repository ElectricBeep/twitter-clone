import { BsTwitter, BsEnvelope, BsFillEnvelopeFill, BsBookmark, BsBookmarksFill, BsPerson, BsFillPersonFill, } from "react-icons/bs";
import { AiOutlineHome, AiFillHome, AiOutlineClose, AiFillThunderbolt } from "react-icons/ai";
import { FiSearch, FiMoreHorizontal } from "react-icons/fi";
import { FaSearch } from "react-icons/fa";
import { IoIosNotificationsOutline, IoMdNotifications } from "react-icons/io";
import { TbDotsCircleHorizontal } from "react-icons/tb";
import { HiOutlineHashtag, HiHashtag } from "react-icons/hi";
import { useState } from "react";
import { RiFileListLine, RiFileListFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";

import "./sidebar.css"
import SidebarMoreMenu from "./SidebarMoreMenu";
import { logout } from "../../redux/userReducer";
import noAvatar from "../../assets/noAvatar.webp"

const Sidebar = ({ page }) => {
  const [openMore, setOpenMore] = useState(false);
  const [openMoreProfile, setOpenMoreProfile] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const path = location.pathname;

  const handleLogout = () => {
    dispatch(logout());
    navigate("/register");
  };

  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className="sidebar">
      {page !== "moment" && (
        <div className="sidebarWrapper">
          <div className="sidebarLogo">
            <BsTwitter className="icon" />
          </div>
          <div className="sidebarIconContainer">
            <Link
              to="/"
              className="link"
            >
              <div className="sidebarIcon">
                {path === "/" ? (
                  <>
                    <AiFillHome className="icon" />
                    <b className="sidebarIconText">Home</b>
                  </>
                ) : (
                  <>
                    <AiOutlineHome className="icon" />
                    <p className="sidebarIconText">Home</p>
                  </>
                )}
              </div>
            </Link>
            <Link
              to="/explore"
              className="link"
            >
              <div className="sidebarIcon">
                {path === "/explore" ? (
                  <>
                    <HiHashtag className="icon" />
                    <b className="sidebarIconText">Explore</b>
                  </>
                ) : (
                  <>
                    <HiOutlineHashtag className="icon" />
                    <p className="sidebarIconText">Explore</p>
                  </>
                )}
              </div>
            </Link>
            <Link
              to="/search"
              className="link"
            >
              <div className="sidebarIcon">
                {path === "/search" ? (
                  <>
                    <FaSearch className="icon" />
                    <b className="sidebarIconText">Search</b>
                  </>
                ) : (
                  <>
                    <FiSearch className="icon" />
                    <p className="sidebarIconText">Search</p>
                  </>
                )}
              </div>
            </Link>
            <Link
              to="/notifications"
              className="link"
            >
              <div
                className="sidebarIcon"
                style={{ width: "150px" }}
              >
                {path === "/notifications" ? (
                  <>
                    <IoMdNotifications className="icon" />
                    <b className="sidebarIconText">Notifications</b>
                  </>
                ) : (
                  <>
                    <IoIosNotificationsOutline className="icon" />
                    <p className="sidebarIconText">Notifications</p>
                  </>
                )}
              </div>
            </Link>
            <Link
              to="/messages"
              className="link"
            >
              <div className="sidebarIcon">
                {path === "/messages" ? (
                  <>
                    <BsFillEnvelopeFill className="icon" />
                    <b className="sidebarIconText">Messages</b>
                  </>
                ) : (
                  <>
                    <BsEnvelope className="icon" />
                    <p className="sidebarIconText">Messages</p>
                  </>
                )}
              </div>
            </Link>
            <Link
              to="/bookmarks"
              className="link"
            >
              <div className="sidebarIcon">
                {path === "/bookmarks" ? (
                  <>
                    <BsBookmarksFill className="icon" />
                    <b className="sidebarIconText">Bookmarks</b>
                  </>
                ) : (
                  <>
                    <BsBookmark className="icon" />
                    <p className="sidebarIconText">Bookmarks</p>
                  </>
                )}
              </div>
            </Link>
            <Link
              to="/lists"
              className="link"
            >
              <div className="sidebarIcon">
                {path === "/lists" ? (
                  <>
                    <RiFileListFill className="icon" />
                    <b className="sidebarIconText">Lists</b>
                  </>
                ) : (
                  <>
                    <RiFileListLine className="icon" />
                    <p className="sidebarIconText">Lists</p>
                  </>
                )}
              </div>
            </Link>
            <Link
              to={`/profile/${currentUser._id}`}
              className="link"
            >
              <div className="sidebarIcon">
                {path === `/profile/${currentUser._id}` ? (
                  <>
                    <BsFillPersonFill className="icon" />
                    <b className="sidebarIconText">Profile</b>
                  </>
                ) : (
                  <>
                    <BsPerson className="icon" />
                    <p className="sidebarIconText">Profile</p>
                  </>
                )}
              </div>
            </Link>
            <div className="sidebarIcon" onClick={() => setOpenMore(true)}>
              <TbDotsCircleHorizontal className="icon" />
              <p className="sidebarIconText">More</p>
            </div>
            {openMore && (
              <SidebarMoreMenu setOpenMore={setOpenMore} />
            )}
            <Link to="/tweet" className="link">
              <button className="sidebarButton">
                Tweet
              </button>
            </Link>
          </div>
          <div className="sidebarProfile">
            <img
              src={currentUser.profilePicture ? currentUser.profilePicture : noAvatar}
              alt="user profile"
              className="sidebarProfileImg"
            />
            <p className="sidebarProfileUser">{currentUser.username}</p>
            <FiMoreHorizontal
              className="sidebarProfileUserMoreIcon"
              onClick={() => setOpenMoreProfile((prev) => !prev)}
            />
            {openMoreProfile && (
              <div className="sidebarProfileUserMoreMenu">
                <AiOutlineClose
                  className="sidebarMoreMenuClose"
                  onClick={() => setOpenMoreProfile(false)}
                />
                <div className="sidebarProfileUserMoreTop">
                  <img
                    src={currentUser.profilePicture ? currentUser.profilePicture : noAvatar}
                    alt="user profile"
                    className="sidebarProfileUserMoreProfileImg"
                  />
                  <div className="sidebarProfileUserMoreUserInfo">
                    <p className="sidebarProfileUserMoreUserName">{currentUser.username}</p>
                    <p className="sidebarProfileUserMoreUserTags">@{currentUser.username}</p>
                  </div>
                </div>
                <div className="sidebarProfileUserMoreItem">
                  <p>Add an existing account</p>
                </div>
                <div
                  className="sidebarProfileUserMoreItem"
                  onClick={handleLogout}
                >
                  <p>Log out @{currentUser.username}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      {page === "moment" && (
        <div className="sidebarWrapper">
          <div>
            <div className="sidebarLogo">
              <BsTwitter className="icon" />
            </div>
            <div className="sidebarIconContainerMoment">
              <Link
                to="/"
                className="link"
              >
                <div className="sidebarIcon">
                  <AiOutlineHome className="icon" />
                  <b className="sidebarIconText">Home</b>
                </div>
              </Link>
              <Link
                to="/moments"
                className="link"
              >
                <div className="sidebarIcon">
                  <AiFillThunderbolt className="icon" />
                  <b className="sidebarIconText">Moments</b>
                </div>
              </Link>
              <button className="sidebarButton">
                Create
              </button>
            </div>
          </div>
          <div className="sidebarProfile">
            <img
              src={currentUser.profilePicture ? currentUser.profilePicture : noAvatar}
              alt="user profile"
              className="sidebarProfileImg"
            />
            <p className="sidebarProfileUser">{currentUser.username}</p>
            <FiMoreHorizontal
              className="sidebarProfileUserMoreIcon"
              onClick={() => setOpenMoreProfile((prev) => !prev)}
            />
            {openMoreProfile && (
              <div className="sidebarProfileUserMoreMenu">
                <AiOutlineClose
                  className="sidebarMoreMenuClose"
                  onClick={() => setOpenMoreProfile(false)}
                />
                <div className="sidebarProfileUserMoreTop">
                  <img
                    src={currentUser.profilePicture ? currentUser.profilePicture : noAvatar}
                    alt="user profile"
                    className="sidebarProfileUserMoreProfileImg"
                  />
                  <div className="sidebarProfileUserMoreUserInfo">
                    <p className="sidebarProfileUserMoreUserName">{currentUser.username}</p>
                    <p className="sidebarProfileUserMoreUserTags">@{currentUser.username}</p>
                  </div>
                </div>
                <div className="sidebarProfileUserMoreItem">
                  <p>Add an existing account</p>
                </div>
                <div className="sidebarProfileUserMoreItem">
                  <p>Log out @{currentUser.username}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div >
  )
}

export default Sidebar