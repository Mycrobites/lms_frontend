import React, { useEffect, useState } from 'react'
import './Task.css';
import plus from './icons8-plus-24.png';
import axios from 'axios';
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import DeleteIcon from "@material-ui/icons/Delete";
import { Modal } from 'react-bootstrap';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
// import AddNewTodoModal from './Modal'

const ax = axios.create({
  baseURL: 'https://lms-seg.herokuapp.com/api/todo/',
    // baseURL: 'https://api.fake.rest/189bf93b-4d78-4f00-86ac-76d87cfccbd1/'
});

const sendTask = (url, task) =>
  ax
    .post(url, task)
    .catch(err => {
      throw err;
    });

    export const addTask = task =>{
        console.log(task);
        sendTask(`create`, task);
    }
  
    export const updateTask = taskId =>
        sendTask(`edit`, taskId);
  
    export const deleteTask = (taskId) =>{
        console.log(`edit/${taskId}`)
        ax
        .delete(`edit/${taskId}`)
        .catch(err => {
            throw err;
        });
    }

    const useStyles = makeStyles((theme) => ({
        container: {
          display: 'flex',
          flexWrap: 'wrap',
        },
        textField: {
          marginLeft: theme.spacing(1),
          marginRight: theme.spacing(1),
          width: 200,
        },
        root: {
          '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
          },
        },
      }));
    
    
    
    function AddNewTodoModal(props){
        const classes = useStyles();
        const [taskName, setName] = React.useState();
        const [dueDate, setDate] = React.useState();

        const handleName=(event)=>{
            event.preventDefault();
            setName(event.target.value);
        }
        const handleDate=(event)=>{
            event.preventDefault();
            setDate(event.target.value);
        }

        const createNewTask=()=> {
            const newTodo = {
              title: taskName,
              dueDate: dueDate,
              isComplete: false,
              user: 28
            };
            addTask(newTodo);
            props.tasks = [...props.tasks, newTodo];
        };

        return (
            <Modal
            show={props.show}
            onHide={props.onHide}
            backdrop="static"
            animation={true}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            
            <Modal.Body>
              <form method="POST" className={classes.container}>
                <TextField
                  id="taskName"
                  label="Task Name"
                  autoComplete="current-password"
                  className={classes.textField}
                  onChange={handleName}
                />
                <TextField
                  id="date"
                  label="Due Date"
                  type="date"
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={handleDate}
                />
                <Button 
                  type="submit"
                  style={{ outline: 'none', marginTop: '10px'}}
                  variant="contained"
                  color="primary"
                  onClick={createNewTask}
                >
                  Add new
                </Button>
              </form>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
          </Modal>
        );
      };



function Task(){
    var [tasks, setTasks] = useState([]);
    const [modalShow, setModalShow] = React.useState(false);

    useEffect(()=>{
        let mounted = true;
        ax
            .get('Abhinay')
            .then(res =>{
                if(mounted) {
                    setTasks(res.data);
                }
            })
            .catch(err=>{
                throw err;
            });
            return () => mounted = false;
    }, []);


    const handleChange = (event)=>{
        let todo = tasks;
        todo.forEach(task => {
            if(task.id === event.target.value){
                task.isComplete = event.target.checked;
            }
        })
        tasks = todo;
    };


    return(
        <div className="box">
            <div className="heading">
                Tasks
                <div className="plus"><img src={plus} alt="hi" onClick={() => { setModalShow(true) }}/>
                <AddNewTodoModal
                  show={modalShow}
                  onHide={() => setModalShow(false)}
                  tasks={tasks}
                />
                </div>
            </div>
            <div className="List">
                {tasks.map(task => 
                    <div key={task.id} className="Task">
                        <input key={task.id} onChange={handleChange} type="checkbox" checked={task.isComplete} value={task.id}/>
                        {task.title}<br/>
                        {task.dueDate}
                        <EditRoundedIcon onClick={()=>{deleteTask(task.id)}}/>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Task;