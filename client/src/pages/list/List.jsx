import "./list.css";
import Sidebar from "../../components/sidebar/Sidebar";
import Rightbar from "../../components/rightbar/Rightbar";
import ListFeed from "../../components/listFeed/ListFeed";

const List = () => {
  return (
    <div className="list">
      <Sidebar />
      <ListFeed />
      <Rightbar page="list" />
    </div>
  )
}

export default List