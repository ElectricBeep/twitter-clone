import { BsEnvelope } from "react-icons/bs";
import { BiBookmarkPlus, BiLink } from "react-icons/bi";
import { RiShareBoxLine } from "react-icons/ri";
import { AiOutlineClose } from "react-icons/ai";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

import { BASE_URL } from "../../baseUrl";
import { addToBookmarks } from "../../redux/userReducer";

const PostOpenShare = ({ setOpenShare, postId, currentUser }) => {
  const [isPostBookmarked, setIsPostBookmarked] = useState(currentUser?.bookmarkedPosts?.includes(postId));
  const dispatch = useDispatch();

  const handleBookmark = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`${BASE_URL}/users/bookmark/${postId}`, {
        userId: currentUser._id
      });
      dispatch(addToBookmarks(postId));
      setIsPostBookmarked((prev) => !prev);
      toast.success(res.data, {
        style: {
          backgroundColor: "#1da1f2",
          color: "white",
        },
      });
      console.log(res.data);
    } catch (err) {
      console.log(err);
    };
  };

  const handleCopyLink = async () => {
    if (window.location.href === "http://localhost:3000/") {
      navigator.clipboard.writeText(window.location.href + `post/${postId}`);
    } else {
      navigator.clipboard.writeText(window.location.href);
    };
    toast.success("Copied to clipboard", {
      style: {
        backgroundColor: "#1da1f2",
        color: "white",
      },
    });
  };

  return (
    <div className="postOpenShare">
      <div
        className="postOpenShareItem"
        onClick={handleBookmark}
      >
        <BiBookmarkPlus className="postOpenShareIcon" />
        <p>
          {isPostBookmarked === true ? "Remove from Bookmarks" : "Bookmark"}
        </p>
      </div>
      <div className="postOpenShareItem">
        <BsEnvelope className="postOpenShareIcon" />
        <p>Send via Direct Message</p>
      </div>
      <div
        className="postOpenShareItem"
        onClick={handleCopyLink}
      >
        <BiLink className="postOpenShareIcon" />
        <p>Copy link to Tweet</p>
      </div>
      <div className="postOpenShareItem">
        <RiShareBoxLine className="postOpenShareIcon" />
        <p>Share Tweet via ...</p>
      </div>
      <AiOutlineClose
        className="postOpenCommentCloseIcon"
        onClick={() => setOpenShare(false)}
      />
    </div>
  )
}

export default PostOpenShare