import Rightbar from "../../components/rightbar/Rightbar";
import Sidebar from "../../components/sidebar/Sidebar";
import SingleCommentFeed from "../../components/singleCommentFeed/SingleCommentFeed";
import "./singleComment.css";

const SingleComment = () => {
  return (
    <div className="singleComment">
      <Sidebar />
      <SingleCommentFeed />
      <Rightbar page="home" />
    </div>
  )
}

export default SingleComment