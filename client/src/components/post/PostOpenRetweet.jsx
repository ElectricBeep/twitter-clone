import { AiOutlineSync, AiOutlineClose } from "react-icons/ai";
import { BsPencil } from "react-icons/bs";

const PostOpenRetweet = ({ setOpenRetweet }) => {
  return (
    <div className="postOpenRetweet">
      <div className="postOpenShareItem">
        <AiOutlineSync className="postOpenShareIcon" />
        <p>Retweet</p>
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