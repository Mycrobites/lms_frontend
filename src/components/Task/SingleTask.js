import { useState } from "react";
import { IoTrash } from "react-icons/io5";
import { GrEdit } from "react-icons/gr";
import axios from "../../axios/axios";
import months from "../Courses/months";

const SingleTasks = ({ id, title, dueDate, isCompleted }) => {
  const [completed, setCompleted] = useState(isCompleted);

  const updateTask = () => {};

  const deleteTask = async () => {};

  return (
    <div className="Task">
      <input
        type="checkbox"
        checked={completed}
        onChange={(e) => setCompleted(!completed)}
      />
      <div className="task-title">
        <h3>{title}</h3>
        <p>
          Due Date: {dueDate.split("-")[2]}{" "}
          {dueDate.split("-")[1] < 10
            ? months[dueDate.split("-")[1].split("")[1]]
            : months[dueDate.split("-")[1]]}{" "}
          {dueDate.split("-")[0]}
        </p>
      </div>
      <button onClick={updateTask} className="edit--button">
        <GrEdit />
      </button>
      <button onClick={deleteTask} className="delete--button">
        <IoTrash />
      </button>
    </div>
  );
};

export default SingleTasks;
