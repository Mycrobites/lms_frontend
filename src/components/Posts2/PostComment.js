import { useState, useEffect } from "react";
import axios from "../../axios/axios";
import { Avatar } from "@material-ui/core";
import { IoWarningOutline } from "react-icons/io5";

const PostComment = ({ setShowPostComment }) => {
  const [comment, setComment] = useState("");
  const [isError, setIsError] = useState(false);

  //   const postComment = async () => {
  //     try {
  //       if (comment) {
  //         const newComment = {
  //           text: comment,
  //           userid: 114,
  //           postid: postData.id,
  //         };
  //         const { data } = await axios.post(
  //           "/api/forum/createComments",
  //           newComment
  //         );
  //         setPostData({
  //           ...postData,
  //           comments: [
  //             ...postData.comments,
  //             {
  //               ...data,
  //               user: "Rajat Shrivastava",
  //               user_profile_pic:
  //                 "https://lms-seg.herokuapp.com/media/profile/defaultuser.jpg",
  //             },
  //           ],
  //         });
  //         setShowPostComment(false);
  //         console.log(postData);
  //       } else {
  //         setIsError(true);
  //       }
  //     } catch (err) {
  //       console.log(err.message);
  //     }
  //   };

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
          <textarea type="text" placeholder="Leave a comment" />
        </form>
        {isError && (
          <div className="error">
            <IoWarningOutline />
            <h3>All fields must be filled</h3>
          </div>
        )}
        <div className="post-comment-buttons">
          <button onClick={() => setShowPostComment(false)}>Cancel</button>
          <button>Submit</button>
        </div>
      </div>
    </div>
  );
};

export default PostComment;
