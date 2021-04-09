import { useState, useEffect, useRef , useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "../../axios/axios";
import { MediaContext } from "../../context/MediaContext";
import Loader from "../Loader/Loader";
import AboutCourse from "./AboutCourse";
import Assignment from "./Assignment";
import CourseContent from "./CourseContent";
import CourseContentResponsive from "./CourseContentResponsive";
import DefaultLesson from "./DefaultLesson";
import MediaPlayer from "./MediaPlayer";
import PdfDocument from "./PdfDocument";
import Quiz from "./Quiz";
import Text from "./Text";
import "./UniqueCourse.css";

const UniqueCourse = () => {
  const { id } = useParams();
  const mountedRef = useRef(true);
  const [CourseDetails, setCourse] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [overView ,setOverview] = useState("course_content")
  const {mediaType} = useContext(MediaContext)

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

  const toggleComponent = ()=>{
     
    switch(mediaType){
      case "video":
        return <MediaPlayer/>
      case "pdf":
        return <PdfDocument/>
      case "text":
        return <Text/>
      case "assignment":
        return <Assignment/>
      case "quiz":
        return <Quiz/>
      default :
        return <DefaultLesson src={CourseDetails?.image} name={CourseDetails?.course_name}/>
    }
  }

  return (
    <>
      { isLoading ? 
        <div className="post-loader">
          <Loader/>
        </div>
      : 
        <div className="course">
          <h2 className='course-title'>{CourseDetails?.course_name}</h2>
          <div className='unresponsive'>
          <CourseContent lessons={CourseDetails?.lessons}/>
          </div>
          
          <div className='all-course-content'>
          {toggleComponent()}
          </div>
          
          <div className='unresponsive'>
          <AboutCourse CourseDetails={CourseDetails} />
          </div>
          <div className='responsive-overview'>
          
          <div className='overview-headers'>
          <button onClick={()=> setOverview("about")}>About</button>
          <button onClick={()=> setOverview("course_content")}>Course</button>
          </div>

          <div className='overview-body'>
          
         {overView === "course_content" ? <CourseContentResponsive lessons={CourseDetails?.lessons} /> : <AboutCourse CourseDetails={CourseDetails}/>  }
          
          
          </div>
          
          
          
          </div>
          
        </div>
        
      }
      
    </>
  );
};

export default UniqueCourse;
