import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

import "./bookmarkFeed.css";
import Navbar from "../navbar/Navbar";
import Post from "../../components/post/Post";
import { BASE_URL } from "../../baseUrl";

const BookmarkFeed = () => {
  const [bookmarkedPosts, setBookmarkedPosts] = useState([]);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    if (currentUser) {
      const getBookmarks = async () => {
        try {
          const res = await axios.get(`${BASE_URL}/users/bookmarks/${currentUser._id}`);
          setBookmarkedPosts(res.data);
        } catch (err) {
          console.log(err);
        }
      };
      getBookmarks();
    };
  }, [currentUser]);

  return (
    <div className="bookmarkFeed">
      <Navbar title="Bookmarks" />
      {bookmarkedPosts?.map((post) => (
        <Post post={post} key={post._id} />
      ))}
      {(!bookmarkedPosts || bookmarkedPosts.length === 0) && (
        <div className="bookmarkFeedNoPosts">
          <img
            src="https://abs.twimg.com/sticky/illustrations/empty-states/book-in-bird-cage-800x400.v1.png"
            alt="no bookmarked posts"
            className="bookmarkFeedNoPostsImg"
          />
          <h1>Save Tweets for later</h1>
          <p className="bookmarkFeedNoPostsText">
            Don’t let the good ones fly away! Bookmark Tweets to
            easily find them again in the future.
          </p>
        </div>
      )}
    </div>
  )
}

export default BookmarkFeed