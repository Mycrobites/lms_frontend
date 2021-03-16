import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";
import "./NavBar.css";

const Notification = ({ setShowNotification }) => {
  return (
    <div className="user-notification">
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
