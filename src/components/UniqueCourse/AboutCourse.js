import React from "react";

const AboutCourse = ({ CourseDetails }) => {
  return (
    <div className="course-overview">
      <div className="course-about">
        <h2>About this course</h2>

        <p>{CourseDetails?.course_description}</p>
      </div>

      <div className="course-details">
        <p>Lessons : {CourseDetails?.totallesson}</p>
        <p>Total Video : 35 hours</p>
      </div>

      {CourseDetails?.concepts !== "" && (
        <div className="course-concepts">
          <h5>Concepts you'll learn</h5>

          {CourseDetails?.concepts.map((concept, idx) => (
            <p key={idx}>★ {concept}</p>
          ))}
        </div>
      )}

      {CourseDetails?.goals !== "" && (
        <div className="course-goals">
          <h5>Course goals</h5>

          {CourseDetails?.goals.map((goal, idx) => (
            <p key={idx}>★ {goal}</p>
          ))}
        </div>
      )}
    </div>
  );
};

export default AboutCourse;
