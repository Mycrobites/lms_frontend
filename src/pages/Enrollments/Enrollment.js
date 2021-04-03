import SideBar from "../../components/SideBar/SideBar";
import EnrolledCourses from "../../components/EnrolledCourses/EnrolledCourse";
import "./Enrollment.css";

const Enrollment = () => {
  return (
    <div className="enrollment">
      <SideBar active="enrollment" />
      <div className="enrollment-items">
        <EnrolledCourses />
      </div>
    </div>
  );
};

export default Enrollment;
