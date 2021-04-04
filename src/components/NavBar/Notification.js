import { useEffect, useRef } from "react";
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";
import "./NavBar.css";

const Notification = ({ setShowNotification }) => {
  const notificationRef = useRef();

  useEffect(() => {
    const handler = (e) => {
      if (!notificationRef?.current?.contains(e.target)) {
        setShowNotification(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  });

  return (
    <div className="user-notification" ref={notificationRef}>
      <div className="notification-header">
        <h4>Notifications</h4>
        <button onClick={() => setShowNotification(false)}>
          <CloseOutlinedIcon />
        </button>
      </div>
      <div className="notification-body"></div>
    </div>
  );
};

export default Notification;
