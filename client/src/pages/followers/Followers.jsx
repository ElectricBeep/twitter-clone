import Rightbar from "../../components/rightbar/Rightbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Users from "../../components/users/Users";
import "./followers.css";

const Followers = () => {
  return (
    <div className="followers">
      <Sidebar />
      <Users type="followers" />
      <Rightbar page="home" />
    </div>
  )
}

export default Followers