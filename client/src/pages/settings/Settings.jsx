import { AiOutlineSearch, AiOutlineLock, AiOutlineEye } from "react-icons/ai";
import { MdKeyboardArrowRight, MdPhonelinkRing, MdOutlinePersonSearch } from "react-icons/md";
import { BsPerson, BsKey, BsDownload, BsEnvelope, BsFilter, BsBrush } from "react-icons/bs";
import { BiGroup, BiVolumeMute, BiMicrophone } from "react-icons/bi";
import { TbHeartBroken, TbBoxMultiple, TbArrowsLeftRight } from "react-icons/tb";
import { HiOutlineUserGroup } from "react-icons/hi";
import { TiPencil } from "react-icons/ti";
import { RiServerLine, RiShareBoxFill } from "react-icons/ri";
import { GiChart } from "react-icons/gi";
import { GrLocation } from "react-icons/gr";
import { GoGlobe } from "react-icons/go";
import { FiBarChart } from "react-icons/fi";

import "./settings.css";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useState } from "react";
import SettingsAccountItem from "./SettingsAccountItem";
import SettingsAccountSetting from "./SettingsAccountSetting";
import SettingsRightbarNavbar from "./SettingsRightbarNavbar";
import SettingsAccountInfo from "./SettingsAccountInfo";

