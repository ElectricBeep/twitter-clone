import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

import Post from "../post/Post";
import Navbar from "../navbar/Navbar";
import Share from "../share/Share";
import "./feed.css";
import { BASE_URL } from "../../baseUrl";
import WhoToFollow from "../whoToFollow/WhoToFollow";

const Feed = ({ title }) => {
  const [posts, setPosts] = useState([]);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/posts/timeline/${currentUser._id}`);
        setPosts(res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
        );
      } catch (err) {
        console.log(err);
      };
    };
    getPosts();
  }, [currentUser]);

  return (
    <div className="feed">
      <Navbar title={title} />
      <Share setPosts={setPosts} />
      <div className="feedWrapper">
        {posts?.map((post) => (
          <Post post={post} key={post._id} setPosts={setPosts} />
        ))}
        {(!posts || posts.length === 0) && (
          <WhoToFollow />
        )}
      </div>
    </div>
  )
}

export default Feed