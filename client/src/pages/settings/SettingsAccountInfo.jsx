import { MdKeyboardArrowRight } from "react-icons/md";

const SettingsAccountInfo = ({ title, text }) => {
  return (
    <>
      <div>
        <p>
          {title}
        </p>
        <p className="activeSettingItemLeftDesc">
          {text}
        </p>
      </div>
      <div className="activeSettingItemRight">
        <MdKeyboardArrowRight className="settingsItemIcon" />
      </div>
    </>
  )
}

export default SettingsAccountInfo