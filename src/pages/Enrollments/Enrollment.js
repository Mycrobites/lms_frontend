import SideBar from "../../components/SideBar/SideBar";
import "./Enrollment.css";
import Courses from '../../components/EnrolledCourses/EnrolledCourses'

const Enrollment = () => {
  return (
    <div className="enrollment">
      <SideBar active="enrollment" />
      <div className="enrollment-items">
        <Courses />
      </div>
    </div>
  );
};

export default Enrollment;