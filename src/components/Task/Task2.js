import { useState, useEffect } from "react";
import axios from "../../axios/axios";
import SingleTask from "./SingleTask";
import { IoAdd } from "react-icons/io5";
import "./Task2.css";

const Task2 = () => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const { data } = await axios.get("/api/todo/Abhinay");
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
        <button>
          <IoAdd />
        </button>
      </div>
      <div className="tasks">
        {tasks.map((task) => (
          <SingleTask key={task.id} {...task} />
        ))}
      </div>
    </div>
  );
};

export default Task2;
