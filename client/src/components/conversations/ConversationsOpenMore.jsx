import { AiOutlinePushpin, AiOutlineClose } from "react-icons/ai";
import { BsVolumeMute, BsFlag, BsTrash } from "react-icons/bs";


const ConversationsOpenMore = ({ setOpen }) => {
  return (
    <div className="conversationsOpenMoreContainer">
      <div className="conversationsOpenMoreItem">
        <BsVolumeMute className="conversationsOpenMoreIcon" />
        <p className="conversationsOpenMoreText">Snooze Conversation</p>
      </div>
      <div className="conversationsOpenMoreItem">
        <AiOutlinePushpin className="conversationsOpenMoreIcon" />
        <p className="conversationsOpenMoreText">Pin Conversation</p>
      </div>
      <div className="conversationsOpenMoreItem">
        <BsFlag className="conversationsOpenMoreIcon" />
        <p className="conversationsOpenMoreText">Report Conversation</p>
      </div>
      <div className="conversationsOpenMoreItem conversationsDelete">
        <BsTrash className="conversationsOpenMoreIcon" />
        <p className="conversationsOpenMoreText">Delete Conversation</p>
      </div>
      <AiOutlineClose
        className="postOpenCommentCloseIcon"
        onClick={() => setOpen(false)}
      />
    </div>
  )
}

export default ConversationsOpenMore