const Settings = () => {
  const [active, setActive] = useState("account");

  return (
    <div className="settings">
      <Sidebar />
      <div className="settingsMiddle">
        <Navbar title="Settings" />
        <div className="settingsSearchInput">
          <AiOutlineSearch className="settingsSearchInputIcon" />
          <input
            type="text"
            className="settingsInput"
            placeholder="Search Settings"
          />
        </div>
        <div>
          <div
            className={active === "account" ? "settingsItem active" : "settingsItem"}
            onClick={() => setActive("account")}
          >
            <div>Your Account</div>
            <div>
              <MdKeyboardArrowRight className="settingsItemIcon" />
            </div>
          </div>
          <div
            className={active === "security" ? "settingsItem active" : "settingsItem"}
            onClick={() => setActive("security")}
          >
            <div>Security and account access</div>
            <div>
              <MdKeyboardArrowRight className="settingsItemIcon" />
            </div>
          </div>
          <div
            className={active === "privacy" ? "settingsItem active" : "settingsItem"}
            onClick={() => setActive("privacy")}
          >
            <div>Privacy and safety</div>
            <div>
              <MdKeyboardArrowRight className="settingsItemIcon" />
            </div>
          </div>
          <div
            className={active === "notification" ? "settingsItem active" : "settingsItem"}
            onClick={() => setActive("notification")}
          >
            <div>Notifications</div>
            <div>
              <MdKeyboardArrowRight className="settingsItemIcon" />
            </div>
          </div>
          <div
            className={active === "accessibility" ? "settingsItem active" : "settingsItem"}
            onClick={() => setActive("accessibility")}
          >
            <div>Accessibility, display, and languages</div>
            <div>
              <MdKeyboardArrowRight className="settingsItemIcon" />
            </div>
          </div>
          <div
            className={active === "additional" ? "settingsItem active" : "settingsItem"}
            onClick={() => setActive("additional")}
          >
            <div>Additional resources</div>
            <div>
              <MdKeyboardArrowRight className="settingsItemIcon" />
            </div>
          </div>
        </div>
      </div>
      <div className="settingsRight">
        {active === "account" && (
          <div className="settingsRightWrapper">
            <h2 className="settingsRightTitle">Your Account</h2>
            <p className="settingRightText">
              See information about your account, download an archive
              of your data, or learn about your account deactivation
              options
            </p>
            <div onClick={() => setActive("accountInformation")}>
              <SettingsAccountItem
                icon={<BsPerson />}
                title={"Account Information"}
                text={"See your account information like your phone number and email address."}
              />
            </div>
            <div onClick={() => setActive("changePassword")}>
              <SettingsAccountItem
                icon={<BsKey />}
                title={"Change your Password"}
                text={"Change your password at any time."}
              />
            </div>
            <div onClick={() => setActive("download")}>
              <SettingsAccountItem
                icon={<BsDownload />}
                title={"Download an archive of your data"}
                text={"Get insights into the type of information stored for your account."}
              />
            </div>
            <div onClick={() => setActive("tweetDeck")}>
              <SettingsAccountItem
                icon={<BiGroup />}
                title={"TweetDeck Teams"}
                text={"Invite anyone to Tweet from this account using the Teams feature in TweetDeck."}
              />
            </div>
            <div onClick={() => setActive("deactivate")}>
              <SettingsAccountItem
                icon={<TbHeartBroken />}
                title={"Deactivate your account"}
                text={"Find out how you can deactivate your account."}
              />
            </div>
          </div>
        )}
        {active === "security" && (
          <div className="settingsRightWrapper">
            <h2 className="settingsRightTitle">Security and account access</h2>
            <p className="settingRightText">
              Manage your account’s security and keep track of your
              account’s usage including apps that you have connected
              to your account.
            </p>
            <div onClick={() => setActive("manageSecurity")}>
              <SettingsAccountItem
                icon={<AiOutlineLock />}
                title={"Security"}
                text={"Manage your account's security."}
              />
            </div>
            <div onClick={() => setActive("appsSessions")}>
              <SettingsAccountItem
                icon={<TbBoxMultiple />}
                title={"Apps and sessions"}
                text={"See information about when you logged into your account and the apps you connected to your account."}
              />
            </div>
            <div onClick={() => setActive("connectedAccounts")}>
              <SettingsAccountItem
                icon={<TbArrowsLeftRight />}
                title={"Connected accounts"}
                text={"Manage Google or Apple accounts connected to Twitter to log in."}
              />
            </div>
          </div>
        )}
        {active === "privacy" && (
          <div className="settingsRightWrapper">
            <h2 className="settingsRightTitle">Privacy and safety</h2>
            <p className="settingRightText">
              Manage what information you see and share on Twitter.
            </p>
            <h2 className="settingRightSubtitle">
              Your Twitter activity
            </h2>
            <div onClick={() => setActive("audienceTagging")}>
              <SettingsAccountItem
                icon={<HiOutlineUserGroup />}
                title={"Audience and tagging"}
                text={"Manage the information you allow other people on Twitter to see."}
              />
            </div>
            <div onClick={() => setActive("yourTweets")}>
              <SettingsAccountItem
                icon={<TiPencil />}
                title={"Your Tweets"}
                text={"Manage the information associated with your Tweets."}
              />
            </div>
            <div onClick={() => setActive("contentYouSee")}>
              <SettingsAccountItem
                icon={<RiServerLine />}
                title={"Content you see"}
                text={"Decide what you see on Twitter based on your preferences like Topics and interests."}
              />
            </div>
            <div onClick={() => setActive("muteAndBlock")}>
              <SettingsAccountItem
                icon={<BiVolumeMute />}
                title={"Mute and block"}
                text={"Manage the accounts, words, and notifications that you've muted or blocked."}
              />
            </div>
            <div onClick={() => setActive("directMessages")}>
              <SettingsAccountItem
                icon={<BsEnvelope />}
                title={"Direct Messages"}
                text={"Manage who can message you directly."}
              />
            </div>
            <div onClick={() => setActive("spaces")}>
              <SettingsAccountItem
                icon={<BiMicrophone />}
                title={"Spaces"}
                text={"Manage who can see your Spaces listening activity."}
              />
            </div>
            <div onClick={() => setActive("discoverability")}>
              <SettingsAccountItem
                icon={<MdOutlinePersonSearch />}
                title={"Discoverability and contacts"}
                text={"Control your discoverability settings and managa contacts you've imported."}
              />
            </div>
            <div className="settingsHr" />
            <h2 className="settingRightSubtitle">
              Data sharing and off-Twitter activity
            </h2>
            <div onClick={() => setActive("ads")}>
              <SettingsAccountItem
                icon={<RiShareBoxFill />}
                title={"Ads preferences"}
                text={"Manage your ads experience on Twitter."}
              />
            </div>
            <div onClick={() => setActive("offTwitter")}>
              <SettingsAccountItem
                icon={<GiChart />}
                title={"Off-Twitter activity"}
                text={"Manage how Twitter uses your online activity outside of Twitter, such as websites you visited, to personalize your experience."}
              />
            </div>
            <div onClick={() => setActive("dataSharing")}>
              <SettingsAccountItem
                icon={<TbArrowsLeftRight />}
                title={"Data sharing with business partners"}
                text={"Allow sharing of additional information with Twitter's business partners."}
              />
            </div>
            <div onClick={() => setActive("locationInfo")}>
              <SettingsAccountItem
                icon={<GrLocation />}
                title={"Location information"}
                text={"Manage the location information Twitter uses to presonalize your experience."}
              />
            </div>
            <div className="settingsHr" />
            <h2 className="settingRightSubtitle">
              Learn more about privacy on Twitter
            </h2>
            <SettingsAccountItem
              type="bottomItem"
              title={"Privacy center"}
            />
            <SettingsAccountItem
              type="bottomItem"
              title={"Privacy policy"}
            />
            <SettingsAccountItem
              type="bottomItem"
              title={"Contact us"}
            />
            <br />
            <br />
            <br />
          </div>
        )}
        {active === "notification" && (
          <div className="settingsRightWrapper">
            <h2 className="settingsRightTitle">Notifications</h2>
            <p className="settingRightText">
              Select the kinds of notifications you get about your
              activities, interests, and recommendations.
            </p>
            <div onClick={() => setActive("filters")}>
              <SettingsAccountItem
                icon={<BsFilter />}
                title={"Filters"}
                text={"Choose the notifications you'd like to see - and those you don't."}
              />
            </div>
            <div onClick={() => setActive("preferences")}>
              <SettingsAccountItem
                icon={<MdPhonelinkRing />}
                title={"Preferences"}
                text={"Select your preferences by notification type."}
              />
            </div>
          </div>
        )}
        {active === "accessibility" && (
          <div className="settingsRightWrapper">
            <h2 className="settingsRightTitle">Accessibility, display and languages</h2>
            <p className="settingRightText">
              Manage how Twitter content is displayed to you.
            </p>
            <div onClick={() => setActive("accessibilityActive")}>
              <SettingsAccountItem
                icon={<AiOutlineEye />}
                title={"Accessibility"}
                text={"Manage aspects of your Twitter experience such as limiting color contrast and motion."}
              />
            </div>
            <div onClick={() => setActive("display")}>
              <SettingsAccountItem
                icon={<BsBrush />}
                title={"Display"}
                text={"Manage your font size, and background. These settings affect all the Twitter accounts on this browser."}
              />
            </div>
            <div onClick={() => setActive("languages")}>
              <SettingsAccountItem
                icon={<GoGlobe />}
                title={"Languages"}
                text={"Manage which languages are used to personalize your Twitter experience."}
              />
            </div>
            <div onClick={() => setActive("dataUsage")}>
              <SettingsAccountItem
                icon={<FiBarChart />}
                title={"Data usage"}
                text={"Limit how Twitter uses some of your network data. These settings affect all the Twitter accounts on this browser."}
              />
            </div>
          </div>
        )}
        {active === "additional" && (
          <div className="settingsRightWrapper">
            <h2 className="settingsRightTitle">Additional resources</h2>
            <p className="settingRightText">
              Check out other places for helpful information to learn
              more about Twitter products and services.
            </p>
            <h2 className="settingRightSubtitle">
              Release notes
            </h2>
            <SettingsAccountItem
              type="bottomItem"
              title={"Release notes"}
            />
            <div className="settingsHr" />
            <h2 className="settingRightSubtitle">
              Legal
            </h2>
            <SettingsAccountItem
              type="bottomItem"
              title={"Ads info"}
            />
            <SettingsAccountItem
              type="bottomItem"
              title={"Cookie Policy"}
            />
            <SettingsAccountItem
              type="bottomItem"
              title={"Privacy Policy"}
            />
            <SettingsAccountItem
              type="bottomItem"
              title={"Terms of Service"}
            />
            <div className="settingsHr" />
            <h2 className="settingRightSubtitle">
              Miscellaneous
            </h2>
            <SettingsAccountItem
              type="bottomItem"
              title={"About"}
            />
            <SettingsAccountItem
              type="bottomItem"
              title={"Accessibility"}
            />
            <SettingsAccountItem
              type="bottomItem"
              title={"Advertising"}
            />
            <SettingsAccountItem
              type="bottomItem"
              title={"Blog"}
            />
            <SettingsAccountItem
              type="bottomItem"
              title={"Brand Resources"}
            />
            <SettingsAccountItem
              type="bottomItem"
              title={"Careers"}
            />
            <SettingsAccountItem
              type="bottomItem"
              title={"Developers"}
            />
            <SettingsAccountItem
              type="bottomItem"
              title={"Directory"}
            />
            <SettingsAccountItem
              type="bottomItem"
              title={"Help Center"}
            />
            <SettingsAccountItem
              type="bottomItem"
              title={"Marketing"}
            />
            <SettingsAccountItem
              type="bottomItem"
              title={"Status"}
            />
            <SettingsAccountItem
              type="bottomItem"
              title={"Twitter for Business"}
            />
            <br />
            <br />
            <br />
          </div>
        )}
        {active === "accountInformation" && (
          <div className="activeSettingContainer">
            <SettingsRightbarNavbar
              setActive={setActive}
              category="account"
              title="Account information"
            />
            <div className="activeSettingItem">
              <SettingsAccountInfo
                title={"Username"}
                text={"@john_doe"}
              />
            </div>
            <div className="activeSettingItem">
              <SettingsAccountInfo
                title={"Phone"}
                text={"+123456789"}
              />
            </div>
            <div className="activeSettingItem">
              <SettingsAccountInfo
                title={"Email"}
                text={"john@gmail.com"}
              />
            </div>
            <div className="activeSettingItem">
              <SettingsAccountInfo
                title={"Verified"}
                text={"No. "}
              />
            </div>
            <div className="settingsHr" />
            <div className="activeSettingItem">
              <SettingsAccountInfo
                title={"Protected Tweets"}
                text={"No"}
              />
            </div>
            <div className="activeSettingItem">
              <SettingsAccountInfo
                title={"Account creation"}
                text={"Dec 25,2021, 1:20:40 AM"}
              />
            </div>
            <div className="settingsHr" />
            <div className="activeSettingItem">
              <SettingsAccountInfo
                title={"Country"}
                text={"USA"}
              />
            </div>
            <div className="activeSettingItem">
              <SettingsAccountInfo
                title={"Languages"}
                text={"English"}
              />
            </div>
            <div className="activeSettingItem">
              <SettingsAccountInfo
                title={"Gender"}
                text={"Male"}
              />
            </div>
            <div className="activeSettingItem">
              <SettingsAccountInfo
                title={"Birth date"}
                text={"Feb 25, 1998"}
              />
            </div>
            <div className="settingsHr" />
            <div className="activeSettingItem">
              <SettingsAccountInfo
                title={"Age"}
                text={"24"}
              />
            </div>
            <div className="activeSettingItem">
              <SettingsAccountInfo
                title={"Automation"}
                text={"Manage your automated accounts."}
              />
            </div>
            <br />
          </div>
        )}
        {active === "changePassword" && (
          <div className="activeSettingContainer">
            <SettingsRightbarNavbar
              setActive={setActive}
              category="account"
              title="Change your password"
            />
            <div style={{ padding: "10px 15px" }}>
              <SettingsAccountSetting
                title={"changePassword"}
              />
            </div>
          </div>
        )}
        {active === "download" && (
          <div className="activeSettingContainer">
            <SettingsRightbarNavbar
              setActive={setActive}
              category="account"
              title="Download an archive of your data"
            />
            <div style={{ padding: "10px 15px" }}>
              <SettingsAccountSetting
                title={"download"}
              />
            </div>
          </div>
        )}
        {active === "tweetDeck" && (
          <div className="activeSettingContainer">
            <SettingsRightbarNavbar
              setActive={setActive}
              category="account"
              title="TweetDeck Teams"
            />
            <div style={{ padding: "10px 15px" }}>
              <SettingsAccountSetting
                title={"tweetDeck"}
              />
            </div>
          </div>
        )}
        {active === "deactivate" && (
          <div className="activeSettingContainer">
            <SettingsRightbarNavbar
              setActive={setActive}
              category="account"
              title="Deactivate account"
            />
            <div style={{ padding: "10px 15px" }}>
              <SettingsAccountSetting
                title={"deactivate"}
              />
            </div>
          </div>
        )}
        {active === "manageSecurity" && (
          <div className="activeSettingContainer">
            <SettingsRightbarNavbar
              setActive={setActive}
              category="security"
              title="Security"
            />
            <div style={{ padding: "10px 15px" }}>
              <SettingsAccountSetting
                title={"manageSecurity"}
              />
            </div>
          </div>
        )}
        {active === "appsSessions" && (
          <div className="activeSettingContainer">
            <SettingsRightbarNavbar
              setActive={setActive}
              category="security"
              title="Apps and sessions"
            />
            <div style={{ padding: "10px 15px" }}>
              <SettingsAccountSetting
                title={"appsSessions"}
              />
            </div>
          </div>
        )}
        {active === "connectedAccounts" && (
          <div className="activeSettingContainer">
            <SettingsRightbarNavbar
              setActive={setActive}
              category="security"
              title="Connected accounts"
            />
            <div style={{ padding: "10px 15px" }}>
              <SettingsAccountSetting
                title={"connectedAccounts"}
              />
            </div>
          </div>
        )}
        {active === "audienceTagging" && (
          <div className="activeSettingContainer">
            <SettingsRightbarNavbar
              setActive={setActive}
              category="privacy"
              title="Audience and tagging"
            />
            <div style={{ padding: "10px 15px" }}>
              <SettingsAccountSetting
                title={"audienceTagging"}
              />
            </div>
          </div>
        )}
        {active === "yourTweets" && (
          <div className="activeSettingContainer">
            <SettingsRightbarNavbar
              setActive={setActive}
              category="privacy"
              title="Your Tweets"
            />
            <div style={{ padding: "10px 15px" }}>
              <SettingsAccountSetting
                title={"yourTweets"}
              />
            </div>
          </div>
        )}
        {active === "contentYouSee" && (
          <div className="activeSettingContainer">
            <SettingsRightbarNavbar
              setActive={setActive}
              category="privacy"
              title="Content you see"
            />
            <div style={{ padding: "10px 15px" }}>
              <SettingsAccountSetting
                title={"contentYouSee"}
              />
            </div>
          </div>
        )}
        {active === "muteAndBlock" && (
          <div className="activeSettingContainer">
            <SettingsRightbarNavbar
              setActive={setActive}
              category="privacy"
              title="Mute and block"
            />
            <div style={{ padding: "10px 15px" }}>
              <SettingsAccountSetting
                title={"muteAndBlock"}
              />
            </div>
          </div>
        )}
        {active === "directMessages" && (
          <div className="activeSettingContainer">
            <SettingsRightbarNavbar
              setActive={setActive}
              category="privacy"
              title="Direct messages"
            />
            <div style={{ padding: "10px 15px" }}>
              <SettingsAccountSetting
                title={"directMessages"}
              />
            </div>
          </div>
        )}
        {active === "spaces" && (
          <div className="activeSettingContainer">
            <SettingsRightbarNavbar
              setActive={setActive}
              category="privacy"
              title="Spaces"
            />
            <div style={{ padding: "10px 15px" }}>
              <SettingsAccountSetting
                title={"spaces"}
              />
            </div>
          </div>
        )}
        {active === "discoverability" && (
          <div className="activeSettingContainer">
            <SettingsRightbarNavbar
              setActive={setActive}
              category="privacy"
              title="Discoverability and contacts"
            />
            <div style={{ padding: "10px 15px" }}>
              <SettingsAccountSetting
                title={"discoverability"}
              />
            </div>
          </div>
        )}
        {active === "ads" && (
          <div className="activeSettingContainer">
            <SettingsRightbarNavbar
              setActive={setActive}
              category="privacy"
              title="Ads preferences"
            />
            <div style={{ padding: "10px 15px" }}>
              <SettingsAccountSetting
                title={"ads"}
              />
            </div>
          </div>
        )}
        {active === "offTwitter" && (
          <div className="activeSettingContainer">
            <SettingsRightbarNavbar
              setActive={setActive}
              category="privacy"
              title="Off-Twitter activity"
            />
            <div style={{ padding: "10px 15px" }}>
              <SettingsAccountSetting
                title={"offTwitter"}
              />
            </div>
          </div>
        )}
        {active === "dataSharing" && (
          <div className="activeSettingContainer">
            <SettingsRightbarNavbar
              setActive={setActive}
              category="privacy"
              title="Data sharing and business partners"
            />
            <div style={{ padding: "10px 15px" }}>
              <SettingsAccountSetting
                title={"dataSharing"}
              />
            </div>
          </div>
        )}
        {active === "locationInfo" && (
          <div className="activeSettingContainer">
            <SettingsRightbarNavbar
              setActive={setActive}
              category="privacy"
              title="Location information"
            />
            <div style={{ padding: "10px 15px" }}>
              <SettingsAccountSetting
                title={"locationInfo"}
              />
            </div>
          </div>
        )}
        {active === "filters" && (
          <div className="activeSettingContainer">
            <SettingsRightbarNavbar
              setActive={setActive}
              category="notification"
              title="Filters"
            />
            <div style={{ padding: "10px 15px" }}>
              <SettingsAccountSetting
                title={"filters"}
              />
            </div>
          </div>
        )}
        {active === "preferences" && (
          <div className="activeSettingContainer">
            <SettingsRightbarNavbar
              setActive={setActive}
              category="notification"
              title="Preferences"
            />
            <div style={{ padding: "10px 15px" }}>
              <SettingsAccountSetting
                title={"preferences"}
              />
            </div>
          </div>
        )}
        {active === "accessibilityActive" && (
          <div className="activeSettingContainer">
            <SettingsRightbarNavbar
              setActive={setActive}
              category="accessibility"
              title="Accessibility"
            />
            <div style={{ padding: "10px 15px" }}>
              <SettingsAccountSetting
                title={"accessibilityActive"}
              />
            </div>
          </div>
        )}
        {active === "display" && (
          <div className="activeSettingContainer">
            <SettingsRightbarNavbar
              setActive={setActive}
              category="accessibility"
              title="Display"
            />
            <div style={{ padding: "10px 15px" }}>
              <SettingsAccountSetting
                title={"display"}
              />
            </div>
          </div>
        )}
        {active === "languages" && (
          <div className="activeSettingContainer">
            <SettingsRightbarNavbar
              setActive={setActive}
              category="accessibility"
              title="Languages"
            />
            <div style={{ padding: "10px 15px" }}>
              <SettingsAccountSetting
                title={"languages"}
              />
            </div>
          </div>
        )}
        {active === "dataUsage" && (
          <div className="activeSettingContainer">
            <SettingsRightbarNavbar
              setActive={setActive}
              category="accessibility"
              title="Data usage"
            />
            <div style={{ padding: "10px 15px" }}>
              <SettingsAccountSetting
                title={"dataUsage"}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Settings