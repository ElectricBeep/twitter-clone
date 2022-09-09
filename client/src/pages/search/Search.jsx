import "./search.css";
import Sidebar from "../../components/sidebar/Sidebar";
import Rightbar from "../../components/rightbar/Rightbar";
import SearchFeed from "../../components/searchFeed/SearchFeed";

const Search = () => {
  return (
    <div className="search">
      <Sidebar />
      <SearchFeed />
      <Rightbar page="search" />
    </div>
  )
}

export default Search