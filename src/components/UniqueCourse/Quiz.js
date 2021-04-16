import React,{useContext} from 'react'
import {useHistory} from 'react-router-dom'
import { MediaContext } from '../../context/MediaContext'
import './UniqueCourse.css'

const Quiz = () => {
    const history = useHistory()
    const{mediaId} = useContext(MediaContext)
    return (
        <div className='course-quiz'>
          This is quiz
          <button onClick={()=>{history.push(`/quiz/${mediaId}`)}}>Attempt Quiz</button>
        </div>
    )
}

export default Quiz
