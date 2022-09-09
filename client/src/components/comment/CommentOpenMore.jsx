import { AiOutlineUserAdd, AiOutlineClose } from "react-icons/ai";
import { VscMute } from "react-icons/vsc";
import { BiBlock } from "react-icons/bi";
import { BsFlag } from "react-icons/bs";

const CommentOpenMore = ({ setOpenMore }) => {
  return (
    <div className="commentOpenMore">
      <div className="commentOpenMoreItem">
        <AiOutlineUserAdd className="commentOpenMoreIcon" />
        <p>Follow @alice_hopkins</p>
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
      <AiOutlineClose
        className="commentOpenCommentCloseIcon"
        onClick={() => setOpenMore(false)}
      />
    </div>
  )
}

export default CommentOpenMore