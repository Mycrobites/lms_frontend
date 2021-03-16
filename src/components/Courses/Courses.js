import { useState, useEffect } from "react";
import Course from "./Course";
import Loader from "../Loader/Loader";
import axios from "../../axios/axios";
import { useHistory } from "react-router-dom";
import "./Courses.css";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const { data } = await axios.get("/api/getMyCourses/rajat");
        setCourses(data.active.filter((course, index) => index < 2));
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
        <Loader />
      ) : (
        <>
          <div className="course-cards">
            {courses.map((course) => (
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
