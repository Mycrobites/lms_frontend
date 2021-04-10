import { useState } from "react";
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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

const SinglePost = (props) => {
  const { id, title, desc, time, user, user_profile_pic } = props;
  const [comments, setComments] = useState(null);
  const [showComments, setShowComments] = useState(false);
  const [showPostComment, setShowPostComment] = useState(false);
  const [loading, setLoading] = useState(false);
  const [noCommentsError, setNoCommentsError] = useState(false);
  const now = new Date(time);
  const classes = useStyles();

  console.log(noCommentsError);

  const getAnswers = async () => {
    setShowComments(!showComments);
    setShowPostComment(false);
    setLoading(true);
    console.log(loading);
    try {
      const { data } = await axios.get(`/api/forum/getComments/${id}`);
      setComments(data);
      console.log(data);
    } catch (err) {
      console.log(err.message);
      setNoCommentsError(true);
    }
    setLoading(false);
  };

  const reportPost = async () => {
    try {
      const response = await axios.post("/api/forum/reportPost", {
        user: 114,
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

  return (
    <>
      <div className="single-post">
        <div className="profile-pic-div">
          <Avatar src={user_profile_pic} className={classes.large} />
        </div>
        <div className="post-content">
          <h3 className="time">
            Asked on {now.getDate()} {months[now.getMonth()]}{" "}
            {now.getFullYear()} {props.time.split(" ")[1]} by {user}
          </h3>
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
            <PostComment setShowPostComment={setShowPostComment} postid={id} />
          )}
        </div>
      </div>
    </>
  );
};

export default SinglePost;
