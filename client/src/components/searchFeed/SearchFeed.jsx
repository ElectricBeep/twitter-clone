import { FiSettings } from "react-icons/fi";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

import "./searchFeed.css";
import SearchInput from "../searchInput/SearchInput";
import { BASE_URL } from "../../baseUrl";
import SearchedUser from "../searchInput/SearchedUser";

const SearchFeed = () => {
  const [searchedUsers, setSearchedUsers] = useState([]);
  const [searchedPosts, setSearchedPosts] = useState([]);
  const [searchedComments, setSearchedComments] = useState([]);
  const [active, setActive] = useState("top")
  const location = useLocation();
  const query = location?.search;
  console.log(query)

  //get searched users
  useEffect(() => {
    if (location?.search) {
      const getSearchedUsers = async () => {
        try {
          const res = await axios.get(`${BASE_URL}/search/users${location.search}`);
          setSearchedUsers(res.data);
        } catch (err) {
          console.log(err);
        };
      };
      getSearchedUsers();
    };
  }, [location?.search]);
  console.log(searchedUsers)

  //get searched posts
  useEffect(() => {
    if (location?.search) {
      const getSearchedUsers = async () => {
        try {
          const res = await axios.get(`${BASE_URL}/search/posts${location.search}`);
          setSearchedPosts(res.data);
        } catch (err) {
          console.log(err);
        };
      };
      getSearchedUsers();
    };
  }, [location?.search]);

  //get searched comments
  useEffect(() => {
    if (location?.search) {
      const getSearchedUsers = async () => {
        try {
          const res = await axios.get(`${BASE_URL}/search/comments${location.search}`);
          setSearchedComments(res.data);
        } catch (err) {
          console.log(err);
        };
      };
      getSearchedUsers();
    };
  }, [location?.search]);

  return (
    <div className="searchFeed">
      <div className="searchFeedWrapper">
        <SearchInput />
        <div className="searchFeedIconContainer">
          <FiSettings className="searchFeedIcon" />
        </div>
      </div>
      {!location.search && (
        <div className="searchFeedImgContainer">
          <img
            src="https://cdn.pixabay.com/photo/2016/10/27/17/34/city-1775878_960_720.jpg"
            alt=""
            className="searchFeedImg"
          />
          <div className="searchFeedImgText">
            <p className="searchFeedTextTag">Entertainment</p>
            <p className="searchFeedTextText">City in the USA</p>
          </div>
        </div>
      )}
      <div className="searchFeedNavigationContainer">
        <h4
          className={active === "top" ? "searchFeedNavigationItem active" : "searchFeedNavigationItem"}
          onClick={() => setActive("top")}
        >
          Top
        </h4>
        <h4
          className={active === "lates" ? "searchFeedNavigationItem active" : "searchFeedNavigationItem"}
          onClick={() => setActive("lates")}
        >
          Latest
        </h4>
        <h4
          className={active === "people" ? "searchFeedNavigationItem active" : "searchFeedNavigationItem"}
          onClick={() => setActive("people")}
        >
          People
        </h4>
        <h4
          className={active === "posts" ? "searchFeedNavigationItem active" : "searchFeedNavigationItem"}
          onClick={() => setActive("posts")}
        >
          Posts
        </h4>
        <h4
          className={active === "comments" ? "searchFeedNavigationItem active" : "searchFeedNavigationItem"}
          onClick={() => setActive("comments")}
        >
          Commnets
        </h4>
      </div>
      <div className="searchFeedContent">
        <h3 className="searchFeedContentTtitle">
          People
        </h3>
        {searchedUsers?.map((user) => {
          <SearchedUser user={user} />
        })}
      </div>
    </div>
  )
}

export default SearchFeed