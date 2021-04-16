import React, { useContext } from "react";
import { MediaContext } from "../../context/MediaContext";
import "./UniqueCourse.css";
import {VscFilePdf} from 'react-icons/vsc'
import {AiOutlineFileText} from 'react-icons/ai'
import {BiTask} from 'react-icons/bi'
import {MdAssignment} from 'react-icons/md'
import {IoIosPlayCircle} from 'react-icons/io'
import {FaHandMiddleFinger} from 'react-icons/fa'

const SingleLessonContent = ({ singleContent, id }) => {
  // console.log(singleContent);
  const { changeVideoUrl, changeMediaType, changeText } = useContext(
    MediaContext
  );


  const handleLessonClick = () => {
    if (singleContent?.media_type === "video") {
      changeVideoUrl(singleContent?.link);
      changeMediaType(singleContent?.media_type, id);
    } 
    else if (singleContent?.media_type === "text") {
      changeText(singleContent?.text);
      changeMediaType(singleContent?.media_type, id);
    }
    else if (singleContent?.media_type === "quiz"){
      changeMediaType(singleContent?.media_type, singleContent?.quiz_id);
    }
    else if (singleContent?.media_type === "assignment"){
      changeMediaType(singleContent?.media_type, singleContent?.assignment_id);
    }
    else{
      changeMediaType(singleContent?.media_type, id);
    }
  };

  const toggleIcon=()=>{
    switch(singleContent?.media_type){
      case "text":
        return <AiOutlineFileText/>
      case "quiz":
        return <MdAssignment/>
      case "video":
        return <IoIosPlayCircle/>
      case "homework":
        return <BiTask/>
      case "pdf":
        return <VscFilePdf/>
      case "assignment":
        return <MdAssignment/>
      default:
        return <FaHandMiddleFinger/>

    }
  }

  return (
    <div onClick={handleLessonClick} className="single-lesson-content">
      <div className="lesson-left">
        <div className="label">
          <input type="checkbox" />
          <div>
            {singleContent?.media_type}
            {singleContent?.descripion}
          </div>
        </div>
      </div>
      <p>{toggleIcon()}</p>
    </div>
  );
};

export default SingleLessonContent;
