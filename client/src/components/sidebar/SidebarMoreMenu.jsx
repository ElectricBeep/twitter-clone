import { BsDisplay, BsKeyboard } from "react-icons/bs";
import { AiOutlineThunderbolt, AiOutlineQuestionCircle, AiOutlineClose } from "react-icons/ai";
import { FiSettings } from "react-icons/fi";
import { BiMessageRoundedDetail, BiRocket } from "react-icons/bi";
import { RiFileList2Line } from "react-icons/ri";
import { CgDockWindow } from "react-icons/cg";
import { TbBrandGoogleAnalytics } from "react-icons/tb";
import { Link } from "react-router-dom";
import { useState } from "react";

const SidebarMoreMenu = ({ setOpenMore }) => {
  return (
    <div className="sidebarMoreMenu">
      <AiOutlineClose
        className="sidebarMoreMenuClose"
        onClick={() => setOpenMore(false)}
      />
      <Link
        to="/topics"
        className="link"
      >
        <div className="sidebarMoreMenuItem">
          <BiMessageRoundedDetail className="sidebarMoreIcon" />
          <p>Topics</p>
        </div>
      </Link>
      <Link
        to="/moments"
        className="link"
      >
        <div className="sidebarMoreMenuItem">
          <AiOutlineThunderbolt className="sidebarMoreIcon" />
          <p>Moments</p>
        </div>
      </Link>
      <div
        className="sidebarMoreMenuItem">
        <RiFileList2Line className="sidebarMoreIcon" />
        <p>Newsletters</p>
      </div>
      <div className="sidebarMoreMenuItem">
        <BiRocket className="sidebarMoreIcon" />
        <p>Twitter for Professionals</p>
      </div>
      <div className="sidebarMoreMenuItem">
        <CgDockWindow className="sidebarMoreIcon" />
        <p>Twitter Ads</p>
      </div>
      <div className="sidebarMoreMenuItem">
        <TbBrandGoogleAnalytics className="sidebarMoreIcon" />
        <p>Analytics</p>
      </div>
      <Link
        to="/settings"
        className="link"
      >
        <div className="sidebarMoreMenuItem">
          <FiSettings className="sidebarMoreIcon" />
          <p>Settings and Privacy</p>
        </div>
      </Link>
      <div className="sidebarMoreMenuItem">
        <AiOutlineQuestionCircle className="sidebarMoreIcon" />
        <p>Help Center</p>
      </div>
      <div className="sidebarMoreMenuItem">
        <BsDisplay className="sidebarMoreIcon" />
        <p>Display</p>
      </div>
      <div className="sidebarMoreMenuItem">
        <BsKeyboard className="sidebarMoreIcon" />
        <p>Keyboard shortcuts</p>
      </div>
    </div>
  )
}

export default SidebarMoreMenu