import React,{useContext} from "react";
import ReactPlayer from "react-player";
import { MediaContext } from "../../context/MediaContext";
import "./UniqueCourse.css";

const MediaPlayer = () => {

  const{videoUrl}= useContext(MediaContext)
  
  return (
    <div className="media-player">
      <ReactPlayer
        className="react-player"
        controls
        onEnded={() => console.log("video ended")}
        url={videoUrl}
      />
    </div>
  );
};

export default MediaPlayer;
