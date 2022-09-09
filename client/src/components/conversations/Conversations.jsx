import { useState } from "react";
import { FiSearch, FiMoreHorizontal } from "react-icons/fi";

import Navbar from "../../components/navbar/Navbar";
import "./conversations.css";
import ConversationsOpenMore from "./ConversationsOpenMore";

const Conversations = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="conversations">
      <Navbar title="Messages" />
      <div className="conversationsSearch">
        <div className="conversationsSearchContainer">
          <FiSearch className="conversationsSearchIcon" />
          <input
            type="text"
            placeholder="Search Direct Messages"
            className="conversationsInput"
          />
        </div>
      </div>
      <div className="conversationsItems">
        <div className="conversationsItem">
          <img
            src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt=""
            className="conversationsProfileImg"
          />
          <div>
            <div className="conversationsUserProfile">
              <div className="conversationsUserName">Mike</div>
              <div className="conversationsUserTags">@mike_hern</div>
            </div>
            <div className="conversationsLastMessage">
              Yeah, that was amazing.
            </div>
          </div>
          <div className="conversationsDate">
            May 21, 2022
          </div>
          <div
            className="conversationsMoreIconContainer"
            onClick={() => setOpen((prev) => !prev)}
          >
            <FiMoreHorizontal className="conversationsMoreIcon" />
          </div>
        </div>
        <div className="conversationsItem">
          <img
            src="https://images.pexels.com/photos/936119/pexels-photo-936119.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt=""
            className="conversationsProfileImg"
          />
          <div>
            <div className="conversationsUserProfile">
              <div className="conversationsUserName">Alan</div>
              <div className="conversationsUserTags">@alan_marks</div>
            </div>
            <div className="conversationsLastMessage">
              Ok, see you there.
            </div>
          </div>
          <div className="conversationsDate">
            June 13, 2022
          </div>
          <div
            className="conversationsMoreIconContainer"
            onClick={() => setOpen((prev) => !prev)}
          >
            <FiMoreHorizontal className="conversationsMoreIcon" />
          </div>
        </div>
        <div className="conversationsItem">
          <img
            src="https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt=""
            className="conversationsProfileImg"
          />
          <div>
            <div className="conversationsUserProfile">
              <div className="conversationsUserName">Lucy</div>
              <div className="conversationsUserTags">@lucy_owens</div>
            </div>
            <div className="conversationsLastMessage">
              I'll see what I can do.
            </div>
          </div>
          <div className="conversationsDate">
            July 1, 2022
          </div>
          <div
            className="conversationsMoreIconContainer"
            onClick={() => setOpen((prev) => !prev)}
          >
            <FiMoreHorizontal className="conversationsMoreIcon" />
          </div>
          <div className="conversationsPopup">
            {open && (
              <ConversationsOpenMore setOpen={setOpen} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Conversations