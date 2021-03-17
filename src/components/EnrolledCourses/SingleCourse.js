// import  { useEffect, useState } from "react";
import "./courses.css";
import ProgressBar from "./ProgressBar";

const SingleCourse = (props) => {
  console.log(props.course_name);
  return (
    <div className="card-body">
      <div className="card-image">
        <img src={props.course_image} alt="hi" style={{ height: "200px" }} />
      </div>
      <h2>{props.course_name}</h2>
      {/* <div className="content">{props.course_description}</div> */}
      <div>
        <div className="author">
          <div>
            <img
              src={props.author_picture}
              alt="hi"
              style={{ height: "50px", width: "50px" }}
            />
          </div>
          <div style={{ paddingTop: "12px" }}>{props.author}</div>
        </div>

        <ProgressBar
          bgcolor={"#6a1b9a"}
          completed={props.percentage_completed}
        />

        {props.percentage_completed === 0.0 ? (
          <div>
            <div className="lessons">
              <div className="content">Lessons:</div>
              <div className="text">{props.total_lesson}</div>
              <button className="enrollment-course-btn"> Start </button>
            </div>
          </div>
        ) : (
          <div className="lessons">
            <div className="content">Completed:</div>
            <div className="text">{props.percentage_completed}%</div>
            <div>
              <button className="enrollment-course-btn">Resume</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default SingleCourse;
