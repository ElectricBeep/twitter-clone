import { useState } from "react";
import { BsTwitter } from "react-icons/bs";

import Navbar from "../navbar/Navbar";
import "./notificationFeed.css";

const NotificationFeed = () => {
  const [selected, setSelected] = useState("all")

  return (
    <div className="notificationFeed">
      <Navbar title="Notifications" />
      <div className="notificationSelect">
        <div
          className={selected === "all" ? "notificationSelectedItem" : "notificationSelectItem"}
          onClick={() => setSelected("all")}
        >
          All
        </div>
        <div
          className={selected === "mentions" ? "notificationSelectedItem" : "notificationSelectItem"}
          onClick={() => setSelected("mentions")}
        >
          Mentions
        </div>
      </div>
      <div>
        {selected === "all" ? (
          <div className="notificationNotification">
            <BsTwitter className="notificationNotificationIcon" />
            <div>
              There was a login to your account @jhon_doe from a new device
              on Jul 16, 2022. Review it now.
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  )
}

export default NotificationFeed