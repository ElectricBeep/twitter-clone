import { TbMoodSad } from "react-icons/tb";
import { AiOutlineUserAdd, AiOutlineClose } from "react-icons/ai";
import { RiFileListLine } from "react-icons/ri";
import { VscMute } from "react-icons/vsc";
import { BiBlock } from "react-icons/bi";
import { BsFlag, BsTrash, BsChat, BsPin } from "react-icons/bs";
import { ImEmbed2 } from "react-icons/im";
import { FiBarChart2 } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import toast from 'react-hot-toast';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { BASE_URL } from "../../baseUrl";
import { addToFollowings } from "../../redux/userReducer";

const PostOpenMore = ({ setPosts, setOpenMore, user, userId, postId }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [isUserFollowed, setIsUserFollowed] = useState(currentUser?.followings?.includes(user?._id));
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDeletePost = async (e) => {
    e.preventDefault();
    if (currentUser._id === userId) {
      try {
        await axios.delete(`${BASE_URL}/posts/${postId}`);
        if (setPosts) {
          setPosts((prev) => prev.filter((post) => post._id !== postId));
        };
        toast.success("Your tweet has been deleted!", {
          style: {
            backgroundColor: "#1da1f2",
            color: "white",
          },
        });
        navigate("/");
      } catch (err) {
        console.log(err);
      };
    };
  };

  const handleFollow = async () => {
    try {
      const res = await axios.put(`${BASE_URL}/users/follow/${currentUser._id}`, {
        userId: user._id
      });
      console.log(res.data);
      dispatch(addToFollowings(user._id));
      setIsUserFollowed((prev) => !prev);
      toast.success(res.data + `@${user.username}`, {
        style: {
          backgroundColor: "#1da1f2",
          color: "white",
        },
      });
    } catch (err) {
      console.log(err);
    };
  };

  return (
    <div className="postOpenMore">
      {user._id !== currentUser._id ? (
        <>
          <div
            className="postOpenMoreItem"
            onClick={handleFollow}
          >
            <AiOutlineUserAdd className="postOpenMoreIcon" />
            <p>
              {isUserFollowed ? `Unfollow @${user?.username}` : `Follow @${user?.username}`}
            </p>
          </div>
          <div className="postOpenMoreItem">
            <TbMoodSad className="postOpenMoreIcon" />
            <p>Not interested in this Tweet</p>
          </div>
          <div className="postOpenMoreItem">
            <VscMute className="postOpenMoreIcon" />
            <p>Mute @{user?.username}</p>
          </div>
          <div className="postOpenMoreItem">
            <BiBlock className="postOpenMoreIcon" />
            <p>Block @{user?.username}</p>
          </div>
          <div className="postOpenMoreItem">
            <ImEmbed2 className="postOpenMoreIcon" />
            <p>Embed Tweet</p>
          </div>
          <div className="postOpenMoreItem">
            <BsFlag className="postOpenMoreIcon" />
            <p>Report Tweet</p>
          </div>
        </>
      ) : (
        <>
          <div
            className="postOpenMoreItem" style={{ color: "red" }}
            onClick={(e) => handleDeletePost(e, postId)}
          >
            <BsTrash className="postOpenMoreIcon" />
            <p>Delete</p>
          </div>
          <div className="postOpenMoreItem">
            <BsPin className="postOpenMoreIcon" />
            <p>Pin to your profile</p>
          </div>
          <div className="postOpenMoreItem">
            <RiFileListLine className="postOpenMoreIcon" />
            <p>Add/remove @{currentUser.username} from Lists</p>
          </div>
          <div className="postOpenMoreItem">
            <BsChat className="postOpenMoreIcon" />
            <p>Change who can reply</p>
          </div>
          <div className="postOpenMoreItem">
            <ImEmbed2 className="postOpenMoreIcon" />
            <p>Embed Tweet</p>
          </div>
          <div className="postOpenMoreItem">
            <FiBarChart2 className="postOpenMoreIcon" />
            <p>View Tweet analztics</p>
          </div>
        </>
      )}
      <AiOutlineClose
        className="postOpenCommentCloseIcon"
        onClick={() => setOpenMore(false)}
      />
    </div>
  )
}

export default PostOpenMore