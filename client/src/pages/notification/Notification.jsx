import "./notification.css";
import Sidebar from "../../components/sidebar/Sidebar";
import Rightbar from "../../components/rightbar/Rightbar";
import NotificationFeed from "../../components/notificationFeed/NotificationFeed";

const Notification = () => {
  return (
    <div className="notification">
      <Sidebar />
      <NotificationFeed />
      <Rightbar page="notifications" />
    </div>
  )
}

export default Notification