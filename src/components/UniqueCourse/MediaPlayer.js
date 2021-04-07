import React from "react";
import ReactPlayer from "react-player";
import "./UniqueCourse.css";

const MediaPlayer = () => {
  return (
    <div className="media-player">
      <ReactPlayer
        className="react-player"
        controls
        onEnded={() => console.log("video ended")}
        url="https://www.youtube.com/watch?v=7Mr96EmpGcI"
      />
    </div>
  );
};

export default MediaPlayer;
