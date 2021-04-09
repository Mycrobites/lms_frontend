import React,{useContext} from 'react'
import { MediaContext } from '../../context/MediaContext'
import './UniqueCourse.css'

const SingleLessonContent = ({singleContent , id}) => {
    console.log(singleContent)
    const{changeVideoUrl,changeMediaType} = useContext(MediaContext)

    const handleLessonClick=()=>{
        if(singleContent?.media_type ==="video"){
           
           changeVideoUrl(singleContent?.link )
           
        }
        changeMediaType(singleContent?.media_type)
    }

    return (
        <div onClick={handleLessonClick} className="single-lesson-content">
        <div className="lesson-left">
          <label>
            <input type="checkbox" />
            <div>
            {singleContent?.media_type}
            {singleContent?.descripion}
            </div>
          </label>
        </div>
        <p>{singleContent?.media_type ==="video" ? "15 min" : "1 min" }</p>
      </div>
    )
}

export default SingleLessonContent
