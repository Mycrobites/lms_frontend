import React from "react";
import months from "../../assets/months/months";

const Comment = (props) => {
  const { text, time, user, user_profile_pic } = props;

  return (
    <div className="Comment">
      <div className="user-profile">
        <img src={user_profile_pic} alt={user} />
      </div>
      <div className="comment">
        <div className="comment-header">
          <div className="username">
            <h2>{user}</h2>
          </div>
          <div className="comment-date">
            <p>
              {time.split("-")[0]}{" "}
              {time.split("-")[1] < 10
                ? months[time.split("-")[1].split("")[1] - 1]
                : months[time.split("-")[1] - 1]}{" "}
              {time.split("-")[2].split(" ")[0]}
            </p>
            <p>{time.split("-")[2].split(" ")[1]}</p>
          </div>
        </div>
        <div className="comment-desc">
          <p>{text}</p>
        </div>
      </div>
    </div>
  );
};

export default Comment;
