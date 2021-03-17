import { useState } from "react";
import Answer from "./Answer";
import { RiMessage2Fill } from "react-icons/ri";
import months from "../../assets/months/months";

const SinglePost = (props) => {
  const {
    // id,
    title,
    desc,
    username,
    // profession,
    time,
    // user,
    user_profile_pic,
    comments,
  } = props;

  const [showComments, setShowComments] = useState(false);

  return (
    <div className="Post">
      <div className="user-profile">
        <img src={user_profile_pic} alt={username} />
      </div>
      <div className="post">
        <div className="post-header">
          <div className="post-date">
            <p>Asked on: </p>
            <p>
              {time.split("-")[0]}{" "}
              {time.split("-")[1] < 10
                ? months[time.split("-")[1].split("")[1] - 1]
                : months[time.split("-")[1] - 1]}{" "}
              {time.split("-")[2].split(" ")[0]}
            </p>
            <p>{time.split("-")[2].split(" ")[1]}</p>
          </div>
          <div className="post-title">
            <h2>{title}</h2>
          </div>
        </div>
        <div className="post-desc">
          <p>{desc}</p>
        </div>
        <div className="answers">
          <button onClick={() => setShowComments(!showComments)}>
            <RiMessage2Fill /> {comments.length} Answers
          </button>
          <button>Answer</button>
        </div>
      {showComments && (
        <div className="comments">
          {comments.map((comment) => (
            <Answer key={comment.id} {...comment} />
          ))}
        </div>
      )}
      </div>
    </div>
  );
};

export default SinglePost;

// <div className="user-name">
//   <h2>{user}</h2>
//   <h3>{profession}</h3>
// </div>
