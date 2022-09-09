import { AiOutlineThunderbolt } from "react-icons/ai";
import { BiPencil } from "react-icons/bi";
import { FiMoreHorizontal } from "react-icons/fi";

const MomentSingle = () => {
  return (
    <div className="momentSingle">
      <div className="momentMomentTop">
        <div className="momentMomentTopLeft">
          <p className="momentMomentTopLeftTitle">Untitled</p>
          <p className="momentMomentTopLeftType">Private</p>
          <p className="momentMomentTopLeftDate">May 16, 2022</p>
        </div>
        <div className="momentMomentTopRight">
          <AiOutlineThunderbolt fontSize="25px" color="rgb(100, 100, 100)" />
        </div>
      </div>
      <div>
        <div className="momentMomentBottomIconContainer">
          <BiPencil className="momentMomentBottomIcon" />
          <FiMoreHorizontal className="momentMomentBottomIcon" />
        </div>
      </div>
    </div>
  )
}

export default MomentSingle