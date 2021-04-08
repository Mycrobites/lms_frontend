import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "../../axios/axios";
import Loader from "../Loader/Loader";
import CourseContent from "./CourseContent";
import MediaPlayer from "./MediaPlayer";
import "./UniqueCourse.css";

const UniqueCourse = () => {
  const { id } = useParams();
  const mountedRef = useRef(true);
  const [CourseDetails, setCourse] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      if (CourseDetails == null) setIsLoading(true);
      try {
        const { data } = await axios.get(`/api/course/${id}`);
        if (mountedRef.current) {
          setCourse(data.course_details);
        }
        console.log(CourseDetails);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchCourseDetails();
    setIsLoading(false);
    return function callback() {
      mountedRef.current = false;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [CourseDetails]);

  return (
    <>
      { isLoading ? (
        <div className="post-loader">
          <Loader/>
        </div>
      ) : (
        <div className="course">
          <CourseContent CourseDetails={CourseDetails}/>
          <MediaPlayer/>
          <div className='course-overview'>

          <div className='course-about'>
          <h2>About this course</h2>

          <p>{CourseDetails?.course_description}</p>
          </div>

          <div className='course-details'>
          
          <p>Lecture : {CourseDetails?.totallesson}</p>
          <p>Total Video : 35 hours</p>
          </div>

      

            {CourseDetails?.concepts !== "" &&
            <div className='course-concepts'>
            <h5>Concepts you'll learn</h5>
  
            {CourseDetails?.concepts.map((concept) =>(
              <p>★ {concept}</p>
            ))}
  
            </div>}
          
         
            {CourseDetails?.goals !== "" && 
            <div className='course-goals'>
            <h5>Course goals</h5>
  
            {CourseDetails?.goals.map((goal) =>(
              <p>★ {goal}</p>
            ))}
            </div>}
          
          </div>
          
        </div>
        
      )}
      
    </>
  );
};

export default UniqueCourse;
