import Rightbar from "../../components/rightbar/Rightbar";
import Share from "../../components/share/Share";
import Sidebar from "../../components/sidebar/Sidebar";
import "./tweet.css";

const Tweet = () => {
  return (
    <div className="tweet">
      <Sidebar />
      <Share type="tweet" />
      <Rightbar />
    </div>
  )
}

export default Tweet