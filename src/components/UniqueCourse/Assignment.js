import React,{useContext} from 'react'
import {useHistory} from 'react-router-dom'
import { MediaContext } from '../../context/MediaContext'
import './UniqueCourse.css'

const Assignment = () => {
    const history = useHistory()
    const{mediaId} = useContext(MediaContext)
    return (
        <div className='lesson-assignment'>
        This is assignment
            <button  onClick={()=>{history.push(`/assignment/${mediaId}`)}} >Solve Assignment</button>
        </div>
    )
}

export default Assignment
