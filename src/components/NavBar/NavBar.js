import { useState, useEffect, useContext } from "react";
import { useLocation, useHistory } from "react-router-dom";
import axios from "../../axios/axios";
import Avatar from "@material-ui/core/Avatar";
import NotificationsOutlinedIcon from "@material-ui/icons/NotificationsOutlined";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import ExpandLessOutlinedIcon from "@material-ui/icons/ExpandLessOutlined";
import UserDetail from "./userDetail";
import Notification from "./Notification";
import logo from "../../assets/images/logo.png";
import "./NavBar.css";
import UserContext from "../../context/authContext";

const getNotificationsFromLocalStorage = () => {
  const nots = localStorage.getItem("notifications");
  if (nots) {
    return JSON.parse(nots);
  } else {
    return null;
  }
};

const NavBar = () => {
  const [unseenCount, setUnseenCount] = useState(0);
  const [showUser, setShowUser] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [loading, setLoading] = useState(false);
  const [notifications, setNotifications] = useState(
    getNotificationsFromLocalStorage
  );
  const { userDetails } = useContext(UserContext);

  const location = useLocation();
  const history = useHistory();

  const showNotificationBar = async () => {
    setShowNotification(true);
    setShowUser(false);
    await axios.post("/api/notifSeen", {
      user: userDetails?.user?.pk,
    });
  };

  const showUserBar = () => {
    setShowUser(!showUser);
    setShowNotification(false);
  };

  useEffect(() => {
    const fetchNotifications = async () => {
      if (!notifications) {
        setLoading(true);
      }
      try {
        const { data } = await axios.get(
          `/api/fetchNotification/${userDetails?.user?.username}`
        );
        setNotifications(data);
        setLoading(false);
        localStorage.setItem("notifications", JSON.stringify(data));
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchNotifications();

    // if (Array.isArray(notifications)) {
    //   unseenNotifications?.length > 0
    //     ? setUnseenCount(unseenNotifications?.length)
    //     : setUnseenCount(0);
    //   const unseenNotifications = notifications?.filter(
    //     (notif) => !notif?.is_seen.includes(userDetails?.user?.pk)
    //   );
    // }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notifications]);

  return (
    <>
      {location.pathname !== "/" ? (
        <div className="navbar">
          <div className="logo">
            <img src={logo} alt="logo" onClick={() => history.push("/")} />
          </div>
          <div className="user">
            <button id="notification" onClick={showNotificationBar}>
              {unseenCount > 0 && <span>{unseenCount}</span>}
              <NotificationsOutlinedIcon />
            </button>
            <h4 id="user-name">{userDetails?.user?.first_name}</h4>
            <Avatar src={userDetails?.profile_pic} />
            <button onClick={showUserBar}>
              {showUser ? (
                <ExpandLessOutlinedIcon />
              ) : (
                <KeyboardArrowDownIcon />
              )}
            </button>
            {showUser && (
              <UserDetail
                setShowUser={setShowUser}
                name={userDetails?.user?.first_name}
              />
            )}
            {showNotification && (
              <Notification
                setShowNotification={setShowNotification}
                notifications={notifications}
                loading={loading}
              />
            )}
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default NavBar;
