import React, { useState } from "react";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
// import { Checkbox } from "@material-ui/core";
import "./UniqueCourse.css";
import SingleLessonContent from "./SingleLessonContent";

const SingleCourseContent = ({lesson}) => {
  const [showContent, setShowContent] = useState(false);

  
  return (
    <div className="single-course-content">
      <div onClick={()=>setShowContent(!showContent)} className="lesson_name">
      <div>
      <h5>Lesson {lesson?.lesson_no}: {lesson?.lesson_name}</h5>
      <p>{lesson?.description}</p>
      </div>
        
        <button>
          {!showContent ? <ExpandMoreIcon /> : <ExpandLessIcon />}
        </button>
      </div>
      {showContent && (
        <div className="lesson_content">

        {lesson?.contents?.map((content,idx) =>(
          <SingleLessonContent  key={idx} id={content?.content_id} singleContent={content} />
        ))}
         

        </div>
      )}
    </div>
  );
};

export default SingleCourseContent;
