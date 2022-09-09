import { AiOutlinePushpin } from "react-icons/ai";

const ListFeedItem = ({ type }) => {
  return (
    <>
      <div className="listFeedDiscoverListsItemLeft">
        <img
          src="https://pbs.twimg.com/media/EXZ1_hkUYAA56JA?format=png&name=240x240"
          alt="list_logo"
          className="listFeedDiscoverListsItemImg"
        />
        <div>
          <p className="listFeedDiscoverListsItemTtile">
            Videogame industry
          </p>
          <div className="listFeedDiscoverListsUserInfo">
            <img
              src="https://images.pexels.com/photos/1212984/pexels-photo-1212984.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="list_creator"
              className="listFeedDiscoverListsItemUserProfileImg"
            />
            <p className="listFeedDiscoverListsItemUserName">
              Andrew
            </p>
            <p className="listFeedDiscoverListsItemUserTags">
              @andrew_dawkins
            </p>
          </div>
        </div>
      </div>
      <div className="listFeedDiscoverListsItemRight">
        {type === "new" ? (
          <button className="rightbarFollowButton">
            Follow
          </button>
        ) : (
          <AiOutlinePushpin className="listFeedDiscoverListsItemPinIcon" />
        )}
      </div>
    </>
  )
}

export default ListFeedItem