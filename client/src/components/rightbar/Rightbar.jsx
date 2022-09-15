import { useState } from "react";
import { useEffect } from "react";
import { FiMoreHorizontal } from "react-icons/fi";
import { useSelector } from "react-redux";
import axios from "axios";

import "./rightbar.css";
import { BASE_URL } from "../../baseUrl";
import RightbarUser from "./RightbarUser";
import SearchInput from "../searchInput/SearchInput";

const Rightbar = ({ page }) => {
  const [users, setUsers] = useState([]);
  const [isShowMore, setIsShowMore] = useState(false);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/users`);
        setUsers(res.data);
      } catch (err) {
        console.log(err);
      };
    };
    getUsers();
  }, []);

  const filteredUsers = users?.filter((user) => user._id !== currentUser._id);

  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {page !== "search" && (
          <>
            <SearchInput />
            <div className="rightbarTrends">
              <h1 className="rightbarTrendsTitle">Trends for you</h1>
              <div className="rightbarTrendsItems">
                <div className="rightbarTrendItem">
                  <p className="rightbarTrendsItemText">Trending</p>
                  <div className="rightbarTrendsItemTitle">#PokemonUnite</div>
                  <p className="rightbarTrendsItemText">16.3K Tweets</p>
                </div>
                <div className="rightbarTrendsIcon">
                  <FiMoreHorizontal className="rightbarIcon" />
                </div>
              </div>
              <div className="rightbarTrendsItems">
                <div className="rightbarTrendItem">
                  <p className="rightbarTrendsItemText">Gaming • Trending</p>
                  <div className="rightbarTrendsItemTitle">#Riot</div>
                  <p className="rightbarTrendsItemText">43.3K Tweets</p>
                </div>
                <div className="rightbarTrendsIcon">
                  <FiMoreHorizontal className="rightbarIcon" />
                </div>
              </div>
              <div className="rightbarTrendsItems">
                <div className="rightbarTrendItem">
                  <p className="rightbarTrendsItemText">Gaming • Trending</p>
                  <div className="rightbarTrendsItemTitle">Yakuza</div>
                  <p className="rightbarTrendsItemText">21.7K Tweets</p>
                </div>
                <div className="rightbarTrendsIcon">
                  <FiMoreHorizontal className="rightbarIcon" />
                </div>
              </div>
              <div className="rightbarTrendsItems">
                <div className="rightbarTrendItem">
                  <p className="rightbarTrendsItemText">Gaming • Trending</p>
                  <div className="rightbarTrendsItemTitle">League of Legends</div>
                  <p className="rightbarTrendsItemText">122.1K Tweets</p>
                </div>
                <div className="rightbarTrendsIcon">
                  <FiMoreHorizontal className="rightbarIcon" />
                </div>
              </div>
              <div className="rightbarTrendsItems">
                <div className="rightbarTrendItem">
                  <p className="rightbarTrendsItemText">Entertainment • Trending</p>
                  <div className="rightbarTrendsItemTitle">#Deadpool</div>
                  <p className="rightbarTrendsItemText">65.9K Tweets</p>
                </div>
                <div className="rightbarTrendsIcon">
                  <FiMoreHorizontal className="rightbarIcon" />
                </div>
              </div>
              <div className="rightbarTrendsItems">
                <div className="rightbarTrendItem">
                  <p className="rightbarTrendsItemText">Trending</p>
                  <div className="rightbarTrendsItemTitle">Funimation</div>
                  <p className="rightbarTrendsItemText">14.6K Tweets</p>
                </div>
                <div className="rightbarTrendsIcon">
                  <FiMoreHorizontal className="rightbarIcon" />
                </div>
              </div>
            </div>
          </>
        )}
        <div className="rightbarFollow">
          <h1 className="rightbarFollowTitle">Who to Follow</h1>
          {isShowMore ? (
            <>
              {filteredUsers?.map((user) => (
                <RightbarUser
                  user={user}
                  currentUser={currentUser}
                  key={user._id}
                />
              ))}
            </>
          ) : (
            <>
              {filteredUsers?.slice(0, 3).map((user) => (
                <RightbarUser
                  user={user}
                  currentUser={currentUser}
                  key={user._id}
                />
              ))}
            </>
          )}
          <button
            className="rightbarFollowMoreButton"
            onClick={() => setIsShowMore((prev) => !prev)}
          >
            {isShowMore ? "Show Less" : "Show More"}
          </button>
        </div>
        <div className="rightbarFooter">
          <p className="rightbarFooterText">Terms of Service</p>
          <p className="rightbarFooterText">Privacy Policy</p>
          <p className="rightbarFooterText">Cookie Policy</p>
          <p className="rightbarFooterText">Accessibility</p>
          <p className="rightbarFooterText">Ads Info</p>
          <p className="rightbarFooterText">More</p>
          <p className="rightbarFooterText">© 2022 Twitter, Inc.</p>
        </div>
      </div>
    </div>
  )
}

export default Rightbar