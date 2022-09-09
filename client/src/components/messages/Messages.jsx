import { useState } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { FiMoreHorizontal } from "react-icons/fi";

import "./messages.css";
import MessagesOpenMore from "./MessagesOpenMore";

const Messages = () => {
  const [openMoreOwn, setOpenMoreOwn] = useState(false);
  const [openMoreFriend, setOpenMoreFriend] = useState(false);

  const conversation = true;

  return (
    <div className="messages">
      {!conversation ? (
        <div className="messagesNoConversation">
          <div>
            <h1>
              Select a message
            </h1>
            <p className="messagesNoConversationText">
              Choose from your existing conversations, start a <br /> new
              one, or just keep swimming.
            </p>
            <button className="messagesNoConversationButton">
              New Message
            </button>
          </div>
        </div>
      ) : (
        <div className="messagesConversationContainer">
          <div className="messagesConversationNavbar">
            <div className="messagesConversationNavbarLeft">
              <img
                src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt=""
                className="messagesProfileImg"
              />
              <div>
                <div className="messagesUserName">Mike</div>
                <div className="messagesUserTags">@mike_hern</div>
              </div>
            </div>
            <div className="messagesConversationNavbarRight">
              <AiOutlineInfoCircle className="messagesNavbarIcon" />
            </div>
          </div>
          <div className="messagesMessagesContainer">
            <div className="messagesMessage">
              <img
                src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt=""
                className="messagesFriendProfileImg"
              />
              <div className="messagesMessageTextDateContainer">
                <p className="messagesText">
                  Lorem ipsum dolor sit amet consectetur adipisicing
                  elit. Voluptatum atque esse eligendi deserunt
                  recusandae, eaque nostrum laborum. Assumenda
                  inventore, cumque incidunt possimus animi enim maxime.
                  Aliquid in natus molestias quas.
                </p>
                <p className="messagesDate">
                  May 21, 2022, 6:19 PM
                </p>
              </div>
              <div
                className="messagesMoreIconContainer"
                onClick={() => setOpenMoreFriend((prev) => !prev)}
              >
                <FiMoreHorizontal className="messagesMoreIcon" />
                {openMoreFriend && (
                  <MessagesOpenMore
                    setOpenMoreFriend={setOpenMoreFriend}
                    type="friend"
                  />
                )}
              </div>
            </div>
            <div className="messagesMessage">
              <div
                className="messagesMoreIconContainer"
                onClick={() => setOpenMoreOwn((prev) => !prev)}
              >
                <FiMoreHorizontal className="messagesMoreIcon" />
                {openMoreOwn && (
                  <MessagesOpenMore
                    setOpenMoreOwn={setOpenMoreOwn}
                    type="own"
                  />
                )}
              </div>
              <div className="messagesMessageTextDateContainer">
                <p className="messagesTextOwn">
                  Lorem ipsum dolor sit amet consectetur adipisicing
                  elit. Voluptatum atque esse eligendi deserunt
                  recusandae, eaque nostrum laborum. Assumenda
                  inventore, cumque incidunt possimus animi enim maxime.
                  Aliquid in natus molestias quas.
                </p>
                <p className="messagesDateOwn">
                  May 21, 2022, 6:19 PM
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Messages