import { BsArrowLeft } from "react-icons/bs";

const SettingsRightbarNavbar = ({ setActive, category, title }) => {
  const handleGoBack = () => {
    if (category === "account") {
      setActive("account");
    } else if (category === "security") {
      setActive("security");
    } else if (category === "privacy") {
      setActive("privacy");
    } else if (category === "notification") {
      setActive("notification");
    } else if (category === "accessibility") {
      setActive("accessibility");
    }
  };

  return (
    <>
      <div className="activeSettingNavbar">
        <BsArrowLeft
          className="activeSettingNavbarIcon"
          onClick={handleGoBack}
        />
        <h3>{title}</h3>
      </div>
    </>
  )
}

export default SettingsRightbarNavbar