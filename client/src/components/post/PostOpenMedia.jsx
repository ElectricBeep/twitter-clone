import { AiOutlineClose } from "react-icons/ai";
import { useSelector } from "react-redux";
import { BsArrowRightShort, BsArrowLeftShort } from "react-icons/bs";
import { TbArrowsLeft, TbArrowsRight } from "react-icons/tb";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

import SinglePagePost from "../singlePagePost/SinglePagePost";
import CommentInput from "../commentInput/CommentInput";
import Comments from "../comments/Comments";
import { BASE_URL } from "../../baseUrl";

const PostOpenMedia = ({ openMedia, setOpenMedia, images, slideNumber, setSlideNumber, type, post, postCreator }) => {
  const [comments, setComments] = useState([]);
  const [isCommenting, setIsCommenting] = useState(false);
  const [isCommentSectionOpen, setIsCommentSectionOpen] = useState(false);

  //get comments
  useEffect(() => {
    if (post) {
      const getComments = async () => {
        try {
          const res = await axios.get(`${BASE_URL}/comments/${post._id}`);
          setComments(res.data);
        } catch (err) {
          console.log(err);
        };
      };
      getComments();
    };
  }, [post]);

  const handleMove = (direction) => {
    if (direction === "left") {
      setSlideNumber(slideNumber - 1);
    } else if (direction === "right") {
      setSlideNumber(slideNumber + 1);
    }
  };

  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className="postOpenMedia">
      <div className="postOpenMediaLeft">
        {slideNumber > 0 && (
          <BsArrowLeftShort
            className="postOpenMediaArrowLeft"
            onClick={() => handleMove("left")}
          />
        )}
        <div className="postOpenMediaContentWrapper">
          {type === "single" ? (
            <img
              src={images}
              alt="post"
              className="postOpenMediaImage"
            />
          ) : (
            <img
              src={images[slideNumber]}
              alt="post"
              className="postOpenMediaImage"
            />
          )}
        </div>
        {slideNumber < images.length - 1 && (
          <BsArrowRightShort
            className="postOpenMediaArrowRight"
            onClick={() => handleMove("right")}
          />
        )}
        <AiOutlineClose
          onClick={() => setOpenMedia(!openMedia)}
          className="postOpenMediaCloseButton"
        />
        {isCommentSectionOpen ? (
          <TbArrowsRight
            className="postOpenMediaCommentsIconRight"
            onClick={() => setIsCommentSectionOpen((prev) => !prev)}
          />
        ) : (
          <TbArrowsLeft
            className="postOpenMediaCommentsIconLeft"
            onClick={() => setIsCommentSectionOpen((prev) => !prev)}
          />
        )}
      </div>
      {isCommentSectionOpen && (
        <div className="postOpenMediaComments">
          <SinglePagePost
            type="commentSection"
            currentPost={post}
            currentUser={currentUser}
            postCreator={postCreator}
          />
          <CommentInput
            isCommenting={isCommenting}
            setIsCommenting={setIsCommenting}
            postCreator={postCreator}
            currentPost={post}
            currentUser={currentUser}
            setComments={setComments}
          />
          <div className="singlePostCommentsContainer">
            <Comments
              currentPost={post}
              setComments={setComments}
              comments={comments}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default PostOpenMedia