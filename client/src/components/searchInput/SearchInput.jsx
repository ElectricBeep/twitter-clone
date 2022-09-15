import { useEffect } from "react";
import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "./searchInput.css";
import { BASE_URL } from "../../baseUrl";
import SearchedUser from "./SearchedUser";

const SearchInput = () => {
  const [isSearchInputActive, setIsSearchInputActive] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchedUsers, setSearchedUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (searchTerm !== "") {
      const getSearchedUsers = async () => {
        try {
          const res = await axios.get(`${BASE_URL}/search/users?q=${searchTerm}`);
          setSearchedUsers(res.data);
        } catch (err) {
          console.log(err);
        };
      };
      getSearchedUsers();
    };
  }, [searchTerm]);

  const handleSearch = () => {
    if (searchTerm !== "") {
      setIsSearchInputActive(false);
      navigate(`/search?q=${searchTerm}`);
    };
  };

  return (
    <div
      className={isSearchInputActive ? "searchInputContainer active" : "searchInputContainer"}
      onClick={() => setIsSearchInputActive(true)}
    >
      <FiSearch
        fontSize={25}
        style={{ marginLeft: "10px" }}
        color={isSearchInputActive ? "#1da1f2" : "black"}
        onClick={handleSearch}
      />
      <input
        type="text"
        placeholder={searchTerm ? searchTerm : "Search Twitter"}
        className="searchInputInput"
        onChange={(e) => setSearchTerm(e.target.value)}
        value={searchTerm}
      />
      {isSearchInputActive && (
        <div className="searchInputDropdownContainer">
          {(searchTerm !== "" && searchedUsers?.length > 0) ? (
            <>
              {searchedUsers?.map((user) => (
                <SearchedUser user={user} key={user._id} type="rightbar" />
              ))}
            </>
          ) : (
            <div className="searchInputDropdownText">
              Try searching for people, topics or keywords
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default SearchInput