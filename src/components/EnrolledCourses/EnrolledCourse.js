import { useState, useEffect } from "react";
import SingleCourse from "./SingleCourse";
import Loader from "../../components/Loader/Loader";
import axios from "../../axios/axios";
import "./EnrolledCourse.css";

const getEnrolledCoursesFromLocalStorage = () => {
  const enrolledCourses = localStorage.getItem("enrolled-courses");
  if (enrolledCourses) {
    return JSON.parse(enrolledCourses);
  } else {
    return null;
  }
};

const EnrolledCourse = () => {
  const [allCourses, setAllCourses] = useState(
    getEnrolledCoursesFromLocalStorage
  );
  const [activeCourses, setActiveCourses] = useState(allCourses.active);
  const [completedCourses, setCompletedCourses] = useState(
    allCourses.completed
  );
  const [isLoading, setIsLoading] = useState(false);
  const [active, setActive] = useState("active");

  useEffect(() => {
    let isUnmounted = false;
    const getCourses = async () => {
      try {
        if (!allCourses) setIsLoading(true);
        const { data } = await axios.get("/api/getMyCourses/rajat");
        if (!isUnmounted) {
          setAllCourses(data);
          setActiveCourses(data.active);
          setCompletedCourses(data.completed);
          localStorage.setItem("enrolled-courses", JSON.stringify(data));
        }
      } catch (err) {
        console.log(err.message);
      }
      setIsLoading(false);
    };
    getCourses();
    return () => {
      isUnmounted = true;
    };
  }, [allCourses]);

  if (isLoading) {
    return (
      <div className="loading-div">
        <Loader />
      </div>
    );
  }

  return (
    <div className="Enrolled-courses">
      <div className="title">
        <h1>Welcome! Rajat</h1>
        <div className="stats">
          <div
            className={`card ${active === "active" && "active"}`}
            onClick={() => setActive("active")}
          >
            {allCourses.act_count}&nbsp; Active Courses
          </div>
          <div
            className={`card ${active === "completed" && "active"}`}
            onClick={() => setActive("completed")}
          >
            {allCourses.comp_count}&nbsp; Completed Courses
          </div>
        </div>
      </div>
      <div className="course-cards">
        {active === "active" ? (
          <div className="active-courses">
            {activeCourses.map((course) => (
              <SingleCourse key={course.sno} {...course} />
            ))}
          </div>
        ) : (
          <div className="completed-courses">
            {completedCourses.map((course) => (
              <SingleCourse key={course.sno} {...course} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EnrolledCourse;
