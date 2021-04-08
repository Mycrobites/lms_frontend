import React from 'react'
import SingleCourseContent from './SingleCourseContent'
import './UniqueCourse.css'

const CourseContentResponsive = ({lessons}) => {
    return (
        <div className="course-content-responsive">
        <div className="course-content-header">
          <h4>Course content</h4>
          
        </div>
        {lessons?.map((lesson) =>(
            <SingleCourseContent key={lesson?.lesson_id} lesson={lesson} />
          ))}
      </div>
    )
}

export default CourseContentResponsive
