import { useState, useEffect, useRef } from "react";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import EditIcon from "@material-ui/icons/Edit";
import axios from "../../axios/axios";
import months from "../Courses/months";
import { IoCloseOutline } from "react-icons/io5";

const SingleTasks = (props) => {
  const { id, title, dueDate, isCompleted, tasks, setTasks } = props;
  const [completed, setCompleted] = useState(isCompleted);
  const [showEdit, setShowEdit] = useState(false);
  const [editTitle, setEditTitle] = useState(title);
  const [editDate, setEditDate] = useState(dueDate);
  const inputRef = useRef(null);

  const updateTask = async (e) => {
    e.preventDefault();
    setShowEdit(!showEdit);
    try {
      await axios.put(`/api/todo/edit/${id}`, {
      ...props, title:editTitle,dueDate:editDate,
      });
    } catch (err) {
      console.log(err.message);
    }
  };

  const completeTask = async () => {
    setCompleted(!completed);
    try {
      await axios.put(`/api/todo/edit/${id}`, {
      ...props, isCompleted: completed,
      });
    } catch (err) {
      console.log(err.message);
    }
  };

  const deleteTask = async () => {
    try {
      const deletedTasks = tasks.filter((task) => task.id !== id);
      await axios.delete(`/api/todo/edit/${id}`);
      setTasks(deletedTasks);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    if (showEdit) {
      inputRef.current.focus();
    }
  }, [showEdit]);

  return (
    <div className="task-component">
      <div className="Task">
        <input type="checkbox" checked={completed} onChange={completeTask} />
        <div className="task-title">
          <h3 style={{ textDexoration: isCompleted ? "line-through" : "none" }}>
            {title}
          </h3>
          <p>
            Due Date: {dueDate.split("-")[2]}{" "}
            {dueDate.split("-")[1] < 10
              ? months[dueDate.split("-")[1].split("")[1]]
              : months[dueDate.split("-")[1]]}{" "}
            {dueDate.split("-")[0]}
          </p>
        </div>
        <button onClick={() => setShowEdit(!showEdit)} className="edit--button">
          <EditIcon />
        </button>
        <button onClick={deleteTask} className="delete--button">
          <DeleteOutlineIcon />
        </button>
      </div>

      {showEdit && (
        <div className="edit-task">
          <form className="edit-task-form" onSubmit={updateTask}>
            <input
              type="text"
              placeholder="Add New Task"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              ref={inputRef}
            />
            <input
              type="date"
              value={editDate}
              onChange={(e) => setEditDate(e.target.value)}
            />
            <button type="submit">save</button>
            <IoCloseOutline onClick={(e) => setShowEdit(!showEdit)} />
          </form>
        </div>
      )}
    </div>
  );
};

export default SingleTasks;
