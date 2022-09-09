import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import noAvatar from "../../assets/noAvatar.webp";
import { BASE_URL } from "../../baseUrl";
import { addToFollowings } from "../../redux/userReducer";

const PostHover = ({ user }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [isUserFollowed, setIsUserFollowed] = useState(currentUser?.followings?.includes(user._id));
  const dispatch = useDispatch();

  const handleFollow = async () => {
    try {
      const res = await axios.put(`${BASE_URL}/users/follow/${currentUser._id}`, {
        userId: user._id
      });
      console.log(res.data);
      dispatch(addToFollowings(user._id));
      setIsUserFollowed((prev) => !prev);
    } catch (err) {
      console.log(err);
    };
  };

  return (
    <div className="postTopHoverMenuWrapper">
      <div className="postTopHoverMenuTop">
        <Link to={`/profile/${user._id}`} className="link">
          <img
            src={user.profilePicture ? user.profilePicture : noAvatar}
            alt=""
            className="postTopHoverMenuTopImg"
          />
        </Link>
        {user._id !== currentUser._id && (
          <>
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
          </>
        )}
      </div>
      <Link to={`/profile/${user._id}`} className="link">
        <div className="postTopHoverMenuUserName">{user.username}</div>
      </Link>
      <div className="postTopHoverMenuUserTags">@{user.username}</div>
      <div className="postTopHoverMenuUserDesc">
        {user.about ? user.about : <span className="postTopHoverMenuUserTags">User didn't add about an section.</span>}
      </div>
      <div className="postTopHoverMenuFollowContainer">
        <div className="postTopHoverMenuFollowing">
          <span style={{ color: "black" }}><b>{user.followings.length}</b></span> Following
        </div>
        <div className="postTopHoverMenuFollowing">
          <span style={{ color: "black" }}><b>{user.followers.length}</b></span> Followers
        </div>
      </div>
    </div>
  )
}

export default PostHover