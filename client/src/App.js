import { useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import { Toaster } from 'react-hot-toast';

import "./app.css";
import Bookmark from "./pages/bookmark/Bookmark";
import Home from "./pages/home/Home";
import List from "./pages/list/List";
import Messenger from "./pages/messenger/Messenger";
import Moment from "./pages/moment/Moment";
import Notification from "./pages/notification/Notification";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import Search from "./pages/search/Search";
import Settings from "./pages/settings/Settings";
import SinglePost from "./pages/singlePost/SinglePost";
import Topic from "./pages/topic/Topic";
import Tweet from "./pages/tweet/Tweet";
import SingleComment from "./pages/singleComment/SingleComment";
import Following from "./pages/following/Following";
import Followers from "./pages/followers/Followers";
import Explore from "./pages/explore/Explore";

function App() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className="app">
      <>
        <Router>
          <Routes>
            <Route exact path="/" element={currentUser ? <Home /> : <Register />} />
            <Route exact path="/explore" element={currentUser ? <Explore /> : <Register />} />
            <Route path="/tweet" element={currentUser ? <Tweet /> : <Register />} />
            <Route path="/post/:id" element={currentUser ? <SinglePost /> : <Register />} />
            <Route path="/search" element={currentUser ? <Search /> : <Register />} />
            <Route path="/notifications" element={currentUser ? <Notification /> : <Register />} />
            <Route path="/messages" element={currentUser ? <Messenger /> : <Register />} />
            <Route path="/bookmarks" element={currentUser ? <Bookmark /> : <Register />} />
            <Route path="/profile/:id" element={currentUser ? <Profile /> : <Register />} />
            <Route path="/comment/:id" element={currentUser ? <SingleComment /> : <Register />} />
            <Route path="/following/:id" element={currentUser ? <Following /> : <Register />} />
            <Route path="/followers/:id" element={currentUser ? <Followers /> : <Register />} />
            <Route path="/lists" element={currentUser ? <List /> : <Register />} />
            <Route path="/topics" element={currentUser ? <Topic /> : <Register />} />
            <Route path="/moments" element={currentUser ? <Moment /> : <Register />} />
            <Route path="/settings" element={currentUser ? <Settings /> : <Register />} />
            <Route path="/register" element={currentUser ? <Home /> : <Register />} />
          </Routes>
        </Router>
        <Toaster
          position="bottom-center"
          reverseOrder={false}
        />
      </>
    </div>
  );
}

export default App;
