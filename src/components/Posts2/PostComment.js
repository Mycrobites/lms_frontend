import { useState, useEffect } from "react";
import axios from "../../axios/axios";
import { Avatar } from "@material-ui/core";
import { IoWarningOutline } from "react-icons/io5";

const PostComment = (props) => {
  const { setShowPostComment, comments, setComments, postid, uid } = props;
  const [comment, setComment] = useState("");
  const [isError, setIsError] = useState(false);

  const postComment = async () => {
    try {
      if (comment) {
        const newComment = {
          text: comment,
          userid: uid,
          postid: postid,
        };
        const { data } = await axios.post(
          "/api/forum/createComments",
          newComment
        );
        console.log(data);
        setShowPostComment(false);
      } else {
        setIsError(true);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    const error = setTimeout(() => {
      setIsError(false);
    }, 3000);
    return () => clearTimeout(error, 3000);
  }, [isError]);

  return (
    <div className="post-comment">
      <div className="user-profile">
        <Avatar />
      </div>
      <div className="post-comment-body">
        <form className="post-comment-form">
          <textarea
            placeholder="Leave a comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </form>
        {isError && (
          <div className="error">
            <IoWarningOutline />
            <h3>All fields must be filled</h3>
          </div>
        )}
        <div className="post-comment-buttons">
          <button onClick={() => setShowPostComment(false)}>Cancel</button>
          <button onClick={postComment}>Submit</button>
        </div>
      </div>
    </div>
  );
};

export default PostComment;
