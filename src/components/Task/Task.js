import { useState, useEffect } from "react";
import axios from "../../axios/axios";
import SingleTask from "./SingleTask";
import Loader from "../Loader/Loader";
import { IoAdd, IoCloseOutline } from "react-icons/io5";
import "./Task.css";

const Task = () => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showInput, setShowInput] = useState(false);
  const [newTask, setNewTask] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    //post call to api here
    try{
      await axios.post("/api/todo/create",{
        title: newTask,
        dueDate: dueDate,
        isComplete: false,
        user: 115
      })

    }
    catch(err){
      console.log(err.message)
    }
    setNewTask("");
    setDueDate("");
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const { data } = await axios.get("/api/todo/rajat");
        setTasks(data);
        setIsLoading(false);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchTasks();
  }, []);

  return (
    <div className="Tasks">
      <div className="task-header">
        <h1>Tasks</h1>
        <button onClick={() => setShowInput(!showInput)}>
          {showInput ? <IoCloseOutline /> : <IoAdd />}
        </button>
      </div>
      {showInput && (
        <div className="add-newtask">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Add New Task"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
            />
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
            <button type="submit">Add</button>
          </form>
        </div>
      )}
      {isLoading && <Loader />}
      <div className="tasks">
        {tasks.map((task) => (
          <SingleTask key={task.id} {...task} />
        ))}
      </div>
    </div>
  );
};

export default Task;
