import { useState, useEffect } from "react";
import Course from "./Course";
import Loader from "../Loader/Loader";
import axios from "../../axios/axios";
import { useHistory } from "react-router-dom";
import "./Courses.css";

const getCoursesFromLocalStorage = () => {
  const course = localStorage.getItem("courses");
  if (course) {
    return JSON.parse(course);
  } else {
    return null;
  }
};

const Courses = () => {
  const [courses, setCourses] = useState(getCoursesFromLocalStorage);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const fetchCourses = async () => {
      if (!courses) setIsLoading(true);
      try {
        const { data } = await axios.get("/api/getMyCourses/rajat");
        const courseData = data.active.filter((course, index) => index < 2);
        setCourses(courseData);
        localStorage.setItem("courses", JSON.stringify(courseData));
      } catch (err) {
        console.log(err.message);
      }
      setIsLoading(false);
    };
    fetchCourses();
  }, [courses]);

  return (
    <div className="Courses">
      <h2>My Courses</h2>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="course-cards">
            {courses?.map((course) => (
              <Course key={course.sno} {...course} />
            ))}
          </div>
          <button
            onClick={() => history.push("/enrollment")}
            className="all-courses-btn"
          >
            See all
          </button>
        </>
      )}
    </div>
  );
};

export default Courses;
