import { useState, useEffect, useRef } from "react";
import ReportModal from "./ReportModal";
import months from "../../assets/months/months";
import axios from "../../axios/axios";
import { Avatar } from "@material-ui/core";
import { AiFillCaretUp } from "react-icons/ai";
import { MdReportProblem } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdEdit, MdDelete } from "react-icons/md";

const Comment = (props) => {
  const {
    id,
    user,
    userid,
    user_profile_pic,
    upvote,
    text,
    time,
    comments,
    setComments,
    uid,
  } = props;
  const [showEditDelete, setShowEditDelete] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportModalText, setReportModalText] = useState(false);
  const [isEditingComment, setIsEditingComment] = useState(false);
  const [editedComment, setEditedComment] = useState(text);
  const editDeleteRef = useRef(null);
  const now = new Date(time);

  const reportComment = async () => {
    try {
      const response = await axios.post("/api/forum/reportComment", {
        user: uid,
        comment: id,
      });
      console.log(response.data);
      if (response.status === 200) {
        setShowReportModal(true);
        if (response.data.message) {
          setReportModalText(response.data.message);
        } else {
          setReportModalText("You reported this post");
        }
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const upvoteComment = async () => {
    try {
      const { data } = await axios.patch(`/api/forum/upvote/${id}/rajat`);
      console.log(data);
    } catch (err) {
      console.log(err.message);
    }
  };

  const deleteComment = async () => {
    try {
      const { data } = await axios.delete(`/api/forum/editComment/${id}`);
      console.log(data);
      setComments(comments.filter((comment) => comment.id !== id));
    } catch (err) {
      console.log(err.message);
    }
  };

  const editComment = async () => {
    try {
      const { data } = await axios.put(`/api/forum/editComment/${id}`, {
        text: editedComment,
        userid: uid,
        postid: null,
      });
      setIsEditingComment(false);
      console.log(data);
      setComments(
        comments.map((comment) => {
          if (comment.id === id) return { ...comment, text: data.text };
          else return comment;
        })
      );
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
    <div className="comment">
      <div className="user-profile">
        <Avatar src={user_profile_pic} />
      </div>
      <div className="comment-content">
        <div className="comment-time">
          <h3 className="time">
            Posted on {now.getDate()} {months[now.getMonth()]}{" "}
            {now.getFullYear()} {time.split(" ")[1]}
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
            <div className="delete-edit-comment-div">
              <button id="edit-btn" onClick={() => setIsEditingComment(true)}>
                <MdEdit /> Edit
              </button>
              <button id="delete-btn" onClick={deleteComment}>
                <MdDelete /> Delete
              </button>
            </div>
          )}
        </div>
        <h2 className="username">{user}</h2>
        {!isEditingComment ? (
          <p className="comment-text">{text}</p>
        ) : (
          <div className="edit-comment-div">
            <textarea
              placeholder="Leave a comment"
              value={editedComment}
              onChange={(e) => setEditedComment(e.target.value)}
            />
            <button onClick={editComment}>Done</button>
          </div>
        )}
        <div className="comment-upvotes">
          <button onClick={upvoteComment}>
            <AiFillCaretUp /> Upvotes ({upvote})
          </button>
          <button onClick={reportComment}>
            <MdReportProblem /> Report
          </button>
        </div>
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

export default Comment;
