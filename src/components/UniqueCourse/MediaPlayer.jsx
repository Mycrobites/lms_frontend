import React from 'react'
import './UniqueCourse.css'
import ReactPlayer from 'react-player'

const MediaPlayer = () => {
    return (
        <div className='media-player'>
        <ReactPlayer 
        className='react-player'
        controls
        onEnded={()=> console.log("video ended")}
        url="https://www.youtube.com/watch?v=7Mr96EmpGcI"/>
      </div>
    )
}

export default MediaPlayer
