import React from "react";
import SingleCourseContent from "./SingleCourseContent";


const CourseContent = ({lessons}) => {
  
  return (
    <div className="course-content">
      <div className="course-content-header">
        <h4>Course content</h4>
        
      </div>
      {lessons?.map((lesson) =>(
        <SingleCourseContent key={lesson?.lesson_id} lesson={lesson} />
      ))}
      
      
    </div>
  );
};

export default CourseContent;
