import { useState, useEffect, useRef } from "react";
import Comment from "./Comment";
import PostComment from "./PostComment";
import ReportModal from "./ReportModal";
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
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { AiOutlineWarning } from "react-icons/ai";

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
    tags,
    posts,
    setPosts,
  } = props;

  const [comments, setComments] = useState(null);
  const [showComments, setShowComments] = useState(false);
  const [showPostComment, setShowPostComment] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showEditDelete, setShowEditDelete] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportModalText, setReportModalText] = useState(false);
  const [isEditingPost, setIsEditingPost] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedDesc, setEditedDesc] = useState(desc);
  const [editedTags, setEditedTags] = useState(
    tags.map((t) => t.tag).toString()
  );
  const [error, setError] = useState(false);
  const editDeleteRef = useRef(null);
  const classes = useStyles();
  const now = new Date(time);

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
        setShowReportModal(true);
        if (response.data.message) {
          setReportModalText(response.data.message);
        } else {
          setReportModalText("You reported this post");
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

  const editPost = async () => {
    if (!editedTitle || !editedDesc) return setError(true);
    try {
      const { data } = await axios.put(`/api/forum/editPost/${id}`, {
        title: editedTitle,
        desc: editedDesc,
        userid: uid,
        tags: "",
      });
      setPosts(
        posts.map((post) => {
          if (post.id === id)
            return { ...post, title: data.title, desc: data.desc };
          else return post;
        })
      );
      console.log(data);
      setIsEditingPost(false);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    const handler = (e) => {
      if (!editDeleteRef?.current?.contains(e.target)) {
        setShowEditDelete(false);
      }
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  });

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
              ref={editDeleteRef}
            >
              <BsThreeDotsVertical />
            </button>
          )}
          {showEditDelete && (
            <div className="delete-edit-div">
              <button id="edit-btn" onClick={() => setIsEditingPost(true)}>
                <MdEdit /> Edit
              </button>
              <button id="delete-btn" onClick={deletePost}>
                <MdDelete /> Delete
              </button>
            </div>
          )}
        </div>

        {!isEditingPost ? (
          <>
            <div className="title">
              {title[0] === "<" ? parse(title) : <h2>{title}</h2>}
            </div>
            <div className="tags">
              {tags?.map((tag) => (
                <p key={tag.key} className="tag">
                  {tag.tag}
                </p>
              ))}
            </div>
            <div className="desc">{parse(desc)}</div>
          </>
        ) : (
          <div>
            <div className="post-post">
              <label>
                <p>Title</p>
                <CKEditor
                  editor={ClassicEditor}
                  data={title}
                  onReady={(editor) => {
                    console.log("Editor is ready to use!", editor);
                    editor.editing.view.change((writer) => {
                      writer.setStyle(
                        "height",
                        "80px",
                        editor.editing.view.document.getRoot()
                      );
                    });
                  }}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    setEditedTitle(data);
                  }}
                />
              </label>
              <label>
                <p>Description</p>
                <CKEditor
                  editor={ClassicEditor}
                  data={desc}
                  onReady={(editor) => {
                    console.log("Editor is ready to use!", editor);
                    editor.editing.view.change((writer) => {
                      writer.setStyle(
                        "height",
                        "130px",
                        editor.editing.view.document.getRoot()
                      );
                    });
                  }}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    setEditedDesc(data);
                  }}
                />
              </label>
              <label>
                <p>Tags (Enter tags as a comma separated string)</p>
                <CKEditor
                  editor={ClassicEditor}
                  data={editedTags}
                  onReady={(editor) => {
                    console.log("Editor is ready to use!", editor);
                    editor.editing.view.change((writer) => {
                      writer.setStyle(
                        "height",
                        "130px",
                        editor.editing.view.document.getRoot()
                      );
                    });
                  }}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    setEditedTags(data);
                  }}
                />
              </label>
              {error && (
                <p className="post-upload-question">
                  <AiOutlineWarning />
                  Please fill all the fields!
                </p>
              )}
              <div className="isedit-buttons">
                <button onClick={() => setIsEditingPost(false)}>Cancel</button>
                <button onClick={editPost}>Done</button>
              </div>
            </div>
          </div>
        )}

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
                  uid={uid}
                  setShowComments={setShowComments}
                  comments={comments}
                  setComments={setComments}
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

      {showReportModal && (
        <ReportModal
          reportModalText={reportModalText}
          setShowReportModal={setShowReportModal}
        />
      )}
    </div>
  );
};

export default SinglePost;
