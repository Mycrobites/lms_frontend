import { useEffect, useRef } from "react";
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";
import "./NavBar.css";

const Notification = ({ setShowNotification, notifications }) => {
  const notificationRef = useRef();
  console.log(notifications);
  console.log(notifications?.time?.split("T"));
  console.log(notifications?.time);
  const now = new Date(notifications.time);

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
      <div className="notification-body">
        {notifications.map((notification) => (
          <div className="notification" key={notification.id}>
            <h3>{notification.title}</h3>
            <p>{notification.message}</p>
            {/* <h4>{now.()}</h4> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notification;
