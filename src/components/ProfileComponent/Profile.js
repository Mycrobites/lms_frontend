import { useState, useEffect } from "react";
import "./Profile.css";
import { FiEdit } from "react-icons/fi";
import axios from "../../axios/axios";
import Loader from "../Loader/Loader";

const Profile = () => {
  const [loading, setLoading] = useState(true);
  const [showEdit, setShowEdit] = useState(false);
  const [studentDetails, setStudentDetails] = useState({});
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    const getStudentsDetails = async () => {
      try {
        const { data } = await axios.get("/api/getUserDetails/user1");
        setStudentDetails(data?.student_details);
        setUserInfo(data?.user_info);
        setLoading(false);
      } catch (err) {
        console.log(err.message);
      }
    };
    getStudentsDetails();
  }, []);

  const {
    Class,
    address,
    category,
    dob,
    father_email,
    father_name,
    father_phone,
    gender,
    mother_email,
    mother_name,
    mother_phone,
    phone_no,
    pin_code,
    profile_pic,
    school_address,
    school_name,
    state,
  } = studentDetails;
  const { first_name, last_name, email, username } = userInfo;

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="profile-card">
          <div className="profile-image">
            <img src={profile_pic} alt="" />
            <h6>{username}</h6>
            <p>{`Std ${Class}`}</p>
          </div>
          <div className="profile-details">
            <div className="profile-name">
              <h1>{`${first_name} ${last_name}`}</h1>
              <p>{`Std ${Class}`}</p>
              <button
                onClick={(e) => setShowEdit(true)}
                className="profile-edit-button"
              >
                <FiEdit />
              </button>
            </div>

            <div className="student-detail">
              <div>
                <p>Birthday</p>
                <p>
                  <strong>{dob}</strong>
                </p>
              </div>

              <div>
                <p>Class</p>
                <p>
                  <strong>{`Std ${Class}`}</strong>
                </p>
              </div>

              <div>
                <p>Gender</p>
                <p>
                  <strong>{gender}</strong>
                </p>
              </div>

              <div>
                <p>Category</p>
                <p>
                  <strong>{category}</strong>
                </p>
              </div>

              <div>
                <p>Phone</p>
                <p>
                  <strong>{`+91 ${phone_no}`}</strong>
                </p>
              </div>
              <div>
                <p>Email</p>
                <p>
                  <strong>{email}</strong>
                </p>
              </div>

              <div>
                <p>Father Name</p>
                <p>
                  <strong>{father_name}</strong>
                </p>
              </div>

              <div>
                <p>Father Email</p>
                <p>
                  <strong>{father_email}</strong>
                </p>
              </div>

              <div>
                <p>Father Phone</p>
                <p>
                  <strong>{`+91 ${father_phone}`}</strong>
                </p>
              </div>

              <div>
                <p>Mother Name</p>
                <p>
                  <strong>{mother_name}</strong>
                </p>
              </div>

              <div>
                <p>Mother Email</p>
                <p>
                  <strong>{mother_email}</strong>
                </p>
              </div>

              <div>
                <p>Mother Phone</p>
                <p>
                  <strong>{`+91 ${mother_phone}`}</strong>
                </p>
              </div>

              <div>
                <p>Address</p>
                <p>
                  <strong>{address}</strong>
                </p>
              </div>

              <div>
                <p>State</p>
                <p>
                  <strong>{state}</strong>
                </p>
              </div>

              <div>
                <p>Pincode</p>
                <p>
                  <strong>{pin_code}</strong>
                </p>
              </div>

              <div>
                <p>School</p>
                <p>
                  <strong>{school_name}</strong>
                </p>
              </div>

              <div>
                <p>School Address</p>
                <p>
                  <strong>{school_address}</strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
