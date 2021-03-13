import React from "react";

const Lesson = ({ date, time, title, lesson, image }) => {
  return (
    <div className="Lesson">
      <div className="timing">
        <h2>{date}</h2>
        <p>{time}</p>
      </div>
      <div className="title">
        <h2>{title}</h2>
        <p>{lesson}</p>
      </div>
      <div className="image-container">
        <img src={image} alt={title} />
      </div>
    </div>
  );
};

export default Lesson;
