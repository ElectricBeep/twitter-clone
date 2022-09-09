import "./navbar.css";
import { BsStars } from "react-icons/bs";
import { FiSettings, FiMoreHorizontal } from "react-icons/fi";
import { BiMessageAdd } from "react-icons/bi";
import { AiOutlineClose, AiOutlineThunderbolt } from "react-icons/ai";
import { useState } from "react";

const Navbar = ({ title }) => {
  const [openMore, setOpenMore] = useState(false);

  return (
    <div className="navbar">
      <div className="navbarTitle">
        {title}
        {title === "Home" && (
          <BsStars className="navbarIcon" />
        )}
        {title === "Messages" && (
          <div className="navbarIconContainer">
            <FiSettings className="navbarIcon" />
            <BiMessageAdd className="navbarIcon" />
          </div>
        )}
        {title === "Bookmarks" && (
          <div
            className="navbarIconContainer"
            onClick={() => setOpenMore((prev) => !prev)}
          >
            <FiMoreHorizontal className="navbarIcon" />
            {openMore && (
              <div className="navbarMoreMenu">
                <div className="navbarMoreMenuItem">
                  <p className="navbarMoreMenuItemText">
                    Delete all Bookmarks
                  </p>
                </div>
                <AiOutlineClose
                  className="navbarMoreMenuCloseIcon"
                  onClick={() => setOpenMore(false)}
                />
              </div>
            )}
          </div>
        )}
        {title === "Moments" && (
          <AiOutlineThunderbolt className="navbarIcon" />
        )}
      </div>
    </div>
  )
}

export default Navbar