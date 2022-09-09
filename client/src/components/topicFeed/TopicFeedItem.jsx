import { BiMessageRoundedDetail } from "react-icons/bi";

const TopicFeedItem = () => {
  return (
    <div className="topicFeedTopicItem">
      <div className="topicFeedTopicItemLeft">
        <BiMessageRoundedDetail className="topicFeedTopicItemIcon" />
        <div>
          <p className="topicFeedTopicItemName">Gaming</p>
          <p className="topicFeedTopicItemDesc">All about gaming</p>
        </div>
      </div>
      <div>
        <button className="topicFeedTopicItemButton">
          <span className="topicFeedTopicItemSpan">Following</span>
        </button>
      </div>
    </div>
  )
}

export default TopicFeedItem