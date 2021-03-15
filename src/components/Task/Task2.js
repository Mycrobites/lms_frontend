import { useState, useEffect } from "react";
import axios from "../../axios/axios";
import SingleTask from "./SingleTask";
import { IoAdd } from "react-icons/io5";
import "./Task2.css";
import Loader from "../Loader/Loader";
import ClearIcon from '@material-ui/icons/Clear';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './datePicker.css'



const Task2 = () => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const[visible , setVisible]=useState(false)
  const[newTask,setNewTask]=useState()
  const [dueDate, setDueDate] = useState(new Date());

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  
const handleChange = e=>{
    setNewTask(e.target.value)
}
const toggleVisibility =()=>{
  setVisible(!visible)
}

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
        <button onClick={toggleVisibility}>
          {visible ? <ClearIcon/>:<IoAdd /> }
        </button>
      </div>
  
      
      <div className='add-task' id={visible ? "visible" : "hidden"} >
      <form onSubmit={handleSubmit}>
      <input type="text" 
      placeholder="Add New Task"
      name="addTask"
      value={newTask}
      onChange={handleChange}/>
      
      <div className='submit-comp'>
      <div className='date'><DatePicker selected={dueDate} onChange={date => setDueDate(date)} /></div>
      
      <button onClick={handleSubmit} type="submit">Add</button>
      </div>
      
      </form>
          
      </div>
 


      {isLoading &&<Loader/>}
      <div className="tasks">
        {tasks.map((task) => (
          <SingleTask key={task.id} {...task} />
        ))}
      </div>
    </div>
  );
};

export default Task2;
