import { useState, useRef, useEffect } from "react";
import Comment from "./Comment";
import PostComment from "./PostComment";
import Loader from "../Loader/Loader";
import axios from "../../axios/axios";
import months from "../../assets/months/months";
import { Avatar } from "@material-ui/core";
import { RiMessage2Fill } from "react-icons/ri";
import { makeStyles } from "@material-ui/core/styles";
import { FacebookShareButton, FacebookIcon } from "react-share";
import { MdReportProblem } from "react-icons/md";
import parse from "html-react-parser";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdEdit, MdDelete } from "react-icons/md";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

const SinglePost = (props) => {
  const {
    id,
    title,
    desc,
    time,
    user,
    user_profile_pic,
    userid,
    uid,
    fetchPosts,
  } = props;
  const [comments, setComments] = useState(null);
  const [showComments, setShowComments] = useState(false);
  const [showPostComment, setShowPostComment] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showEditDelete, setShowEditDelete] = useState(false);
  const now = new Date(time);
  const classes = useStyles();
  const deleteEditRef = useRef(null);

  const getAnswers = async () => {
    setShowComments(!showComments);
    setShowPostComment(false);
    setLoading(true);
    try {
      const { data } = await axios.get(`/api/forum/getComments/${id}`);
      setComments(data);
      console.log(data);
    } catch (err) {
      console.log(err.message);
    }
    setLoading(false);
  };

  const reportPost = async () => {
    try {
      const response = await axios.post("/api/forum/reportPost", {
        user: uid,
        post: id,
      });
      if (response.status === 200) {
        if (response.data.message) {
          alert(response.data.message);
        } else {
          alert("You reported this post!");
        }
      }
      console.log(response);
    } catch (err) {
      console.log(err.message);
    }
  };

  const deletePost = async () => {
    try {
      const { data } = await axios.delete(`/api/forum/editPost/${id}`);
      fetchPosts();
      console.log(data);
    } catch (err) {
      console.log(err.message);
    }
  };

  // useEffect(() => {
  //   const handler = (e) => {
  //     if (!deleteEditRef?.current?.contains(e.target)) {
  //       setShowEditDelete(false);
  //     }
  //   };
  //   document.addEventListener("click", handler);
  //   return () => document.removeEventListener("click", handler);
  // });

  return (
    <div className="single-post">
      <div className="profile-pic-div">
        <Avatar src={user_profile_pic} className={classes.large} />
      </div>
      <div className="post-content">
        <div className="time-div">
          <h3 className="time">
            Asked on {now.getDate()} {months[now.getMonth()]}{" "}
            {now.getFullYear()} {props.time.split(" ")[1]} by {user}
          </h3>
          {userid === uid && (
            <button
              onClick={() => setShowEditDelete(!showEditDelete)}
              className="three-dots"
            >
              <BsThreeDotsVertical />
            </button>
          )}
          {showEditDelete && (
            <div className="delete-edit-div" ref={deleteEditRef}>
              <button id="edit-btn">
                <MdEdit /> Edit
              </button>
              <button id="delete-btn" onClick={deletePost}>
                <MdDelete /> Delete
              </button>
            </div>
          )}
        </div>
        <div className="title">
          {title[0] === "<" ? parse(title) : <h2>{title}</h2>}
        </div>
        <div className="desc">{parse(desc)}</div>
        <div className="answer-btn-div">
          <div className="share">
            <button className="answers" onClick={getAnswers}>
              <RiMessage2Fill /> Answers
            </button>
            <button className="report" onClick={reportPost}>
              <MdReportProblem /> Report
            </button>
          </div>
          <div className="share">
            <FacebookShareButton
              url={"https://www.youtube.com/"}
              quote={desc}
              hashtag="#ProgressiveMinds"
            >
              <FacebookIcon size={36} />
            </FacebookShareButton>
            <button
              className="answer"
              onClick={() => {
                if (setShowComments) setShowComments(false);
                setShowPostComment(!showPostComment);
              }}
            >
              Answer
            </button>
          </div>
        </div>
        {showComments &&
          (loading ? (
            <Loader />
          ) : (
            <div>
              {!comments && (
                <p className="no-answers">No answers to display...</p>
              )}
              {comments?.map((comment) => (
                <Comment
                  key={comment.id}
                  {...comment}
                  setComments={setComments}
                  comments={comments}
                />
              ))}
            </div>
          ))}
        {showPostComment && (
          <PostComment
            setShowPostComment={setShowPostComment}
            postid={id}
            uid={props.uid}
          />
        )}
      </div>
    </div>
  );
};

export default SinglePost;
