import React from "react";
import months from "../../assets/months/months";
import "./achievement.css";

const PastQuiz = ({ attemptedQuiz, missedQuiz }) => {
  return (
    <div className="past-quiz">
      <h2>Past Quizzes</h2>
      <div className="quiz-div">
        {attemptedQuiz?.map((quiz) => {
          const { id, quiz_name, duration, expire_date } = quiz;
          return (
            <div key={id} className="single-quiz">
              <h3>{quiz_name}</h3>
              <p>Duration: {duration}</p>
              <p>
                Expired on: {expire_date.split("T")[0].split("-")[2]}{" "}
                {months[expire_date.split("T")[0].split("-")[1].split("")[1]]}{" "}
                {expire_date.split("T")[0].split("-")[0]}{" "}
                {expire_date.split("T")[1].split("+")[0]}
              </p>
              <button>Link</button>
            </div>
          );
        })}
        {missedQuiz?.map((quiz) => {
          const { id, quiz_name, duration, expire_date } = quiz;
          return (
            <div key={id} className="single-quiz">
              <h3>{quiz_name}</h3>
              <p>Duration: {duration}</p>
              <p>
                Expired on: {expire_date.split("T")[0].split("-")[2]}{" "}
                {months[expire_date.split("T")[0].split("-")[1].split("")[1]]}{" "}
                {expire_date.split("T")[0].split("-")[0]}{" "}
                {expire_date.split("T")[1].split("+")[0]}
              </p>
              <button>Link</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PastQuiz;
