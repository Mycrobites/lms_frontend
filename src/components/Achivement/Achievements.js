import React from "react";
import "./achievement.css";

const Achievements = ({ achievements }) => {
  return (
    <div className="achievements">
      <h2>Achievements</h2>
      <div className="quiz-div">
        {achievements.map((achievement) => {
          const { id, user, score } = achievement;
          return (
            <div key={id}>
              <h3>
                {user} {score}
              </h3>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Achievements;
