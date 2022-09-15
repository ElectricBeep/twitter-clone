import { Link } from "react-router-dom";

const SearchedUser = ({ user, type }) => {
  return (
    <Link to={`/profile/${user?._id}`} className="link">
      <div className="searchInputDropdownItem">
        <div className="searchInputDropdownItemLeft">
          <img
            src={user?.profilePicture}
            alt="user profile"
            className="searchInputDropdownItemImg"
          />
        </div>
        <div className="searchInputDropdownItemRight">
          <h4 className="searchInputDropdownItemName">
            {user?.name}
          </h4>
          <div className="searchInputDropdownItemUsername">
            @{user?.username}
          </div>
          {type === "rightbar" && (
            <div className="searchInputDropdownItemAbout">
              {user?.about?.slice(0, 27)}...
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}

export default SearchedUser