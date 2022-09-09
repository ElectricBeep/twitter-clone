import "./messenger.css";
import Sidebar from "../../components/sidebar/Sidebar";
import Conversations from "../../components/conversations/Conversations";
import Messages from "../../components/messages/Messages";

const Messenger = () => {
  return (
    <div className="messenger">
      <Sidebar />
      <Conversations />
      <Messages />
    </div>
  )
}

export default Messenger