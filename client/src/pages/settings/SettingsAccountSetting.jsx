import { Link } from "react-router-dom"
import { MdKeyboardArrowRight } from "react-icons/md";
import { FiArrowUpRight } from "react-icons/fi";
import { AiOutlineCheck } from "react-icons/ai";

import SettingsAccountItem from "./SettingsAccountItem"
import { useState } from "react";

const SettingsAccountSetting = ({ title }) => {
  const [selectedColor, setSelectedColor] = useState("blue");
  const [selectedTheme, setSelectedTheme] = useState("default");

  return (
    <>
      {title === "changePassword" && (
        <div>
          <input
            type="password"
            placeholder="Current password"
            className="activeSettingItemInput"
          />
          <p className="activeSettingForgotPassword">
            Forgot password?
          </p>
          <div className="settingsHr" />
          <input
            type="password"
            placeholder="New password"
            className="activeSettingItemInput"
          />
          <input
            type="password"
            placeholder="Confirm password"
            className="activeSettingItemInput"
            style={{ marginTop: "25px" }}
          />
          <div className="settingsHr" style={{ marginTop: "15px" }} />
          <p className="activeSettingDescText">
            Changing your password will log you out of all your active
            Twitter sessions except the one you’re using at this time.
            The <span className="activeSettingSpan">16 applications</span> with
            access to your account won’t be
            affected. <span className="activeSettingSpan">Learn more</span>
          </p>
          <div className="settingsHr" style={{ marginTop: "15px" }} />
          <div className="activeSettingItemButtonContainer">
            <button className="activeSettingItemButton">
              Save
            </button>
          </div>
        </div>
      )}
      {title === "download" && (
        <>
          <div className="activeSettingDescText">
            Get insights into the type of information stored for your
            account.
          </div>
          <h2 className="activeSettingTitle">Twitter data</h2>
          <div className="activeSettingDescText">
            You can request a ZIP file with an archive of your account
            information, account history, apps and devices, account
            activity, interests, and Ads data. You’ll get an in-app
            notification when the archive of your data is ready to
            download. <span className="activeSettingSpan">Learn more</span>
          </div>
          <div className="activeSettingRequestContainer">
            <div>Twitter</div>
            <button className="activeSettingItemButton">
              Request archive
            </button>
          </div>
          <div className="settingsHr" />
          <h3>
            Periscope data
          </h3>
          <SettingsAccountItem
            type="bottomItem"
            title={"You can request an archive of your Periscope data on Periscope directly."}
          />
        </>
      )}
      {title === "tweetDeck" && (
        <div className="activeSettingTweetDeckContainer">
          <div className="activeSettingDescText">
            Invite anyone to Tweet from this account using the Teams
            feature in TweetDeck.
          </div>
          <div className="activeSettingTweetDeckSwitchContainer">
            <div>
              <h3 style={{ marginTop: "25px", marginBottom: "5px" }}>
                Turn on TweetDeck Teams
              </h3>
              <div className="activeSettingDescText">
                When this setting is on, you can invite anyone to Tweet
                from this account using TweetDeck
                Teams. <span className="activeSettingSpan">Learn more</span>
              </div>
            </div>
            <div>
              <div className="activeSettingTweetDeckSwitch">
                switch
              </div>
            </div>
          </div>
          <div className="settingsHr" style={{ marginTop: "15px" }} />
          <div className="activeSettingCheckboxContainer">
            <div>Allow anyone to add you to their team</div>
            <input
              type="checkbox"
              className="activeSettingCheckboxInput"
              checked
            />
          </div>
          <div className="activeSettingCheckboxContainer">
            <div>Only allow people you follow to add you to their team</div>
            <input
              type="checkbox"
              className="activeSettingCheckboxInput"
            />
          </div>
        </div>
      )}
      {title === "deactivate" && (
        <>
          <Link to="/profile/123" className="link">
            <div className="activeSettingDeactivateProfileContainer">
              <img
                src="https://cdn.pixabay.com/photo/2018/04/27/03/50/portrait-3353699_960_720.jpg"
                alt=""
                className="activeSettingDeactivateProfileImg"
              />
              <div>
                <p className="sidebarProfileUserMoreUserName">John Doe</p>
                <p className="sidebarProfileUserMoreUserTags">@john_doe</p>
              </div>
            </div>
          </Link>
          <div>
            <h3 className="activeSettingDeactivateTitle">
              This will deactivate your account
            </h3>
            <p className="activeSettingDeactivateText">
              You’re about to start the process of deactivating your
              Twitter account. Your display name, @username, and
              public profile will no longer be viewable on Twitter.com,
              Twitter for iOS, or Twitter for Android.
            </p>
            <h3 className="activeSettingDeactivateTitle">
              What else you should know
            </h3>
            <p className="activeSettingDeactivateText">
              You can restore your Twitter account if it was
              accidentally or wrongfully deactivated for up to 30
              days after deactivation.
            </p>
            <div className="settingsHr" style={{ marginTop: "15px" }} />
            <p className="activeSettingDeactivateText">
              Some account information may still be available
              in search engines, such as Google or
              Bing. <span className="activeSettingSpan">Learn more</span>
            </p>
            <div className="settingsHr" style={{ marginTop: "15px" }} />
            <p className="activeSettingDeactivateText">
              If you just want to change your @username, you don’t
              need to deactivate your account — edit it in
              your <span className="activeSettingSpan">settings</span>.
            </p>
            <div className="settingsHr" style={{ marginTop: "15px" }} />
            <p className="activeSettingDeactivateText">
              To use your current @username or email address with a
              different Twitter account, <span className="activeSettingSpan">change them</span> before
              you deactivate this account.
            </p>
            <div className="settingsHr" style={{ marginTop: "15px" }} />
            <p className="activeSettingDeactivateText">
              If you want to download your <span className="activeSettingSpan">Twitter data</span>,
              you’ll need to complete both the request and download process
              before deactivating your account. Links to download your data
              cannot be sent to deactivated accounts.
            </p>
            <div className="settingsHr" style={{ marginTop: "15px" }} />
            <div className="activeSettingDeactivateButton">Deactivate</div>
          </div>
        </>
      )}
      {title === "manageSecurity" && (
        <>
          <p className="activeSettingDeactivateText">
            Manage your account’s security.
          </p>
          <h3 className="activeSettingDeactivateTitle">
            What else you should know
          </h3>
          <p className="activeSettingDeactivateText">
            Help protect your account from unauthorized access
            by requiring a second authentication method in addition
            to your Twitter password. You can choose a text message,
            authentication app, or security
            key. <span className="activeSettingSpan">Learn more</span>
          </p>
          <div className="activeSettingItem" style={{ paddingLeft: "0", paddingRight: "0" }}>
            <div>Two-factor authentication</div>
            <div>
              <MdKeyboardArrowRight className="settingsItemIcon" />
            </div>
          </div>
          <div className="settingsHr" />
          <h3 className="activeSettingDeactivateTitle">
            Additional password protection
          </h3>
          <p className="activeSettingDeactivateText">
            Enabling this setting adds extra security to your account
            by requiring additional information to reset your password.
            If enabled, you must provide either the phone number or email
            address associated with your account in order to reset your
            password.
          </p>
          <div className="activeSettingManageSecurityInputContainer">
            <div>
              <div>Password reset protect</div>
              <span className="activeSettingSpan" style={{ fontSize: "13px" }}>
                Learn more
              </span>
            </div>
            <input
              type="checkbox"
              className="activeSettingManageSecurityInput"
            />
          </div>
        </>
      )}
      {title === "appsSessions" && (
        <>
          <p className="activeSettingDeactivateText">
            See information about when you logged into your account and
            the apps you connected to your account.
          </p>
          <br />
          <div className="activeSettingItem" style={{ paddingLeft: "0", paddingRight: "0" }}>
            <div>Connected apps</div>
            <div>
              <MdKeyboardArrowRight className="settingsItemIcon" />
            </div>
          </div>
          <div className="activeSettingItem" style={{ paddingLeft: "0", paddingRight: "0" }}>
            <div>Sessions</div>
            <div>
              <MdKeyboardArrowRight className="settingsItemIcon" />
            </div>
          </div>
          <div className="activeSettingItem" style={{ paddingLeft: "0", paddingRight: "0" }}>
            <div>Account access history</div>
            <div>
              <MdKeyboardArrowRight className="settingsItemIcon" />
            </div>
          </div>
          <div className="activeSettingItem" style={{ paddingLeft: "0", paddingRight: "0" }}>
            <div>Logged-in devices and apps</div>
            <div>
              <MdKeyboardArrowRight className="settingsItemIcon" />
            </div>
          </div>
        </>
      )}
      {title === "connectedAccounts" && (
        <p className="activeSettingDeactivateText">
          These are the social accounts you connected to your
          Twitter account to log in. You can disable access here.
        </p>
      )}
      {title === "audienceTagging" && (
        <>
          <p className="activeSettingDeactivateText">
            Manage what information you allow other people on
            Twitter to see.
          </p>
          <div className="activeSettingManageSecurityInputContainer">
            <div>
              <div style={{ marginBottom: "5px" }}>Protect your tweets</div>
              <p className="activeSettingDeactivateText">
                When selected, your Tweets and other account information
                are only visible to people who follow
                you. <span className="activeSettingSpan">Learn more</span>
              </p>
            </div>
            <input
              type="checkbox"
              className="activeSettingManageSecurityInput"
            />
          </div>
          <div className="activeSettingItem" style={{ paddingLeft: "0", paddingRight: "0" }}>
            <div>
              <div>Photo tagging</div>
              <p className="activeSettingDeactivateText">
                Anyone can tag you
              </p>
            </div>
            <div>
              <MdKeyboardArrowRight className="settingsItemIcon" />
            </div>
          </div>
        </>
      )}
      {title === "yourTweets" && (
        <>
          <p className="activeSettingDeactivateText">
            Manage the information associated with your Tweets.
          </p>
          <div className="activeSettingManageSecurityInputContainer">
            <div>
              <div style={{ marginBottom: "5px" }}>
                Mark media you Tweet as having material that may be sensitive
              </div>
              <p className="activeSettingDeactivateText">
                When enabled, pictures and videos you Tweet will be
                marked as sensitive for people who don’t want to see
                sensitive content. <span className="activeSettingSpan">Learn more</span>
              </p>
            </div>
            <input
              type="checkbox"
              className="activeSettingManageSecurityInput"
            />
          </div>
          <div className="activeSettingItem" style={{ paddingLeft: "0", paddingRight: "0" }}>
            <div>
              <div>Add location information to your Tweets</div>
            </div>
            <div>
              <MdKeyboardArrowRight className="settingsItemIcon" />
            </div>
          </div>
        </>
      )}
      {title === "contentYouSee" && (
        <>
          <p className="activeSettingDeactivateText">
            Decide what you see on Twitter based on your preferences
            like Topics and interests
          </p>
          <div
            className="activeSettingManageSecurityInputContainer"
            style={{ marginBottom: "20px" }}
          >
            <div>
              <div style={{ marginBottom: "5px" }}>
                Display media that may contain sensitive content
              </div>
            </div>
            <input
              type="checkbox"
              className="activeSettingManageSecurityInput"
            />
          </div>
          <div className="activeSettingItem" style={{ paddingLeft: "0", paddingRight: "0" }}>
            <div>
              <div>Topics</div>
            </div>
            <div>
              <MdKeyboardArrowRight className="settingsItemIcon" />
            </div>
          </div>
          <div className="activeSettingItem" style={{ paddingLeft: "0", paddingRight: "0" }}>
            <div>
              <div>Interests</div>
            </div>
            <div>
              <MdKeyboardArrowRight className="settingsItemIcon" />
            </div>
          </div>
          <div className="activeSettingItem" style={{ paddingLeft: "0", paddingRight: "0" }}>
            <div>
              <div>Explore settings</div>
            </div>
            <div>
              <MdKeyboardArrowRight className="settingsItemIcon" />
            </div>
          </div>
          <div className="activeSettingItem" style={{ paddingLeft: "0", paddingRight: "0" }}>
            <div>
              <div>Search settings</div>
            </div>
            <div>
              <MdKeyboardArrowRight className="settingsItemIcon" />
            </div>
          </div>
        </>
      )}
      {title === "muteAndBlock" && (
        <>
          <p
            className="activeSettingDeactivateText"
            style={{ marginBottom: "15px" }}
          >
            Manage the accounts, words, and notifications that
            you’ve muted or blocked.
          </p>
          <div className="activeSettingItem" style={{ paddingLeft: "0", paddingRight: "0" }}>
            <div>
              <div>Blocked accounts</div>
            </div>
            <div>
              <MdKeyboardArrowRight className="settingsItemIcon" />
            </div>
          </div>
          <div className="activeSettingItem" style={{ paddingLeft: "0", paddingRight: "0" }}>
            <div>
              <div>Muted accounts</div>
            </div>
            <div>
              <MdKeyboardArrowRight className="settingsItemIcon" />
            </div>
          </div>
          <div className="activeSettingItem" style={{ paddingLeft: "0", paddingRight: "0" }}>
            <div>
              <div>Muted words</div>
            </div>
            <div>
              <MdKeyboardArrowRight className="settingsItemIcon" />
            </div>
          </div>
          <div className="activeSettingItem" style={{ paddingLeft: "0", paddingRight: "0" }}>
            <div>
              <div>Muted notifications</div>
            </div>
            <div>
              <MdKeyboardArrowRight className="settingsItemIcon" />
            </div>
          </div>
        </>
      )}
      {title === "directMessages" && (
        <>
          <p
            className="activeSettingDeactivateText"
            style={{ marginBottom: "15px" }}
          >
            Manage who can message you directly.
          </p>
          <div
            className="activeSettingManageSecurityInputContainer"
            style={{ marginBottom: "20px" }}
          >
            <div>
              <div style={{ marginBottom: "5px" }}>
                Allow message requests from everyone
              </div>
              <p className="activeSettingDeactivateText">
                Let people who you don’t follow send you message
                requests and add you to group conversations. To reply
                to their messages, you need to accept the
                request. <span className="activeSettingSpan">Learn more</span>
              </p>
            </div>
            <input
              type="checkbox"
              className="activeSettingManageSecurityInput"
            />
          </div>
          <div
            className="activeSettingManageSecurityInputContainer"
            style={{ marginBottom: "20px" }}
          >
            <div>
              <div style={{ marginBottom: "5px" }}>
                Filter low-quality messages
              </div>
              <p className="activeSettingDeactivateText">
                Hide message requests that have been detected as being
                potentially spam or low-quality. These will be sent to a
                separate inbox at the bottom of your message requests.
                You can still access them if you
                want. <span className="activeSettingSpan">Learn more</span>
              </p>
            </div>
            <input
              type="checkbox"
              className="activeSettingManageSecurityInput"
            />
          </div>
          <div
            className="activeSettingManageSecurityInputContainer"
            style={{ marginBottom: "20px" }}
          >
            <div>
              <div style={{ marginBottom: "5px" }}>
                Show read receipts
              </div>
              <p className="activeSettingDeactivateText">
                Let people you’re messaging with know when you’ve seen
                their messages. Read receipts are not shown on message
                requests. <span className="activeSettingSpan">Learn more</span>
              </p>
            </div>
            <input
              type="checkbox"
              className="activeSettingManageSecurityInput"
            />
          </div>
        </>
      )}
      {title === "spaces" && (
        <>
          <p className="activeSettingDeactivateText">
            Manage who can see your Spaces listening activity
          </p>
          <div className="activeSettingTweetDeckSwitchContainer">
            <div>
              <div style={{ marginTop: "25px", marginBottom: "10px" }}>
                Allow followers to see which Spaces you’re listening to
              </div>
              <div className="activeSettingDescText">
                Keep in mind that even with this setting turned off
                you will be visible to everyone when you’re in a Space.
                Your followers can always see what Spaces you’re hosting,
                co-hosting or speaking in.  <span className="activeSettingSpan">Learn more</span>
              </div>
            </div>
            <div>
              <div className="activeSettingTweetDeckSwitch">
                switch
              </div>
            </div>
          </div>
        </>
      )}
      {title === "discoverability" && (
        <>
          <p className="activeSettingDeactivateText">
            Control your discoverability settings and manage contacts
            you’ve imported.
          </p>
          <h3 style={{ marginTop: "20px" }}>Discoverability</h3>
          <div
            className="activeSettingManageSecurityInputContainer"
            style={{ marginBottom: "20px" }}
          >
            <div>
              <div style={{ marginBottom: "5px" }}>
                Let people who have your email address find your Twitter
              </div>
              <p className="activeSettingDeactivateText">
                Let people who have your email address find and connect
                with you on Twitter. <span className="activeSettingSpan">Learn more</span>
              </p>
            </div>
            <input
              type="checkbox"
              className="activeSettingManageSecurityInput"
              checked
            />
          </div>
          <div
            className="activeSettingManageSecurityInputContainer"
            style={{ marginBottom: "20px" }}
          >
            <div>
              <div style={{ marginBottom: "5px" }}>
                Let people who have your phone number find your Twitter
              </div>
              <p className="activeSettingDeactivateText">
                Let people who have your phone number find and connect
                with you on Twitter. <span className="activeSettingSpan">Learn more</span>
              </p>
            </div>
            <input
              type="checkbox"
              className="activeSettingManageSecurityInput"
            />
          </div>
          <div className="settingsHr" />
          <h3 style={{ marginBottom: "15px" }}>Contacts</h3>
          <p className="activeSettingDeactivateText">
            Manage contacts that you have imported from your
            mobile devices. <span className="activeSettingSpan">Learn more</span>
          </p>
          <div className="activeSettingItem" style={{ paddingLeft: "0", paddingRight: "0" }}>
            <div>
              <div>Manage contacts</div>
            </div>
            <div>
              <MdKeyboardArrowRight className="settingsItemIcon" />
            </div>
          </div>
        </>
      )}
      {title === "ads" && (
        <>
          <p className="activeSettingDeactivateText">
            Manage your ads experience on Twitter.
          </p>
          <div
            className="activeSettingManageSecurityInputContainer"
            style={{ marginBottom: "20px" }}
          >
            <div>
              <div style={{ marginBottom: "5px" }}>
                Personalize ads
              </div>
              <p className="activeSettingDeactivateText">
                You will always see ads on Twitter based on your Twitter
                activity. When this setting is enabled, Twitter may
                further personalize ads from Twitter advertisers, on
                and off Twitter, by combining your Twitter activity with
                other online activity and information from our
                partners. <span className="activeSettingSpan">Learn more</span>
              </p>
            </div>
            <input
              type="checkbox"
              className="activeSettingManageSecurityInput"
            />
          </div>
          <div className="activeSettingItem" style={{ paddingLeft: "0", paddingRight: "0" }}>
            <div>
              <div>Interests</div>
            </div>
            <div>
              <MdKeyboardArrowRight className="settingsItemIcon" />
            </div>
          </div>
          <div className="activeSettingItem" style={{ paddingLeft: "0", paddingRight: "0" }}>
            <div>
              <div>Your advertiser list</div>
            </div>
            <div>
              <MdKeyboardArrowRight className="settingsItemIcon" />
            </div>
          </div>
        </>
      )}
      {title === "offTwitter" && (
        <>
          <p className="activeSettingDeactivateText">
            Manage how Twitter uses your online activity outside of
            Twitter, such as the websites you visit, to personalize your
            experience.
          </p>
          <div
            className="activeSettingManageSecurityInputContainer"
            style={{ marginBottom: "20px" }}
          >
            <div>
              <div style={{ marginBottom: "5px" }}>
                Allow use of where you see Twitter content across the Web
              </div>
              <p className="activeSettingDeactivateText">
                This setting lets Twitter keep track of your visits to
                other websites that integrate Twitter content, such as
                embedded timelines. That information makes Twitter better
                for you, such as by personalizing your experience. This
                web browsing history will never be stored with your name,
                email, or phone number. <span className="activeSettingSpan">Learn more</span>
              </p>
            </div>
            <input
              type="checkbox"
              className="activeSettingManageSecurityInput"
              defaultChecked
            />
          </div>
          <div
            className="activeSettingManageSecurityInputContainer"
            style={{ marginBottom: "20px" }}
          >
            <div>
              <div style={{ marginBottom: "5px" }}>
                Personalize based on your inferred identity
              </div>
              <p className="activeSettingDeactivateText">
                Twitter will always personalize your experience based on
                information you’ve provided, as well as the devices
                you’ve used to log in. When this setting is enabled,
                Twitter may also personalize based on other inferences
                about your identity, like devices and browsers you haven’t
                used to log in to Twitter or email addresses and phone
                numbers similar to those linked to your Twitter
                account. <span className="activeSettingSpan">Learn more</span>
              </p>
            </div>
            <input
              type="checkbox"
              className="activeSettingManageSecurityInput"
              defaultChecked
            />
          </div>
        </>
      )}
      {title === "dataSharing" && (
        <>
          <p className="activeSettingDeactivateText">
            Allow sharing of additional information with Twitter’s
            business partners.
          </p>
          <div
            className="activeSettingManageSecurityInputContainer"
            style={{ marginBottom: "20px" }}
          >
            <div>
              <div style={{ marginBottom: "5px" }}>
                Allow additional information sharing with business partners
              </div>
              <p className="activeSettingDeactivateText">
                Twitter always shares information with business partners
                as a way to run and improve its products. When enabled,
                this allows Twitter to share additional information with
                those partners to help support running Twitter’s
                business, including making Twitter’s marketing activities
                on other sites and apps more relevant for
                you. <span className="activeSettingSpan">Learn more</span>
              </p>
            </div>
            <input
              type="checkbox"
              className="activeSettingManageSecurityInput"
              defaultChecked
            />
          </div>
        </>
      )}
      {title === "locationInfo" && (
        <>
          <p className="activeSettingDeactivateText">
            Manage the location information Twitter uses to
            personalize your experience.
          </p>
          <div
            className="activeSettingManageSecurityInputContainer"
            style={{ marginBottom: "20px" }}
          >
            <div>
              <div style={{ marginBottom: "5px" }}>
                Personalize based on places you've been
              </div>
              <p className="activeSettingDeactivateText">
                Twitter always uses some information, like where you
                signed up and your current location, to help show you
                more relevant content. When this setting is enabled,
                Twitter may also personalize your experience based on
                other places you’ve been.
              </p>
            </div>
            <input
              type="checkbox"
              className="activeSettingManageSecurityInput"
              defaultChecked
            />
          </div>
          <div className="activeSettingItem" style={{ paddingLeft: "0", paddingRight: "0" }}>
            <div>
              <div>See places you've been</div>
            </div>
            <div>
              <MdKeyboardArrowRight className="settingsItemIcon" />
            </div>
          </div>
          <div className="activeSettingItem" style={{ paddingLeft: "0", paddingRight: "0" }}>
            <div>
              <div>Add location information to your Tweets</div>
            </div>
            <div>
              <MdKeyboardArrowRight className="settingsItemIcon" />
            </div>
          </div>
          <div className="activeSettingItem" style={{ paddingLeft: "0", paddingRight: "0" }}>
            <div>
              <div>Explore settings</div>
            </div>
            <div>
              <MdKeyboardArrowRight className="settingsItemIcon" />
            </div>
          </div>
        </>
      )}
      {title === "filters" && (
        <>
          <p className="activeSettingDeactivateText">
            Choose the notifications you’d like to see — and those
            you don’t.
          </p>
          <div
            className="activeSettingManageSecurityInputContainer"
            style={{ marginBottom: "20px" }}
          >
            <div>
              <div style={{ marginBottom: "5px" }}>
                Personalize based on places you've been
              </div>
              <p className="activeSettingDeactivateText">
                Choose to filter out content such as duplicate or
                automated Tweets. This doesn’t apply to notifications
                from accounts you follow or have interacted with
                recently. <span className="activeSettingSpan">Learn more</span>
              </p>
            </div>
            <input
              type="checkbox"
              className="activeSettingManageSecurityInput"
              defaultChecked
            />
          </div>
          <div className="activeSettingItem" style={{ paddingLeft: "0", paddingRight: "0" }}>
            <div>
              <div>Muted notification</div>
            </div>
            <div>
              <MdKeyboardArrowRight className="settingsItemIcon" />
            </div>
          </div>
        </>
      )}
      {title === "preferences" && (
        <>
          <p className="activeSettingDeactivateText">
            Select your preferences by notification type. <span className="activeSettingSpan">Learn more</span>
          </p>
          <div className="activeSettingItem" style={{ paddingLeft: "0", paddingRight: "0" }}>
            <div>
              <div>Push notifications</div>
            </div>
            <div>
              <MdKeyboardArrowRight className="settingsItemIcon" />
            </div>
          </div>
          <div className="activeSettingItem" style={{ paddingLeft: "0", paddingRight: "0" }}>
            <div>
              <div>Email notifications</div>
            </div>
            <div>
              <MdKeyboardArrowRight className="settingsItemIcon" />
            </div>
          </div>
        </>
      )}
      {title === "accessibilityActive" && (
        <>
          <p className="activeSettingDeactivateText">
            Manage aspects of your Twitter experience such as limiting
            color contrast and motion. These settings affect all the Twitter
            accounts on this browser.
          </p>
          <h3 style={{ marginTop: "20px" }}>Vision</h3>
          <div
            className="activeSettingManageSecurityInputContainer"
            style={{ marginBottom: "20px" }}
          >
            <div>
              <div style={{ marginBottom: "5px" }}>
                Increase color contrast
              </div>
              <p className="activeSettingDeactivateText">
                Improves legibility by increasing the contrast between
                text and background colors.
              </p>
            </div>
            <input
              type="checkbox"
              className="activeSettingManageSecurityInput"
            />
          </div>
          <div className="settingsHr" />
          <h3>Motion</h3>
          <div
            className="activeSettingManageSecurityInputContainer"
            style={{ marginBottom: "20px" }}
          >
            <div>
              <div style={{ marginBottom: "5px" }}>
                Reduct motion
              </div>
              <p className="activeSettingDeactivateText">
                Limits the amount of in-app animations, including live
                engagement counts.
              </p>
            </div>
            <input
              type="checkbox"
              className="activeSettingManageSecurityInput"
            />
          </div>
          <div className="activeSettingItem" style={{ paddingLeft: "0", paddingRight: "0" }}>
            <div>
              <div>Autoplay</div>
              <p className="activeSettingDeactivateText">
                On cellular or Wi-Fi
              </p>
            </div>
            <div>
              <MdKeyboardArrowRight className="settingsItemIcon" />
            </div>
          </div>
          <div className="settingsHr" />
          <div className="activeSettingItem" style={{ paddingLeft: "0", paddingRight: "0" }}>
            <div>
              <div>Accessibility on Twitter</div>
            </div>
            <div>
              <FiArrowUpRight className="settingsItemIcon" style={{ fontSize: "20px" }} />
            </div>
          </div>
        </>
      )}
      {title === "display" && (
        <>
          <p className="activeSettingDeactivateText">
            Manage your font size, color, and background.
            These settings affect all the Twitter accounts on this
            browser.
          </p>
          <div className="postWrapper" style={{ padding: "0", margin: "20px 0" }}>
            <div className="postProfileImgContainer">
              <img
                src="https://www.pngkey.com/png/full/2-27646_twitter-logo-png-transparent-background-logo-twitter-png.png"
                alt="twitter logo"
                className="postProfileImg"
              />
            </div>
            <div className="postContainer">
              <div className="postTop">
                <div className="postTopUserInfo">
                  <p className="postTopUserName">Twitter</p>
                  <p className="postTopUserTags">@Twitter</p>
                  <p className="postTopPosted">12m</p>
                </div>
              </div>
              <div className="postDesc">
                At the heart of Twitter are short messages called
                Tweets - just like this one - which can include photos,
                videos, links, text, hashtags, and mentions
                like <span className="activeSettingSpan">@Twitter</span>.
              </div>
            </div>
          </div>
          <div className="settingsHr" />
          <div>
            <h3>Font size</h3>
            <div className="displayFontSizeSlider">
              <span className="displayFontSizeSmall">Aa</span>
              <div className="displayFontSizeLine">
                <div className="displayFontSizeCircle1 circle" />
                <div className="displayFontSizeCircle2 circle" />
                <div className="displayFontSizeCircle3 circle" />
                <div className="displayFontSizeCircle4 circle" />
                <div className="displayFontSizeCircle5 circle" />
              </div>
              <span className="displayFontSizeLarge">Aa</span>
            </div>
          </div>
          <div className="settingsHr" />
          <h3>Color</h3>
          <div className="displayColorsContainer">
            <div className="displayColorBlue" onClick={() => setSelectedColor("blue")}>
              {selectedColor === "blue" && <AiOutlineCheck className="displayColorChecked" />}
            </div>
            <div className="displayColorYellow" onClick={() => setSelectedColor("yellow")}>
              {selectedColor === "yellow" && <AiOutlineCheck className="displayColorChecked" />}
            </div>
            <div className="displayColorPink" onClick={() => setSelectedColor("pink")}>
              {selectedColor === "pink" && <AiOutlineCheck className="displayColorChecked" />}
            </div>
            <div className="displayColorPurple" onClick={() => setSelectedColor("purple")}>
              {selectedColor === "purple" && <AiOutlineCheck className="displayColorChecked" />}
            </div>
            <div className="displayColorOrange" onClick={() => setSelectedColor("orange")}>
              {selectedColor === "orange" && <AiOutlineCheck className="displayColorChecked" />}
            </div>
            <div className="displayColorGreen" onClick={() => setSelectedColor("green")}>
              {selectedColor === "green" && <AiOutlineCheck className="displayColorChecked" />}
            </div>
          </div>
          <div className="settingsHr" />
          <h3>Background</h3>
          <div className="displayThemesContainer">
            <div
              className={selectedTheme === "default" ? "displayThemeItemActive default" : "displayThemeItem default"}
              onClick={() => setSelectedTheme("default")}
            >
              <input
                type="checkbox"
                className="displayItemCheckbox"
                checked={selectedTheme === "default"}
              />
              <h4>Default</h4>
            </div>
            <div
              className={selectedTheme === "dim" ? "displayThemeItemActive dim" : "displayThemeItem dim"}
              onClick={() => setSelectedTheme("dim")}
            >
              <input
                type="checkbox"
                className="displayItemCheckbox"
                checked={selectedTheme === "dim"}
              />
              <h4>Dim</h4>
            </div>
            <div
              className={selectedTheme === "lightsOut" ? "displayThemeItemActive lightsOut" : "displayThemeItem lightsOut"}
              onClick={() => setSelectedTheme("lightsOut")}
            >
              <input
                type="checkbox"
                className="displayItemCheckbox"
                checked={selectedTheme === "lightsOut"}
              />
              <h4>Lights out</h4>
            </div>
          </div>
        </>
      )}
      {title === "languages" && (
        <>
          <p className="activeSettingDeactivateText">
            Manage which languages are used to personalize your
            Twitter experience.
          </p>
          <h3 style={{ margin: "20px 0" }}>Display language</h3>
          <p className="activeSettingDeactivateText">
            Select your preferred language for headlines, buttons,
            and other text from Twitter.
          </p>
          <div className="activeSettingItem" style={{ paddingLeft: "0", paddingRight: "0", marginTop: "10px" }}>
            <div>
              <div>
                Display language
              </div>
              <p className="activeSettingDeactivateText">
                English
              </p>
            </div>
            <div>
              <MdKeyboardArrowRight className="settingsItemIcon" />
            </div>
          </div>
          <div className="settingsHr" />
          <h3 style={{ marginBottom: "20px" }}>Select additional languages</h3>
          <p className="activeSettingDeactivateText">
            Select additional languages for the content you want to
            see on Twitter.
          </p>
          <div className="activeSettingItem" style={{ paddingLeft: "0", paddingRight: "0", marginTop: "10px" }}>
            <div>
              <div>Additioinal languages you speak</div>
            </div>
            <div>
              <MdKeyboardArrowRight className="settingsItemIcon" />
            </div>
          </div>
          <div className="settingsHr" />
          <h3 style={{ marginBottom: "20px" }}>Languages you may know</h3>
          <p className="activeSettingDeactivateText">
            Manage the languages Twitter inferred based on your
            activity, such as the accounts you follow and the Tweets
            you engage with.
          </p>
          <div className="activeSettingItem" style={{ paddingLeft: "0", paddingRight: "0", marginTop: "10px" }}>
            <div>
              <div>Languages you may know</div>
            </div>
            <div>
              <MdKeyboardArrowRight className="settingsItemIcon" />
            </div>
          </div>
        </>
      )}
      {title === "dataUsage" && (
        <>
          <p className="activeSettingDeactivateText">
            Limit how Twitter uses some of your network data.
            These settings affect all the Twitter accounts on
            this browser.
          </p>
          <div
            className="activeSettingManageSecurityInputContainer"
            style={{ marginBottom: "20px" }}
          >
            <div>
              <div style={{ marginBottom: "5px" }}>
                Data saver
              </div>
              <p className="activeSettingDeactivateText">
                If selected, Twitter will use less data.
              </p>
            </div>
            <input
              type="checkbox"
              className="activeSettingManageSecurityInput"
            />
          </div>
          <div className="activeSettingItem" style={{ paddingLeft: "0", paddingRight: "0" }}>
            <div>
              <div>Autoplay</div>
              <p className="activeSettingDeactivateText">
                On cellular or Wi-Fi
              </p>
            </div>
            <div>
              <MdKeyboardArrowRight className="settingsItemIcon" />
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default SettingsAccountSetting