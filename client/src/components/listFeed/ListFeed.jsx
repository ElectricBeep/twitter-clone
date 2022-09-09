import { BsArrowLeft } from "react-icons/bs";
import { Link } from "react-router-dom";
import { CgPlayListAdd } from "react-icons/cg";
import { FiMoreHorizontal } from "react-icons/fi";
import { useState } from "react";

import "./listFeed.css";
import ListFeedItem from "./ListFeedItem";
import ListFeedAddList from "./ListFeedAddList";

const ListFeed = () => {
  const [openNewList, setOpenNewList] = useState(false);

  return (
    <div className="listFeed">
      {openNewList && (
        <ListFeedAddList setOpenNewList={setOpenNewList} />
      )}
      <div className="listFeedNavbar">
        <div className="listFeedNavbarLeft">
          <Link
            to="/"
            className="link"
          >
            <div className="listFeedNavbarBackIconContainer">
              <BsArrowLeft className="listFeedNavbarIcon" />
            </div>
          </Link>
          <div>
            <div className="listFeedNavbarTitle">Lists</div>
            <div className="listFeedNavbarUserTweetsCount">@john_doe</div>
          </div>
        </div>
        <div className="listFeedNavbarRight">
          <CgPlayListAdd
            className="listFeedNavbarIcon"
            onClick={() => setOpenNewList((prev) => !prev)}
          />
          <FiMoreHorizontal
            className="listFeedNavbarIcon"
          />
        </div>
      </div>
      <div className="listFeedPinnedListsContainer">
        <h3>
          PinnedLists
        </h3>
        <p className="listFeedPinnedListsText">
          Nothing to see here yet — pin your favorite Lists to access
          them quickly.
        </p>
      </div>
      <div className="listFeedDiscoverListsContainer">
        <h3 className="listFeedDiscoverListsTitle">
          Discover new lists
        </h3>
        <div>
          <div className="listFeedDiscoverListsItemContainer">
            <ListFeedItem type="new" />
          </div>
        </div>
        <div>
          <div className="listFeedDiscoverListsItemContainer">
            <ListFeedItem type="new" />
          </div>
        </div>
        <div>
          <div className="listFeedDiscoverListsItemContainer">
            <ListFeedItem type="new" />
          </div>
        </div>
        <button className="rightbarFollowMoreButton">
          Show More
        </button>
      </div>
      <div className="listFeedDiscoverListsContainer">
        <h3 className="listFeedDiscoverListsTitle">
          Your Lists
        </h3>
        <div>
          <div className="listFeedDiscoverListsItemContainer">
            <ListFeedItem type="your" />
          </div>
        </div>
        <div>
          <div className="listFeedDiscoverListsItemContainer">
            <ListFeedItem type="your" />
          </div>
        </div>
        <div>
          <div className="listFeedDiscoverListsItemContainer">
            <ListFeedItem type="your" />
          </div>
        </div>
        <button className="rightbarFollowMoreButton">
          Show More
        </button>
      </div>
    </div>
  )
}

export default ListFeed