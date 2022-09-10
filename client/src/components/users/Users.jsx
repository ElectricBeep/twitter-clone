import { useEffect } from "react";
import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import axios from "axios";
import { BASE_URL } from "../../baseUrl";
import { BsArrowLeft } from "react-icons/bs";
import { Link, useLocation, useParams } from "react-router-dom";

import UsersItem from "./UsersItem";
import "./users.css";

const Users = ({ setOpenRetweets, setOpenLikes, postId, type, commentId }) => {
  const [users, setUsers] = useState(null);
  const [user, setUser] = useState(null);
  const location = useLocation();
  const params = useParams();
  const [active, setActive] = useState(location?.pathname?.split("/")[1]);

  useEffect(() => {
    if (type === "liked" && postId) {
      const getUsersWhoLikedPost = async () => {
        try {
          const res = await axios.get(`${BASE_URL}/posts/likes/${postId}`);
          setUsers(res.data);
        } catch (err) {
          console.log(err);
        };
      };
      getUsersWhoLikedPost();
    };
  }, [postId, type]);

  useEffect(() => {
    if (type === "liked" && commentId) {
      const getUsersWhoLikedPost = async () => {
        try {
          const res = await axios.get(`${BASE_URL}/comments/likes/${commentId}`);
          setUsers(res.data);
        } catch (err) {
          console.log(err);
        };
      };
      getUsersWhoLikedPost();
    };
  }, [commentId, type]);

  //get user if user is on following/followers page
  useEffect(() => {
    if (type === "following" || type === "followers") {
      const getUser = async () => {
        try {
          const res = await axios.get(`${BASE_URL}/users/${params.id}`);
          setUser(res.data);
        } catch (err) {
          console.log(err);
        };
      };
      getUser();
    };
  }, [type, params]);

  //get user's following
  useEffect(() => {
    if (user && active === "following" && (type === "following" || type === "followers")) {
      const getUserFollowing = async () => {
        try {
          const res = await axios.get(`${BASE_URL}/users/followings/${user._id}`);
          setUsers(res.data);
        } catch (err) {
          console.log(err);
        };
      };
      getUserFollowing();
    };
  }, [type, user, active]);

  //get user's followers
  useEffect(() => {
    if (user && active === "followers" && (type === "following" || type === "followers")) {
      const getUserFollowers = async () => {
        try {
          const res = await axios.get(`${BASE_URL}/users/followers/${user?._id}`);
          setUsers(res.data);
        } catch (err) {
          console.log(err);
        };
      };
      getUserFollowers();
    };
  }, [user, active, type]);

  const handleClose = () => {
    if (setOpenRetweets) {
      setOpenRetweets(false);
    };
    if (setOpenLikes) {
      setOpenLikes(false);
    }
  };

  return (
    <div className={type === "following" || type === "followers" ? "usersFlex" : "users"}>
      <div className={type === "following" || type === "followers" ? "usersWrapperFlex" : "usersWrapper"}>
        <div className="usersNavbar">
          {type === "liked" || type === "retweeted" ? (
            <AiOutlineClose
              className="usersCloseIcon"
              onClick={handleClose}
            />
          ) : (
            <>
              <Link to={`/profile/${user?._id}`} className="link">
                <BsArrowLeft className="usersCloseIcon" />
              </Link>
              <div>
                <h4>{user?.username}</h4>
                <div className="usersUserTags">
                  @{user?.username}
                </div>
              </div>
            </>
          )}
          <h3>
            {type === "liked" && "Liked by"}
            {type === "retweeted" && "Retweeted by"}
          </h3>
        </div>
        {(type === "following" || type === "followers") && (
          <div className="usersFollowersFollowingContainer">
            <div
              className={active === "followers" ? "usersFollowersFollowing active" : "usersFollowersFollowing"}
              onClick={() => setActive("followers")}
            >
              <span>Followers</span>
            </div>
            <div
              className={active === "following" ? "usersFollowersFollowing active" : "usersFollowersFollowing"}
              onClick={() => setActive("following")}
            >
              <span>Following</span>
            </div>
          </div>
        )}
        {users?.map((user) => (
          <UsersItem key={user._id} user={user} />
        ))}
        {(type === "liked" || type === "retweeted") && (
          <>
            {(!users || users.length === 0) && (
              <h4 className="usersNoUsers">
                No one has {type} this post yet.
              </h4>
            )}
          </>
        )}
        {(type === "followers" || active === "followers") && (
          <>
            {(!users || users.length === 0) && (
              <div className="usersNoUsersContainer">
                <img
                  src="https://abs.twimg.com/sticky/illustrations/empty-states/yellow-birds-power-line-800x400.v1.png"
                  alt="no users"
                  className="usersNoUsersImg"
                />
                <h1>Looking for Followers?</h1>
                <p className="usersNoUsersText">
                  When someone follows this account, they’ll show up here.
                  Tweeting and interacting with others helps boost
                  followers.
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default Users