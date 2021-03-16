import { useState, useEffect } from "react";
import axios from "../../axios/axios";
import SingleTask from "./SingleTask";
import Loader from "../Loader/Loader";
import { IoAdd, IoCloseOutline, IoWarningOutline } from "react-icons/io5";
import "./Task.css";

const Task = () => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showInput, setShowInput] = useState(false);
  const [isError, setIsError] = useState(false);
  const [newTask, setNewTask] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (newTask.length > 0 && dueDate) {
        const { data } = await axios.post("/api/todo/create", {
          title: newTask,
          dueDate: dueDate,
          isComplete: false,
          user: 115,
        });
        setTasks([...tasks, data]);
        setNewTask("");
        setDueDate("");
        setShowInput(false);
      } else {
        setIsError(true);
      }
    } catch (err) {
      console.log(err.message);
    }
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
  }, [tasks]);

  useEffect(() => {
    const error = setTimeout(() => {
      setIsError(false);
    }, 3000);
    return () => clearTimeout(error, 3000);
  }, [isError]);

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
            {isError && (
              <div className="error">
                <IoWarningOutline />
                <h3>All fields must be filled</h3>
              </div>
            )}
            <button type="submit">Add</button>
          </form>
        </div>
      )}
      {isLoading && <Loader />}
      <div className="tasks">
        {tasks.map((task) => (
          <SingleTask
            key={task.id}
            {...task}
            tasks={tasks}
            setTasks={setTasks}
          />
        ))}
      </div>
    </div>
  );
};

export default Task;
