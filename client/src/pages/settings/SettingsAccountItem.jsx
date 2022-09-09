import { MdKeyboardArrowRight } from "react-icons/md";
import { FiArrowUpRight } from "react-icons/fi";

const SettingsAccountItem = ({ icon, title, text, type }) => {
  return (
    <>
      {type === "bottomItem" ? (
        <div className="settingsRightItem">
          <div className="settingsRightItemLeft">
            <div>
              <div>{title}</div>
            </div>
          </div>
          <div>
            <FiArrowUpRight className="settingsItemIconBottom" />
          </div>
        </div>
      ) : (
        <div className="settingsRightItem">
          <div className="settingsRightItemLeft">
            <div className="settingsRightItemIcon">
              {icon}
            </div>
            <div>
              <div>{title}</div>
              <p className="settingsRightItemText">
                {text}
              </p>
            </div>
          </div>
          <div>
            <MdKeyboardArrowRight className="settingsItemIcon" />
          </div>
        </div>
      )}
    </>
  )
}

export default SettingsAccountItem