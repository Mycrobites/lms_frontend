import { useState } from "react";
import axios from "../../axios/axios";

const PostComment = ({ setShowPostComment, postData }) => {
  const [newComment, setNewComment] = useState("");

  const postComment = async () => {
    try {
      //implement post comment here
      // const { data } = axios.put("/api/forum/createPosts");
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="postComment">
      <div className="user-profile">
        <img
          src="https://lms-seg.herokuapp.com/media/profile/defaultuser.jpg"
          alt="user"
        />
      </div>
      <div className="post-comment-body">
        <textarea
          placeholder="Leave an answer..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <div className="post-comment-buttons">
          <button onClick={() => setShowPostComment(false)}>Cancel</button>
          <button onClick={postComment}>Submit</button>
        </div>
      </div>
    </div>
  );
};

export default PostComment;
