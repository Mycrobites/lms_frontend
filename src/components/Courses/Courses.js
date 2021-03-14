import { useState, useEffect } from "react";
import Course from "./Course";
import axios from "../../axios/axios";
// import { IoBookmark, IoSearch } from "react-icons/io5";
import "./Courses.css";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const { data } = await axios.post("/api/postMyCourses/", {
          user: "admin",
        });
        setCourses(data.active);
        setIsLoading(false);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchCourses();
  }, []);

  return (
    <div className="Courses">
      <h2>My Courses</h2>
      {isLoading ? (
        <h2>Loading...</h2>
      ) : (
        <>
          <div className="courses">
            <img
              src="https://res.cloudinary.com/diqqf3eq2/image/upload/v1586883423/person-4_t9nxjt.jpg"
              alt="..."
            />
            <h2>{courses.length} Courses</h2>
          </div>
          <div className="course-cards">
            {courses.map((course) => (
              <Course key={course.sno} {...course} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Courses;
