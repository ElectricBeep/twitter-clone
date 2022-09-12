import { AiOutlineSync, AiOutlineClose } from "react-icons/ai";
import { BsPencil } from "react-icons/bs";

const PostOpenRetweet = ({ setOpenRetweet, handleShare, postId, isShared }) => {
  return (
    <div className="postOpenRetweet">
      <div
        className="postOpenShareItem"
        onClick={() => handleShare(postId)}
      >
        <AiOutlineSync className="postOpenShareIcon" />
        <p>{isShared ? "Undo Retweet" : "Retweet"}</p>
      </div>
      <div className="postOpenShareItem">
        <BsPencil className="postOpenShareIcon" />
        <p>Quote Tweet</p>
      </div>
      <AiOutlineClose
        className="postOpenCommentCloseIcon"
        onClick={() => setOpenRetweet(false)}
      />
    </div>
  )
}

export default PostOpenRetweet