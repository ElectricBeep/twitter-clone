import ProfileFeed from "../../components/profileFeed/ProfileFeed";
import Rightbar from "../../components/rightbar/Rightbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "./profile.css";

const Profile = () => {
  return (
    <div className="profile">
      <Sidebar />
      <ProfileFeed />
      <Rightbar page="profile" />
    </div>
  )
}

export default Profile