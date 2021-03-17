import React,{useContext} from "react";
import "./Profile.css";
import { IoClose } from "react-icons/io5";
import { ProfileContext } from "../../Context/ProfileContext";

const Profile = () => {
  //const{hideProfileCard}=useContext(ProfileContext)

  return (
    <div className="profile-card">
      <button  className="profile-close">
        <IoClose />
      </button>

      <div className="profile-image">
        <img
          src="https://res.cloudinary.com/diqqf3eq2/image/upload/v1586883417/person-3_ipa0mj.jpg"
          alt="profile"
        />
        <h6>Brad Stevens</h6>
        <p>Std 9</p>
      </div>
      <div className="profile-details">
        <div className="profile-name">
          <h1>Brad Stevens</h1>
          <p>Std 9</p>
        </div>

        <div className="student-detail">
          <div>
            <p>Birthday</p>
            <p>
              <strong>2 April</strong>
            </p>
          </div>

          <div>
            <p>Class</p>
            <p>
              <strong>Std 9</strong>
            </p>
          </div>

          <div>
            <p>Gender</p>
            <p>
              <strong>Male</strong>
            </p>
          </div>

          <div>
            <p>Category</p>
            <p>
              <strong>General</strong>
            </p>
          </div>

          <div>
            <p>Phone</p>
            <p>
              <strong>+91 xxxxxxxxxx</strong>
            </p>
          </div>

          <div>
            <p>Address</p>
            <p>
              <strong>South Delhi</strong>
            </p>
          </div>

          <div>
            <p>State</p>
            <p>
              <strong>Delhi</strong>
            </p>
          </div>

          <div>
            <p>Pincode</p>
            <p>
              <strong>100013</strong>
            </p>
          </div>
          <div>
            <p>School</p>
            <p>
              <strong>DPS RKpuram</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
