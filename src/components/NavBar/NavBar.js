import { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import axios from "../../axios/axios";
import Avatar from "@material-ui/core/Avatar";
import NotificationsOutlinedIcon from "@material-ui/icons/NotificationsOutlined";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import ExpandLessOutlinedIcon from "@material-ui/icons/ExpandLessOutlined";
import UserDetail from "./userDetail";
import Notification from "./Notification";
import logo from "../../assets/images/Artboard 1.png";
import "./NavBar.css";

const getNotificationsFromLocalStorage = () => {
  const nots = localStorage.getItem("notifications");
  if (nots) {
    return JSON.parse(nots);
  } else {
    return null;
  }
};

const NavBar = () => {
  const [showUser, setShowUser] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [loading, setLoading] = useState(false);
  const [notifications, setNotifications] = useState(
    getNotificationsFromLocalStorage
  );

  const location = useLocation();
  const history = useHistory();

  const showNotificationBar = async() => {
    setShowNotification(true);
    setShowUser(false);
    const{data}= await axios.post("/api/notifSeen" , {
      "user": 114
    })
    console.log(data)
  };

  const showUserBar = () => {
    setShowUser(!showUser);
    setShowNotification(false);
  };

  useEffect(() => {
    const fetchNotifications = async () => {
      if(!notifications){
        setLoading(true)
      }
      try {
        const { data } = await axios.get("/api/fetchNotification/rajat");
        setNotifications(data);
        // console.log(data);
        setLoading(false)
        localStorage.setItem("notifications", JSON.stringify(data));
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchNotifications();
  }, []);

  return (
    <>
      {location.pathname !== "/login" ? (
        <div className="navbar">
          <div className="logo">
            <img src={logo} alt="logo" onClick={() => history.push("/")} />
          </div>
          <div className="user">
            <button id="notification" onClick={showNotificationBar}>
              {notifications?.length > 0 && <span>{notifications.length}</span>}
              <NotificationsOutlinedIcon />
            </button>
            <h4 id="user-name">Rajat</h4>
            <Avatar />
            <button onClick={showUserBar}>
              {showUser ? (
                <ExpandLessOutlinedIcon />
              ) : (
                <KeyboardArrowDownIcon />
              )}
            </button>
            {showUser && (
              <UserDetail setShowUser={setShowUser} name={"Rajat"} />
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
