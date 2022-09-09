import { useState } from "react";

import Navbar from "../navbar/Navbar";
import "./topicFeed.css";
import TopicFeedGridCategory from "./TopicFeedGridCategory";
import TopicFeedGridItem from "./TopicFeedGridItem";
import TopicFeedItem from "./TopicFeedItem";

const TopicFeed = () => {
  const [active, setActive] = useState("followed");

  return (
    <div className="topicFeed">
      <Navbar title="Topics" />
      <div className="topicFeedActiveContainer">
        <div
          className={active === "followed" ? "topicFeedActiveItem active" : "topicFeedActiveItem"}
          onClick={() => setActive("followed")}
        >
          Followed
        </div>
        <div
          className={active === "suggested" ? "topicFeedActiveItem active" : "topicFeedActiveItem"}
          onClick={() => setActive("suggested")}
        >
          Suggested
        </div>
        <div
          className={active === "notInterested" ? "topicFeedActiveItem active" : "topicFeedActiveItem"}
          onClick={() => setActive("notInterested")}
        >
          Not Interested
        </div>
      </div>
      {active === "followed" && (
        <>
          <p className="topicFeedText">
            The Topics you follow are used to personalize the Tweets,
            events, and ads that you see, and show up publicly on your
            profile
          </p>
          <div>
            <TopicFeedItem />
            <TopicFeedItem />
            <TopicFeedItem />
            <TopicFeedItem />
          </div>
          <div className="topicFeedFollowed">
            <h3 className="topicFeedFollowedTitle">
              Suggested Topics
            </h3>
            <p className="topicFeedFollowedDesc">
              You'll see top Tweets about these right in your Home timeline
            </p>
            <div className="topicFeedFollowedPillsContainer">

            </div>
            <button className="topicFeedFollowedMoreButton">
              More Topics
            </button>
          </div>
          <div className="topicFeedFollowedBottom">
            <p className="topicFeedFollowedBottomDesc">
              Topics that you follow are shown here. To see all the things
              that Twitter thinks you’re interested in, check
              out <span className="topicFeedspan">Your Twitter data</span>. You can
              also <span className="topicFeedspan">learn more</span> about following Topics.
            </p>
          </div>
        </>
      )}
      {active === "suggested" && (
        <div>
          <h3 className="topicFeedSuggestedTitle">
            Categories
          </h3>
          <div className="topicFeedSuggestedGridContainer">
            <TopicFeedGridItem title="Fashion & beauty" />
            <TopicFeedGridItem title="Outdoors" />
            <TopicFeedGridItem title="Arts & culture" />
            <TopicFeedGridItem title="Animation & comics" />
            <TopicFeedGridItem title="Business & finance" />
            <TopicFeedGridItem title="Food" />
          </div>
          <div className="topicFeedSuggestedButtonContainer">
            <button className="topicFeedFollowedMoreButton suggestedGrid">
              Show More
            </button>
          </div>
          <div>
            <TopicFeedGridCategory title="For you" />
            <TopicFeedGridCategory title="Gaming" />
            <TopicFeedGridCategory title="Entertainment" />
            <TopicFeedGridCategory title="Animation & Comics" />
            <TopicFeedGridCategory title="Arts & Culture" />
            <TopicFeedGridCategory title="Music" />
            <TopicFeedGridCategory title="Only on Twitter" />
            <TopicFeedGridCategory title="Technology" />
            <TopicFeedGridCategory title="News" />
            <TopicFeedGridCategory title="Science" />
            <TopicFeedGridCategory title="Fashion & beauty" />
            <TopicFeedGridCategory title="Business & finance" />
            <TopicFeedGridCategory title="Sports" />
            <TopicFeedGridCategory title="Family & relationships" />
            <TopicFeedGridCategory title="Outdoors" />
            <TopicFeedGridCategory title="Food" />
            <TopicFeedGridCategory title="Careers" />
          </div>
        </div>
      )}
      {active === "notInterested" && (
        <div className="topicFeedNotInterestedContainer">
          <img
            src="https://abs.twimg.com/sticky/illustrations/empty-states/parrot-800x400.v1.png"
            alt="parrot"
            className="topicFeedNotInterestedImg"
          />
          <h1>
            No interest? No
            <br />
            problem
          </h1>
          <p className="topicFeedNotInterestedText">
            When you tell us you're not interested in a Topic, it
            will show up here. We won't recommend Tweets, events,
            or ads related to Topics you aren't into.
          </p>
        </div>
      )}
    </div>
  )
}

export default TopicFeed