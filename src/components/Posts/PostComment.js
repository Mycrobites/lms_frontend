import { useState, useEffect } from "react";
import axios from "../../axios/axios";
import { Avatar } from "@material-ui/core";
import { IoWarningOutline } from "react-icons/io5";
// import { CKEditor } from "@ckeditor/ckeditor5-react";
// import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const PostComment = ({ setShowPostComment, postid, uid }) => {
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
          {/* <CKEditor
            editor={ClassicEditor}
            data={comment}
            onReady={(editor) => {
              console.log("Editor is ready to use!", editor);
              editor.editing.view.change((writer) => {
                writer.setStyle(
                  "height",
                  "100px",
                  editor.editing.view.document.getRoot()
                );
              });
            }}
            onChange={(event, editor) => {
              const data = editor.getData();
              setComment(data);
              console.log(comment);
            }}
          /> */}
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
