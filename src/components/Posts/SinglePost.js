import { useState } from "react";
import Comment from "./Comment";
import PostComment from "./PostComment";
import months from "../../assets/months/months";
import { RiMessage2Fill } from "react-icons/ri";

const SinglePost = (props) => {
  const [postData, setPostData] = useState(props);
  const { title, desc, username, time, user_profile_pic, comments } = postData;
  const [showComments, setShowComments] = useState(false);
  const [showPostComment, setShowPostComment] = useState(false);

  const now = new Date(time);

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
              {now.getDate()} {months[now.getMonth()]} {now.getFullYear()}{" "}
              {now.getHours()}:{now.getMinutes()}
            </p>
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
          <PostComment
            setShowPostComment={setShowPostComment}
            postData={postData}
            setPostData={setPostData}
          />
        )}
      </div>
    </div>
  );
};

export default SinglePost;
