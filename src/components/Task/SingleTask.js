import { useState } from "react";
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import EditIcon from '@material-ui/icons/Edit';
import axios from "../../axios/axios";
import months from "../Courses/months";

const SingleTasks = ({ id, title, dueDate, isCompleted }) => {
  const [completed, setCompleted] = useState(isCompleted);

  const updateTask = async () => {
    try{
     await axios.put("/api/todo/edit" , {
       "id": "hdshdbcsjdhsjcioaeuf",
       "title": "hello world",
       "dueDate": "2021-03-09",
       "isComplete": false,
       "user": 115
     })
    }
    catch(err){
      console.log(err.message)
    }
  };

  const deleteTask = async () => {
    try {
      await axios.delete(`/api/todo/edit/${id}`);
    } catch (err) {
      console.log(err.message);
    }
  };

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
        <EditIcon />
      </button>
      <button onClick={deleteTask} className="delete--button">
        <DeleteOutlineIcon />
      </button>
    </div>
  );
};

export default SingleTasks;
