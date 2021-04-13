import SideBar from "../../components/SideBar/SideBar";
import UniqueCourse from "../../components/UniqueCourse/UniqueCourse";
import "./CoursePage.css";

const CoursePage = () => {
  return (
    <div className="course-page">
      <SideBar active="enrollment" />
      <div className="course">
        <UniqueCourse />
      </div>
    </div>
  );
};

export default CoursePage;
