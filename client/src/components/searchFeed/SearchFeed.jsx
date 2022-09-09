import { FiSearch, FiSettings } from "react-icons/fi";

import "./searchFeed.css";

const SearchFeed = () => {
  return (
    <div className="searchFeed">
      <div className="searchFeedWrapper">
        <div className="rightbarSearchContainer">
          <FiSearch fontSize={25} />
          <input
            type="text"
            placeholder="Search Twitter"
            className="rightbarInput"
          />
        </div>
        <div className="searchFeedIconContainer">
          <FiSettings className="searchFeedIcon" />
        </div>
      </div>
      <div className="searchFeedImgContainer">
        <img
          src="https://cdn.pixabay.com/photo/2016/10/27/17/34/city-1775878_960_720.jpg"
          alt=""
          className="searchFeedImg"
        />
        <div className="searchFeedImgText">
          <p className="searchFeedTextTag">Entertainment</p>
          <p className="searchFeedTextText">City in the USA</p>
        </div>
      </div>
    </div>
  )
}

export default SearchFeed