import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
// import SettingsOutlinedIcon from "@material-ui/icons/SettingsOutlined";
import PowerSettingsNewOutlinedIcon from "@material-ui/icons/PowerSettingsNewOutlined";
import "./NavBar.css";

const UserDetail = ({ name, setShowUser }) => {
  const userDetailRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (!userDetailRef?.current?.contains(e.target)) {
        console.log(e.target);
        setShowUser(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  });

  return (
    <div className="user-detail" ref={userDetailRef}>
      <div className="user-login">
        <p>Signed in as</p>
        <h6>{name}</h6>
      </div>
      <div className="profile-options">
        <Link to="/profile" onClick={() => setShowUser(false)}>
          <AccountCircleOutlinedIcon />
          Your profile
        </Link>
        {/* <Link to="#" onClick={() => setShowUser(false)}>
          <SettingsOutlinedIcon />
          Settings
        </Link> */}
        <Link to="#" onClick={() => setShowUser(false)}>
          <PowerSettingsNewOutlinedIcon />
          Sign out
        </Link>
      </div>
    </div>
  );
};

export default UserDetail;
