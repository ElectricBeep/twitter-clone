import { useRef, useState } from "react";
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from "react-icons/bs";

import TopicFeedGridPill from "./TopicFeedGridPill"

const TopicFeedGridCategory = ({ title }) => {
  const [isMoved, setIsMoved] = useState(false);
  const [slideNumber, setSlideNumber] = useState(0);

  const clickLimit = window.innerWidth / 230;

  const listRef = useRef();

  const handleClick = (direction) => {
    // setIsMoved(true);
    // let distance = listRef.current.getBoundingClientRect().x - 50;
    if (direction === "left") {
      // setSlideNumber(slideNumber - 1);
      listRef.current.style.transform = `translateX(${650}px)`;
    }
    if (direction === "right") {
      // setSlideNumber(slideNumber + 1);
      listRef.current.style.transform = `translateX(${-650}px)`;
    }
  };

  return (
    <div className="topicFeedGridCategory">
      <h3 className="topicFeedGridCategoryItem">
        {title}
      </h3>
      <div className="topicFeedGridCategoryPillContainer">
        <BsFillArrowLeftCircleFill
          className="gridContainerIconLeft"
          onClick={() => handleClick("left")}
        />
        <div className="topicFeedGridCategoryPillWrapper" ref={listRef}>
          <TopicFeedGridPill />
          <TopicFeedGridPill />
          <TopicFeedGridPill />
          <TopicFeedGridPill />
          <TopicFeedGridPill />
          <TopicFeedGridPill />
          <TopicFeedGridPill />
          <TopicFeedGridPill />
          <TopicFeedGridPill />
          <TopicFeedGridPill />
          <TopicFeedGridPill />
          <TopicFeedGridPill />
          <TopicFeedGridPill />
          <TopicFeedGridPill />
          <TopicFeedGridPill />
          <TopicFeedGridPill />
          <TopicFeedGridPill />
          <TopicFeedGridPill />
          <TopicFeedGridPill />
          <TopicFeedGridPill />
          <TopicFeedGridPill />
          <TopicFeedGridPill />
          <TopicFeedGridPill />
          <TopicFeedGridPill />
          <TopicFeedGridPill />
          <TopicFeedGridPill />
          <TopicFeedGridPill />
          <TopicFeedGridPill />
          <TopicFeedGridPill />
          <TopicFeedGridPill />
        </div>
        <BsFillArrowRightCircleFill
          className="gridContainerIconRight"
          onClick={() => handleClick("right")}
        />
      </div>
    </div>
  )
}

export default TopicFeedGridCategory