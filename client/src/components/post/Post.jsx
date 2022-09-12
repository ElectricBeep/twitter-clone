import { FiMoreHorizontal } from "react-icons/fi";
import { BiComment } from "react-icons/bi";
import { AiOutlineHeart, AiOutlineSync, AiFillHeart, AiOutlineUpload } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import moment from "moment";
import { useState } from "react";

import "./post.css";
import PostOpenComment from "./PostOpenComment";
import PostOpenMore from "./PostOpenMore";
import PostOpenShare from "./PostOpenShare";
import PostHover from "./PostHover";
import noAvatar from "../../assets/noAvatar.webp";
import { BASE_URL } from "../../baseUrl";
import { addToLikedPosts, addToSharedPosts } from "../../redux/userReducer";
import PostOpenRetweet from "./PostOpenRetweet";
import PostOpenMedia from "./PostOpenMedia";

const Post = ({ post, setPosts }) => {
  const [openMore, setOpenMore] = useState(false);
  const [openComment, setOpenComment] = useState(false);
  const [openShare, setOpenShare] = useState(false);
  const [openRetweet, setOpenRetweet] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [user, setUser] = useState(null);
  const [like, setLike] = useState(post?.likes?.length);
  const [isLiked, setIsLiked] = useState(false);
  const [share, setShare] = useState(post?.shares?.length);
  const [isShared, setIsShared] = useState(false);
  const [openMedia, setOpenMedia] = useState(false);
  const [slideNumber, setSlideNumber] = useState(0);
  const [commentCount, setCommentCount] = useState(post?.commentsCount);
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const videoRef = useRef(null);

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

  //get a post creator
  useEffect(() => {
    if (post) {
      const getUser = async () => {
        const res = await axios.get(`${BASE_URL}/users/${post?.userId}`);
        setUser(res.data);
      };
      getUser();
    };
  }, [post]);

  //check if current user has already liked a post
  useEffect(() => {
    setIsLiked(post?.likes?.includes(currentUser._id));
  }, [currentUser._id, post?.likes]);

  //check if current user has already shared a post
  useEffect(() => {
    setIsShared(post?.shares?.includes(currentUser._id));
  }, [currentUser._id, post?.shares]);

  //like a post
  const handleLike = async (postId) => {
    try {
      await axios.put(`${BASE_URL}/users/like/${postId}`, {
        userId: currentUser._id
      });
      setLike(isLiked ? like - 1 : like + 1);
      setIsLiked(!isLiked);
      dispatch(addToLikedPosts(postId));
    } catch (err) {
      console.log(err);
    };
  };

  //share a post
  const handleShare = async (postId) => {
    try {
      await axios.put(`${BASE_URL}/users/share/${postId}`, {
        userId: currentUser._id
      });
      dispatch(addToSharedPosts(postId));
      setShare(isShared ? share - 1 : share + 1);
      setIsShared(!isShared);
      setOpenRetweet(false);
    } catch (err) {
      console.log(err);
    };
  };

  //to play/pause video
  useEffect(() => {
    if (post?.video) {
      let options = {
        rootMargin: "0px",
        threshold: [0.25, 0.75]
      };

      let handlePlay = (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            videoRef.current.play();
          } else {
            videoRef?.current?.pause();
          }
        });
      };

      let observer = new IntersectionObserver(handlePlay, options);

      observer.observe(videoRef.current);
    };
  });

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`/profile/${user?._id}`} className="link">
              <img
                src={user?.profilePicture ? user.profilePicture : noAvatar}
                alt="user profile"
                className="postProfileImg"
              />
            </Link>
          </div>
          <div className="postTopRight">
            <div className="postTopUserInfo">
              <div
                className="postTopUserName"
                onMouseOver={() => setIsHovered(true)}
                onMouseOut={() => setIsHovered(false)}
              >
                <Link to={`/profile/${user?._id}`} className="link">
                  {user?.username}
                </Link>
                {isHovered && (
                  <div className="postTopHoverMenu">
                    <PostHover user={user} />
                  </div>
                )}
              </div>
              <p className="postTopUserTags">
                @{user?.username}
              </p>
              <p className="postTopPosted">
                {moment(post?.createdAt).fromNow()}
              </p>
            </div>
            <Link to={`/post/${post?._id}`} className="link">
              <div className="postDescription">
                {post?.desc}
              </div>
            </Link>
          </div>
          <div>
            <FiMoreHorizontal
              className="postTopIcon"
              onClick={() => handleOpen(("more"))}
            />
          </div>
        </div>
        <Link to={`/post/${post?._id}`} className="link">
          <div>
            <div className="postContent">
              <div className={`postContentImagesContainer${post?.images?.length}`}>
                {post?.images?.map((image, index) => (
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
              {post?.video && (
                <video
                  src={post.video}
                  controls
                  ref={videoRef}
                  muted
                  className="postContentVideo"
                />
              )}
            </div>
          </div>
          <div className="postBottom">
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
              {isShared ? (
                <>
                  <AiOutlineSync
                    style={{ color: "green" }}
                    className="postBottomIcon share"
                  />
                  <p
                    style={{ color: "green" }}
                    className="postBottomItemCount"
                  >
                    {share}
                  </p>
                </>
              ) : (
                <>
                  <AiOutlineSync className="postBottomIcon share" />
                  <p className="postBottomItemCount">
                    {share}
                  </p>
                </>
              )}
            </div>
            <div
              className="postBottomItem"
              onClick={(e) => {
                e.preventDefault();
                handleLike(post._id);
              }}
            >
              {isLiked ? (
                <>
                  <AiFillHeart
                    className="postBottomIcon like"
                    style={{ color: "red" }}
                  />
                  <p
                    className="postBottomItemCount"
                    style={{ color: "red" }}
                  >
                    {like}
                  </p>
                </>
              ) : (
                <>
                  <AiOutlineHeart className="postBottomIcon like" />
                  <p className="postBottomItemCount">
                    {like}
                  </p>
                </>
              )}
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
        </Link>
      </div>
      {
        openComment && (
          <PostOpenComment
            post={post}
            user={user}
            setOpenComment={setOpenComment}
            setCommentCount={setCommentCount}
          />
        )
      }
      {
        openMore && (
          <PostOpenMore
            setPosts={setPosts}
            setOpenMore={setOpenMore}
            user={user}
            userId={post.userId}
            postId={post._id}
          />
        )
      }
      {
        openShare && (
          <PostOpenShare
            setOpenShare={setOpenShare}
            postId={post?._id}
            currentUser={currentUser}
          />
        )
      }
      {
        openRetweet && (
          <PostOpenRetweet
            setOpenRetweet={setOpenRetweet}
            handleShare={handleShare}
            postId={post?._id}
            currentUser={currentUser}
            isShared={isShared}
          />
        )
      }
      {
        openMedia && (
          <PostOpenMedia
            openMedia={openMedia}
            setOpenMedia={setOpenMedia}
            images={post?.images}
            slideNumber={slideNumber}
            setSlideNumber={setSlideNumber}
          />
        )
      }
    </div >
  )
}

export default Post