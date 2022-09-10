import { useSelector } from "react-redux";

import "./home.css";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import RegisterUpdate from "./RegisterUpdate";

const Home = () => {
  const { isRegisterUpdateOpen } = useSelector((state) => state.registerUpdate);

  return (
    <div className="home">
      {isRegisterUpdateOpen && (
        <RegisterUpdate />
      )}
      <Sidebar />
      <Feed title="Home" />
      <Rightbar page="home" />
    </div>
  )
}

export default Home