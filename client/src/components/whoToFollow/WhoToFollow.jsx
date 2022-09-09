import { useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

import "./whoToFollow.css";
import { BASE_URL } from "../../baseUrl";
import UsersItem from "../users/UsersItem";

const WhoToFollow = () => {
  const [users, setUsers] = useState([]);
  const [isShowMore, setIsShowMore] = useState(false);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const getRandomUsers = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/users/random/users/sample`);
        setUsers(res.data);
      } catch (err) {
        console.log(err);
      };
    };
    getRandomUsers();
  }, []);

  const filteredUsers = users?.filter((user) => user?._id !== currentUser?._id);

  return (
    <div className="whoToFollow">
      <h2 className="whoToFollowTitle">Who to follow</h2>
      <div className="whoToFollowItems">
        {isShowMore ? (
          <>
            {filteredUsers?.map((user) => (
              <UsersItem user={user} />
            ))}
          </>
        ) : (
          <>
            {filteredUsers?.slice(0, 3).map((user) => (
              <UsersItem user={user} />
            ))}
          </>
        )}

      </div>
      <button
        className="rightbarFollowMoreButton"
        onClick={() => setIsShowMore((prev) => !prev)}
      >
        {isShowMore ? "Show Less" : "Show More"}
      </button>
    </div>
  )
}

export default WhoToFollow