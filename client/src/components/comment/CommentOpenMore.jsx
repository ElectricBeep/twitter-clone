import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { AiOutlineUserAdd, AiOutlineClose } from "react-icons/ai";
import { VscMute } from "react-icons/vsc";
import { BiBlock } from "react-icons/bi";
import { BsFlag, BsPin, BsTrash } from "react-icons/bs";
import axios from "axios";
import toast from "react-hot-toast";

import { addToFollowings } from "../../redux/userReducer";
import { BASE_URL } from "../../baseUrl";
import { RiFileListLine } from "react-icons/ri";
import { ImEmbed2 } from "react-icons/im";
import { FiBarChart2 } from "react-icons/fi";

const CommentOpenMore = ({ setOpenMore, commentCreator, commentId, setComments }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [isUserFollowed, setIsUserFollowed] = useState(currentUser?.followings?.includes(commentCreator?._id));
  const dispatch = useDispatch();

  const handleFollow = async () => {
    try {
      const res = await axios.put(`${BASE_URL}/users/follow/${currentUser._id}`, {
        userId: commentCreator._id
      });
      console.log(res.data);
      dispatch(addToFollowings(commentCreator._id));
      setIsUserFollowed((prev) => !prev);
      toast.success(res.data + `@${commentCreator.username}`, {
        style: {
          backgroundColor: "#1da1f2",
          color: "white",
        },
      });
    } catch (err) {
      console.log(err);
    };
  };

  const handleDeleteComment = async (e) => {
    e.preventDefault();
    if (commentCreator?._id === currentUser._id) {
      try {
        const res = await axios.delete(`${BASE_URL}/comments/${commentId}`);
        setComments((prev) => prev.filter((comment) => comment._id !== commentId));
        toast.success(res.data, {
          style: {
            backgroundColor: "#1da1f2",
            color: "white",
          },
        });
      } catch (err) {
        console.log(err);
      };
    };
  };

  return (
    <div className="commentOpenMore">
      {commentCreator?._id !== currentUser._id ? (
        <>
          <div
            className="commentOpenMoreItem"
            onClick={handleFollow}
          >
            <AiOutlineUserAdd className="commentOpenMoreIcon" />
            <p>
              {isUserFollowed ? `Unfollow @${commentCreator?.username}` : `Follow @${commentCreator?.username}`}
            </p>
          </div>
          <div className="commentOpenMoreItem">
            <VscMute className="commentOpenMoreIcon" />
            <p>Mute @alice_hopkins</p>
          </div>
          <div className="commentOpenMoreItem">
            <BiBlock className="commentOpenMoreIcon" />
            <p>Block @alice_hopkins</p>
          </div>
          <div className="commentOpenMoreItem">
            <BsFlag className="commentOpenMoreIcon" />
            <p>Report Tweet</p>
          </div>
        </>
      ) : (
        <>
          <div
            className="commentOpenMoreItem"
            style={{ color: "red" }}
            onClick={(e) => handleDeleteComment(e, commentId)}
          >
            <BsTrash className="commentOpenMoreIcon" />
            <p>Delete</p>
          </div>
          <div className="commentOpenMoreItem">
            <BsPin className="commentOpenMoreIcon" />
            <p>Pin to your profile</p>
          </div>
          <div className="commentOpenMoreItem">
            <RiFileListLine className="commentOpenMoreIcon" />
            <p>Add/remove @{currentUser.username} from Lists</p>
          </div>
          <div className="commentOpenMoreItem">
            <ImEmbed2 className="commentOpenMoreIcon" />
            <p>Embed Tweet</p>
          </div>
          <div className="commentOpenMoreItem">
            <FiBarChart2 className="commentOpenMoreIcon" />
            <p>View Tweet analitycs</p>
          </div>
        </>
      )}
      <AiOutlineClose
        className="commentOpenCommentCloseIcon"
        onClick={() => setOpenMore(false)}
      />
    </div>
  )
}

export default CommentOpenMore