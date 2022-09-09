import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import { AiOutlineHeart, AiOutlineSync, AiFillHeart, AiOutlineUpload } from "react-icons/ai";
import { BiComment } from "react-icons/bi";
import { FiMoreHorizontal } from "react-icons/fi";
import { useDispatch } from "react-redux";

import { BASE_URL } from "../../baseUrl";
import noAvatar from "../../assets/noAvatar.webp";
import PostOpenComment from "../post/PostOpenComment";
import PostOpenMore from "../post/PostOpenMore";
import PostOpenShare from "../post/PostOpenShare";
import PostOpenRetweet from "../post/PostOpenRetweet";
import PostOpenMedia from "../post/PostOpenMedia";
import { addToLikedPosts } from "../../redux/userReducer";
import PostHover from "../post/PostHover";
import CommentOpenMore from "../comment/CommentOpenMore";
import Users from "../users/Users";

const SingleComment = ({ comment, currentUser }) => {
  const [commentedPost, setCommentedPost] = useState(null);
  const [commentCreator, setCommentCreator] = useState(null);
  const [postCreator, setPostCreator] = useState(null);
  const [openMore, setOpenMore] = useState(false);
  const [openComment, setOpenComment] = useState(false);
  const [openShare, setOpenShare] = useState(false);
  const [openRetweet, setOpenRetweet] = useState(false);
  const [openMedia, setOpenMedia] = useState(false);
  const [slideNumber, setSlideNumber] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [commentCount, setCommentCount] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [openMoreComment, setOpenMoreComment] = useState(false);
  const [openCommentMedia, setOpenCommentMedia] = useState(false);
  const [openCommentRetweets, setOpenCommentRetweets] = useState(false);
  const [openCommentLikes, setOpenCommentLikes] = useState(false);
  const dispatch = useDispatch();

  const handleOpen = (type) => {
    if (type === "more") {
      setOpenComment(false);
      setOpenShare(false);
      setOpenRetweet(false);
      setOpenMore((prev) => !prev);
    } else if (type === "comment") {
      setOpenShare(false);
      setOpenMore(false);
      setOpenRetweet(false);
      setOpenComment((prev) => !prev);
    } else if (type === "share") {
      setOpenMore(false);
      setOpenComment(false);
      setOpenRetweet(false);
      setOpenShare((prev) => !prev);
    } else if (type === "retweet") {
      setOpenMore(false);
      setOpenComment(false);
      setOpenShare(false);
      setOpenRetweet((prev) => !prev);
    }
  };

  //get user who commented
  useEffect(() => {
    if (comment) {
      const getCommentCreator = async () => {
        try {
          const res = await axios.get(`${BASE_URL}/users/${comment.userId}`);
          setCommentCreator(res.data);
        } catch (err) {
          console.log(err);
        };
      };
      getCommentCreator();
    };
  }, [comment]);

  //get post that was commented
  useEffect(() => {
    const getPostThatWasCommented = async () => {
      if (comment) {
        try {
          const res = await axios.get(`${BASE_URL}/posts/find/${comment.postId}`);
          setCommentedPost(res.data);
          setCommentCount(res.data.commentsCount);
        } catch (err) {
          console.log(err);
        };
      };
    };
    getPostThatWasCommented();
  }, [comment]);

  //get post creator
  useEffect(() => {
    if (commentedPost) {
      const getPostCreator = async () => {
        try {
          const res = await axios.get(`${BASE_URL}/users/${commentedPost.userId}`);
          setPostCreator(res.data);
        } catch (err) {
          console.log(err);
        };
      };
      getPostCreator();
    };
  }, [commentedPost]);

  let like = commentedPost?.likes.length

  //check if current user has already liked a post
  useEffect(() => {
    setIsLiked(commentedPost?.likes?.includes(currentUser._id));
  }, [currentUser._id, commentedPost?.likes]);

  //like a post
  const handleLike = async () => {
    try {
      await axios.put(`${BASE_URL}/users/like/${commentedPost._id}`, {
        userId: currentUser._id
      });
      // setLike(isLiked ? like - 1 : like + 1);
      like = isLiked ? (like - 1) : (like + 1);
      setIsLiked(!isLiked);
      dispatch(addToLikedPosts(commentedPost._id));
    } catch (err) {
      console.log(err);
    };
  };

  return (
    <>
      <div className="singleCommentPost">
        <div className="singlePostFeedLeft">
          <img
            src={postCreator?.profilePicture ? postCreator.profilePicture : noAvatar}
            alt="user profile"
            className="singleCommentFeedImg"
          />
          <div className="singlePostFeedLine" />
        </div>
        <div className="singlePostFeedRight">
          <div className="singleCommentFeedTop">
            <div className="singlePostFeedUser">
              <h4
                className="singleCommentFeedName"
                onMouseOver={() => setIsHovered(true)}
                onMouseOut={() => setIsHovered(false)}
              >
                <Link to={`/profile/${postCreator?._id}`} className="link">
                  {postCreator?.username}
                </Link>
                {isHovered && (
                  <div className="postTopHoverMenu">
                    <PostHover user={postCreator} />
                  </div>
                )}
              </h4>
              <div className="singleCommentFeedSmall">
                @{postCreator?.username}
              </div>
              <span className="singleCommentFeedSmall">
                {moment(commentedPost?.createdAt).fromNow()}
              </span>
            </div>
            <FiMoreHorizontal
              className="postTopIcon"
              onClick={() => handleOpen(("more"))}
            />
          </div>
          <Link to={`/post/${commentedPost?._id}`} className="link">
            <p className="singleCommentFeedPostDesc">
              {commentedPost?.desc}
            </p>
          </Link>
          <div className="singleCommentFeedMedia">
            <div className={`postContentImagesContainer${commentedPost?.images?.length}`}>
              {commentedPost?.images?.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt="post content"
                  className={`postContentImg postContentImg${index}`}
                  onClick={(e) => {
                    e.preventDefault();
                    setSlideNumber(index);
                    setOpenMedia(true);
                  }}
                />
              ))}
            </div>
            {commentedPost?.video && (
              <video
                src={commentedPost.video}
                controls
                // ref={videoRef}
                muted
                className="postContentVideo"
              />
            )}
          </div>
          <div className="singleCommentPostBottom">
            <div
              className="postBottomItem"
              onClick={(e) => {
                e.preventDefault();
                handleOpen(("comment"))
              }}
            >
              <BiComment className="postBottomIcon" />
              <p className="postBottomItemCount">
                {commentCount}
              </p>
            </div>
            <div
              className="postBottomItem"
              onClick={(e) => {
                e.preventDefault();
                handleOpen(("retweet"))
              }}
            >
              <AiOutlineSync className="postBottomIcon share" />
              <p className="postBottomItemCount">
                {commentedPost?.shares?.length}
              </p>
            </div>
            <div
              className="postBottomItem"
              onClick={(e) => {
                e.preventDefault();
                handleLike();
              }}
            >
              {isLiked ? (
                <AiFillHeart className="postBottomIcon like" style={{ color: "red" }} />
              ) : (
                <AiOutlineHeart className="postBottomIcon like" />
              )}
              <p className="postBottomItemCount">
                {like}
              </p>
            </div>
            <div
              className="postBottomItem"
              onClick={(e) => {
                e.preventDefault();
                handleOpen(("share"));
              }}
            >
              <AiOutlineUpload className="postBottomIcon" />
            </div>
          </div>
        </div>
        {
          openComment && (
            <PostOpenComment
              post={commentedPost}
              user={postCreator}
              setOpenComment={setOpenComment}
              setCommentCount={setCommentCount}
            />
          )
        }
        {
          openMore && (
            <PostOpenMore
              // setPosts={setPosts}
              setOpenMore={setOpenMore}
              user={postCreator}
              userId={postCreator.userId}
              postId={commentedPost._id}
            />
          )
        }
        {
          openShare && (
            <PostOpenShare setOpenShare={setOpenShare} />
          )
        }
        {
          openRetweet && (
            <PostOpenRetweet setOpenRetweet={setOpenRetweet} />
          )
        }
        {
          openMedia && (
            <PostOpenMedia
              openMedia={openMedia}
              setOpenMedia={setOpenMedia}
              images={commentedPost?.images}
              slideNumber={slideNumber}
              setSlideNumber={setSlideNumber}
            />
          )
        }
      </div>
      <div className="singleCommentComment">
        <div className="singlePostFeedLeftComment">
          <img
            src={commentCreator?.profilePicture ? commentCreator.profilePicture : noAvatar}
            alt="user profile"
            className="singleCommentFeedImg"
          />
          <div>
            <h4 className="singleCommentFeedName">
              {commentCreator?.username}
            </h4>
            <div className="singleCommentFeedSmall">
              @{commentCreator?.username}
            </div>
          </div>
          <div className="singleCommentFeedTop">
            <FiMoreHorizontal
              style={{ marginRight: "10px" }}
              className="commentMoreIcon"
              onClick={() => setOpenMoreComment((prev) => !prev)}
            />
            {
              openMoreComment && (
                <CommentOpenMore setOpenMore={setOpenMoreComment} />
              )
            }
          </div>
        </div>
        <div className="singleCommentFeedTexts">
          <div className="commentReplayingTo">
            Replaying to <Link to={`/profile/${postCreator?._id}`} className="link"><span className="tagsSpan">@{postCreator?.username}</span></Link>
          </div>
          <div className="singleCommentFeedCommentText">
            {comment?.text}
          </div>
        </div>
        <div className="singleCommentFeedMediaContainer">
          {comment?.image && (
            <img
              src={comment?.image}
              alt="comment"
              className="commentMediaImage"
              onClick={(e) => {
                e.preventDefault();
                setOpenCommentMedia(true);
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
          <p className="postTopPosted" style={{ margin: "15px 0" }}>
            {moment(comment?.createdAt).format("LLL")}
          </p>
          <div className="singlePagePostRetweetsLikesContainer">
            <div className="singlePagePostRetweetsLikes">
              <div
                className="singlePagePostShares"
                onClick={() => setOpenCommentRetweets(true)}
              >
                <span className="singlePagePostCount">{comment?.shares?.length}{" "}</span>Retweets
              </div>
              <div
                className="singlePagePostLikes"
                onClick={() => setOpenCommentLikes(true)}
              >
                <span className="singlePagePostCount">{comment?.likes?.length}{" "}</span>Likes
              </div>
            </div>
          </div>
        </div>
        {
          openCommentMedia && (
            <PostOpenMedia
              openMedia={openCommentMedia}
              setOpenMedia={setOpenCommentMedia}
              images={comment?.image}
              type="single"
            />
          )
        }
        {
          openCommentRetweets && (
            <Users
              setOpenRetweets={setOpenCommentRetweets}
              type="retweeted"
            />
          )
        }
        {
          openCommentLikes && (
            <Users
              type="liked"
              currentUser={currentUser}
              commentId={comment?._id}
              setOpenLikes={setOpenCommentLikes}
            />
          )
        }
      </div>
    </>
  )
}

export default SingleComment