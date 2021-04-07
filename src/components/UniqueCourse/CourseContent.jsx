import React from 'react'
import SingleCourseContent from './SingleCourseContent'
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";


const CourseContent = () => {
    return (
        <div className='course-content'>
        <div className="course-content-header">
        <h4>Course content</h4>
        <button>
          <CloseOutlinedIcon />
        </button>
        </div>
            <SingleCourseContent/>
            <SingleCourseContent/>
            <SingleCourseContent/>
        
        </div>
    )
}

export default CourseContent
