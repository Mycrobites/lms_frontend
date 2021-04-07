import React,{useState} from 'react'
import './UniqueCourse.css'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import { Checkbox } from '@material-ui/core';

const SingleCourseContent = () => {

    const[showContent , setShowContent]= useState(false)

    const handleClick = ()=>{
    setShowContent(!showContent)
   }
    return (
        <div className='single-course-content'>
            <div onClick={handleClick} className='lesson_name'>
            
            <h5>Lession 1 :  Basics of HTML 5</h5>

            <button onClick={handleClick}>{!showContent ? <ExpandMoreIcon/> : <ExpandLessIcon/>}</button>

            
            </div>
            { showContent && 
            <div className='lesson_content'>

            <div className='single-lesson-content'>
            
            <div className='lesson-left'>
            
            <label>
            <input type='checkbox'/>
            Forms
            </label>
            
            </div>
            
            <p>15 min</p>
            
            </div>

            <div className='single-lesson-content'>
            
            <div className='lesson-left'>
            
            <label>
            <input type='checkbox'/>
            Forms
            </label>
            
            </div>
            
            <p>15 min</p>
            
            </div>

            <div className='single-lesson-content'>
            
            <div className='lesson-left'>
            
            <label>
            <input type='checkbox'/>
            Forms
            </label>
            
            </div>
            
            <p>15 min</p>
            
            </div>


            </div>
        }
        </div>
    )
}

export default SingleCourseContent
