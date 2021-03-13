import Course from "./Course";
import courses from "./data";
import { IoBookmark, IoSearch } from "react-icons/io5";
import "./Courses.css";

const Courses = () => {
  return (
    <div className="Courses">
      <div className="header">
        <h2>Your Courses</h2>
        <button className="premium">PREMIUM</button>
        <button className="bookmark">
          <IoBookmark />
        </button>
        <button className="search">
          <IoSearch />
        </button>
      </div>
      <div className="courses">
        <img
          src="https://res.cloudinary.com/diqqf3eq2/image/upload/v1586883423/person-4_t9nxjt.jpg"
          alt="..."
        />
        <h2>26 courses</h2>
      </div>
      <div className="course-cards">
        {courses.map((course) => (
          <Course key={course.id} {...course} />
        ))}
      </div>
    </div>
  );
};

export default Courses;
