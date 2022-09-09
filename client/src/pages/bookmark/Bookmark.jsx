import "./bookmark.css";
import Sidebar from "../../components/sidebar/Sidebar";
import Rightbar from "../../components/rightbar/Rightbar";
import BookmarkFeed from "../../components/bookmarkFeed/BookmarkFeed";

const Bookmark = () => {
  return (
    <div className="bookmark">
      <Sidebar />
      <BookmarkFeed />
      <Rightbar page="home" />
    </div>
  )
}

export default Bookmark