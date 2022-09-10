import { BiComment } from "react-icons/bi";
import { AiOutlineHeart, AiOutlineSync, AiFillHeart, AiOutlineUpload } from "react-icons/ai";
import { TbArrowBigDown } from "react-icons/tb";
import { FiMoreHorizontal } from "react-icons/fi";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import moment from "moment";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "./comment.css";
import CommentOpenMore from "./CommentOpenMore";
import { BASE_URL } from "../../baseUrl";
import noAvatar from "../../assets/noAvatar.webp";
import { addToLikedComments } from "../../redux/userReducer";
import PostOpenMedia from "../post/PostOpenMedia";

const Comment = ({ comment, currentPost, setComments }) => {
  const [postCreator, setPostCreator] = useState(null);
  const [commentLike, setCommentLike] = useState(comment?.likes?.length);
  const [isCommentLiked, setIsCommentLiked] = useState(false);
  const [openMore, setOpenMore] = useState(false);
  const [openMedia, setOpenMedia] = useState(false);
  const [commentCreator, setCommentCreator] = useState(null);
  const dispatch = useDispatch();

  const { currentUser } = useSelector((state) => state.user);

  //get post creator
  useEffect(() => {
    if (currentPost) {
      const getPostCreator = async () => {
        try {
          const res = await axios.get(`${BASE_URL}/users/${currentPost.userId}`);
          setPostCreator(res.data);
        } catch (err) {
          console.log(err);
        };
      };
      getPostCreator();
    };
  }, [currentPost]);

  //get comment creator
  useEffect(() => {
    if (comment) {
      const getCommentCreator = async () => {
        try {
          const res = await axios.get(`${BASE_URL}/users/${comment.userId}`);
          setCommentCreator(res.data);
        } catch (err) {
          console.log(err);
        }
      };
      getCommentCreator();
    };
  }, [comment]);

  //check if comment is liked
  useEffect(() => {
    setIsCommentLiked(comment?.likes?.includes(currentUser._id));
  }, [currentUser._id, comment?.likes]);

  //like a comment
  const handleLikeComment = async () => {
    try {
      await axios.put(`${BASE_URL}/users/like/comment/${comment._id}`, {
        userId: currentUser._id
      });
      setCommentLike(isCommentLiked ? commentLike - 1 : commentLike + 1);
      setIsCommentLiked(!isCommentLiked);
      dispatch(addToLikedComments(comment._id));
    } catch (err) {
      console.log(err);
    };
  };

  return (
    <div className="comment">
      <div className="commentTop">
        <Link to={`/profile/${commentCreator?._id}`} className="link">
          <img
            src={commentCreator?.profilePicture ? commentCreator.profilePicture : noAvatar}
            alt="comment creator profile"
            className="commentProfileImg"
          />
        </Link>
        <div>
          <div className="commentUserInfo">
            <Link to={`/profile/${commentCreator?._id}`} className="link">
              <div className="commentUserInfoName">
                {commentCreator?.name}
              </div>
            </Link>
            <div className="commentUserInfoTags">
              @{commentCreator?.username}
            </div>
            <div className="commentUserInfoPosted">
              {moment(comment?.createdAt).fromNow()}
            </div>
          </div>
          <div className="commentReplayingTo">
            Replaying to <Link to={`/profile/${postCreator?._id}`} className="link"><span className="tagsSpan">@{postCreator?.username}</span></Link>
          </div>
        </div>
        <FiMoreHorizontal
          className="commentMoreIcon"
          onClick={() => setOpenMore((prev) => !prev)}
        />
        {
          openMore && (
            <CommentOpenMore
              setComments={setComments}
              commentId={comment?._id}
              commentCreator={commentCreator}
              setOpenMore={setOpenMore}
            />
          )
        }
      </div>
      <Link to={`/comment/${comment?._id}`} className="link">
        <div className="commentText">
          {comment?.text}
        </div>
      </Link>
      <Link to={`/comment/${comment?._id}`} className="link">
        <div className="commentMediaContainer">
          {comment?.image && (
            <img
              src={comment?.image}
              alt="comment"
              className="commentMediaImage"
              onClick={(e) => {
                e.preventDefault();
                setOpenMedia(true);
              }}
            />
          )}
          {comment?.video && (
            <video
              src={comment?.video}
              controls
              muted
              autoPlay
              loop
              className="commentMediaVideo"
            />
          )}
        </div>
        <div className="commentIconsContainer">
          <div className="commentIconContainer">
            <BiComment className="commentIcon" />
            <p className="commentIconCount">0</p>
          </div>
          <div className="commentIconContainer">
            <AiOutlineSync className="commentIcon" />
            <p className="commentIconCount">
              {comment?.shares?.length}
            </p>
          </div>
          <div
            className="commentIconContainer"
            onClick={(e) => {
              e.preventDefault();
              handleLikeComment();
            }}
          >
            {isCommentLiked ? (
              <AiFillHeart className="commentIcon" style={{ color: "red" }} />
            ) : (
              <AiOutlineHeart className="commentIcon" />
            )}
            <p className="commentIconCount">
              {commentLike}
            </p>
          </div>
          <div className="commentIconContainer">
            <TbArrowBigDown className="commentIcon" />
          </div>
          <div className="commentIconContainer">
            <AiOutlineUpload className="commentIcon" />
          </div>
        </div>
      </Link>
      {
        openMedia && (
          <PostOpenMedia
            openMedia={openMedia}
            setOpenMedia={setOpenMedia}
            images={comment?.image}
            type="single"
          />
        )
      }
    </div>
  )
}

export default Comment