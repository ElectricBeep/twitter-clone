import { BsTrash, BsFlag } from "react-icons/bs";
import { BiCopy } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";

const MessagesOpenMore = ({ setOpenMoreOwn, setOpenMoreFriend, type }) => {
  return (
    <>
      {type === "own" ? (
        <div className="messagesMoreMenu">
          <div className="messagesMoreMenuItem">
            <BsTrash className="messagesMoreMenuIcon" />
            <p>Delete</p>
          </div>
          <div className="messagesMoreMenuItem">
            <BsFlag className="messagesMoreMenuIcon" />
            <p>Report Message</p>
          </div>
          <div className="messagesMoreMenuItem">
            <BiCopy className="messagesMoreMenuIcon" />
            <p>Copy Message</p>
          </div>
          <AiOutlineClose
            className="postOpenCommentCloseIcon"
            onClick={() => setOpenMoreOwn(false)}
          />
        </div>
      ) : (
        <div className="messagesMoreMenu">
          <div className="messagesMoreMenuItem">
            <BsFlag className="messagesMoreMenuIcon" />
            <p>Report Message</p>
          </div>
          <div className="messagesMoreMenuItem">
            <BiCopy className="messagesMoreMenuIcon" />
            <p>Copy Message</p>
          </div>
          <AiOutlineClose
            className="postOpenCommentCloseIcon"
            onClick={() => setOpenMoreFriend(false)}
          />
        </div>
      )}
    </>
  )
}

export default MessagesOpenMore