import {useContext} from 'react'
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import SettingsOutlinedIcon from "@material-ui/icons/SettingsOutlined";
import PowerSettingsNewOutlinedIcon from "@material-ui/icons/PowerSettingsNewOutlined";
import "./NavBar.css";
import { ProfileContext } from '../../Context/ProfileContext';

const UserDetail = ({ name }) => {

//const{showProfileCard} = useContext(ProfileContext)

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
