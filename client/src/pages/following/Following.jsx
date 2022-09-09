import Rightbar from "../../components/rightbar/Rightbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Users from "../../components/users/Users";
import "./following.css";

const Following = () => {
  return (
    <div className="following">
      <Sidebar />
      <Users type="following" />
      <Rightbar page="home" />
    </div>
  )
}

export default Following