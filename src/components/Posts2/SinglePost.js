import { useState } from "react";
import parse from "react-html-parser";
import Comment from "./Comment";
import PostComment from "./PostComment";
import Loader from "../Loader/Loader";
import axios from "../../axios/axios";
import months from "../../assets/months/months";
import { Avatar } from "@material-ui/core";
import { RiMessage2Fill } from "react-icons/ri";
import { makeStyles } from "@material-ui/core/styles";
import { FacebookShareButton, FacebookIcon } from "react-share";

const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

const SinglePost = (props) => {
  const { id, title, desc, time, user, user_profile_pic, userid } = props;
  const [comments, setComments] = useState(null);
  const [showComments, setShowComments] = useState(false);
  const [showPostComment, setShowPostComment] = useState(false);
  const [loading, setLoading] = useState(false);
  const now = new Date(time);
  const classes = useStyles();

  const getAnswers = async () => {
    setLoading(true);
    setShowComments(!showComments);
    if (showComments) {
      try {
        const { data } = await axios.get(`/api/forum/getComments/${id}`);
        setComments(data);
        console.log(data);
      } catch (err) {
        console.log(err.message);
      }
    }
    setLoading(false);
  };

  return (
    <div className="single-post">
      <div className="profile-pic-div">
        <Avatar src={user_profile_pic} className={classes.large} />
      </div>
      <div className="post-content">
        <h3 className="time">
          Asked on {now.getDate()} {months[now.getMonth()]} {now.getFullYear()}{" "}
          {props.time.split(" ")[1]} by {user}
        </h3>
        <h1 className="title">{parse(title)}</h1>
        <p className="desc">{parse(desc)}</p>
        <div className="answer-btn-div">
          <button className="answers" onClick={getAnswers}>
            <RiMessage2Fill /> Answers
          </button>
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
              {comments?.map((comment) => (
                <Comment key={comment.id} {...comment} />
              ))}
            </div>
          ))}
        {showPostComment && (
          <PostComment setShowPostComment={setShowPostComment} />
        )}
      </div>
    </div>
  );
};

export default SinglePost;
