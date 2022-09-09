import ExploreFeed from "../../components/exploreFeed/ExploreFeed";
import Rightbar from "../../components/rightbar/Rightbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "./explore.css";

const Explore = () => {
  return (
    <div className="explore">
      <Sidebar />
      <ExploreFeed />
      <Rightbar page="search" />
    </div>
  )
}

export default Explore