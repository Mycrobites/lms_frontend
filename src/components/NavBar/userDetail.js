import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import SettingsOutlinedIcon from "@material-ui/icons/SettingsOutlined";
import PowerSettingsNewOutlinedIcon from "@material-ui/icons/PowerSettingsNewOutlined";
import "./NavBar.css";

const UserDetail = ({ name }) => {
  return (
    <div className="user-detail">
      <div className="user-login">
        <p>Signed in as</p>
        <h6>{name}</h6>
      </div>
      <div className="profile-options">
        <a href="/">
          <AccountCircleOutlinedIcon />
          Your profile
        </a>
        <a href="/">
          <SettingsOutlinedIcon />
          Settings
        </a>
        <a href="/">
          <PowerSettingsNewOutlinedIcon />
          Sign out
        </a>
      </div>
    </div>
  );
};

export default UserDetail;
