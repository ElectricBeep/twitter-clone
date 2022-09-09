import "./home.css";

import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";

const Home = () => {
  return (
    <div className="home">
      <Sidebar />
      <Feed title="Home" />
      <Rightbar page="home" />
    </div>
  )
}

export default Home