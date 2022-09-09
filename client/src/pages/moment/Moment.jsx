import "./moment.css";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import MomentSingle from "./MomentSingle";

const Moment = () => {
  return (
    <div className="moment">
      <Sidebar page="moment" />
      <div className="momentFeed">
        <div className="momentMomentContainer">
          <Navbar title="Moments" />
          <MomentSingle />
          <MomentSingle />
          <MomentSingle />
          <MomentSingle />
          <MomentSingle />
          <MomentSingle />
          <MomentSingle />
          <MomentSingle />
          <MomentSingle />
          <MomentSingle />
          <MomentSingle />
          <MomentSingle />
        </div>
      </div>
      <div className="momentRightbar">
        <div className="momentRightbarContainer">
          <img
            src="https://abs.twimg.com/sticky/illustrations/empty-states/cracked-egg-microphones-800x400.v1.png"
            alt=""
            className="momentRightbarImg"
          />
          <h1 className="momentRightbarTitle">
            Seize the Moment
          </h1>
          <p className="momentRightbarText">
            Choose an existing moment or create a new one.
          </p>
          <button className="momentRightbarButton">
            Create now
          </button>
        </div>
      </div>
    </div>
  )
}

export default Moment