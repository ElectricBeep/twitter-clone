import "./topic.css";
import Sidebar from "../../components/sidebar/Sidebar";
import Rightbar from "../../components/rightbar/Rightbar";
import TopicFeed from "../../components/topicFeed/TopicFeed";

const Topic = () => {
  return (
    <div className="topic">
      <Sidebar />
      <TopicFeed />
      <Rightbar page="topic" />
    </div>
  )
}

export default Topic