import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../baseUrl";

import noAvatar from "../../assets/noAvatar.webp";
import { addToFollowings } from "../../redux/userReducer";
import PostHover from "../post/PostHover";

const UsersItem = ({ user }) => {
  const [isHovered, setIsHovered] = useState(false);
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);

  const handleFollow = async () => {
    try {
      const res = await axios.put(`${BASE_URL}/users/follow/${currentUser._id}`, {
        userId: user._id
      });
      console.log(res.data);
      dispatch(addToFollowings(user?._id));
      setIsUserFollowed((prev) => !prev);
    } catch (err) {
      console.log(err);
    };
  };

  const [isUserFollowed, setIsUserFollowed] = useState(currentUser?.followings?.includes(user?._id));

  return (
    <div className="usersItem">
      <div className="usersItemLeft">
        <img
          src={user?.profilePicture ? user.profilePicture : noAvatar}
          alt="user profile"
          className="usersImg"
        />
        <div>
          <Link to={`/profile/${user?._id}`} className="link">
            <h4
              style={{ position: "relative" }}
              className="usersName"
              onMouseOver={() => setIsHovered(true)}
              onMouseOut={() => setIsHovered(false)}
            >
              {user?.name}
              {isHovered && (
                <div
                  style={{ top: "18px" }}
                  className="postTopHoverMenu"
                >
                  <PostHover user={user} />
                </div>
              )}
            </h4>
          </Link>
          <span className="usersTags">
            @{user?.username}
          </span>
          <p className="usersDesc">
            {user.about ? user.about : <span className="postTopHoverMenuUserTags">User didn't add an about section.</span>}
          </p>
        </div>
      </div>
      <div className="usersItemRight">
        {isUserFollowed ? (
          <button
            className="topicFeedTopicItemButton"
            onClick={handleFollow}
          >
            <span className="topicFeedTopicItemSpan">Following</span>
          </button>
        ) : (
          <button
            className="rightbarFollowButton"
            onClick={handleFollow}
          >
            Follow
          </button>
        )}
      </div>
    </div>
  )
}

export default UsersItem