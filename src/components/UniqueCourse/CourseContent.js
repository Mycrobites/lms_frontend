import React from "react";
import SingleCourseContent from "./SingleCourseContent";


const CourseContent = ({CourseDetails}) => {
  return (
    <div className="course-content">
      <div className="course-content-header">
        <h4>Course content</h4>
        
      </div>
      <SingleCourseContent />
      <SingleCourseContent />
      <SingleCourseContent />
    </div>
  );
};

export default CourseContent;
