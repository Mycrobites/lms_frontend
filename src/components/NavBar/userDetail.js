import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import SettingsOutlinedIcon from "@material-ui/icons/SettingsOutlined";
import PowerSettingsNewOutlinedIcon from "@material-ui/icons/PowerSettingsNewOutlined";
import "./NavBar.css";
import {Link} from 'react-router-dom'


const UserDetail = ({ name,setShowUser }) => {

  const hideUserTab = () =>{
  setShowUser(false)
}


  return (
    <div className="user-detail">
      <div className="user-login">
        <p>Signed in as</p>
        <h6>{name}</h6>
      </div>
      <div className="profile-options">
        <Link to="/profile" onClick={hideUserTab}>
          <AccountCircleOutlinedIcon />
          Your profile
        </Link>
        <Link to="#" onClick={hideUserTab}>
          <SettingsOutlinedIcon />
          Settings
        </Link>
        <Link to="#" onClick={hideUserTab}>
          <PowerSettingsNewOutlinedIcon />
          Sign out
        </Link>
      </div>
    </div>
  );
};

export default UserDetail;
