import { useState } from "react";
import Comment from "./Comment";
import PostComment from "./PostComment";
import months from "../../assets/months/months";
import { RiMessage2Fill } from "react-icons/ri";

const SinglePost = (props) => {
  const { title, desc, username, time, user_profile_pic, comments } = props;
  const [showComments, setShowComments] = useState(false);
  const [showPostComment, setShowPostComment] = useState(false);

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
          <button
            onClick={() => {
              if (setShowPostComment) setShowPostComment(false);
              setShowComments(!showComments);
            }}
          >
            <RiMessage2Fill /> {comments.length} Answers
          </button>
          <button
            onClick={() => {
              if (setShowComments) setShowComments(false);
              setShowPostComment(!showPostComment);
            }}
          >
            Answer
          </button>
        </div>
        {showComments && (
          <div className="comments">
            {comments.map((comment) => (
              <Comment key={comment.id} {...comment} />
            ))}
          </div>
        )}
        {showPostComment && (
          <PostComment setShowPostComment={setShowPostComment} postData={props} />
        )}
      </div>
    </div>
  );
};

export default SinglePost;
