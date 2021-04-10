import React from "react";
import months from "../../assets/months/months";
import axios from "../../axios/axios";
import { Avatar } from "@material-ui/core";
import { AiFillCaretUp } from "react-icons/ai";
import { MdReportProblem } from "react-icons/md";

const Comment = (props) => {
  const now = new Date(props.time);

  const username = "Rajat Shrivastava";

  const upvoteComment = async () => {
    try {
      const { data } = await axios.patch(
        `/api/forum/upvote/${props.id}/rajat`
      );
      console.log(data);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="comment">
      <div className="user-profile">
        <Avatar src={props.user_profile_pic} />
      </div>
      <div className="comment-content">
        <h3 className="time">
          Posted on {now.getDate()} {months[now.getMonth()]} {now.getFullYear()}{" "}
          {props.time.split(" ")[1]}
        </h3>
        <h2 className="username">{props.user}</h2>
        <p className="comment-text">{props.text}</p>
        <div className="comment-upvotes">
          <button onClick={upvoteComment}>
            <AiFillCaretUp /> Upvotes ({props.upvote})
          </button>
          <button>
            <MdReportProblem /> Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default Comment;