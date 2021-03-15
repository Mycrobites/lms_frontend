import React, {Component} from 'react'
import './Task.css'
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import DeleteIcon from "@material-ui/icons/Delete";
import axios from 'axios';

const ax = axios.create({
    baseURL: 'https://lms-seg.herokuapp.com/api/todo/',
      // baseURL: 'https://api.fake.rest/189bf93b-4d78-4f00-86ac-76d87cfccbd1/'
});

const sendTask = (url, task) =>{
  const result = ax
    .post(url, task)
    .catch(err => {
      throw err;
    });
     return result
    .then(result => { console.log(result.data.id); return result.data.id; })
    .catch(error => { console.error(error); throw error; });
}

    export const addTask = task =>{
        const id = sendTask(`create`, task);
        return id
    }
  
    export const updateTask = (taskId, task) =>{
        ax
        .put(`edit/${taskId}`, task)
        .catch(err => {
            throw err;
        });
    }
        
  
    export const deleteTask = (taskId) =>{
        ax
        .delete(`edit/${taskId}`)
        .catch(err => {
            throw err;
        });
    }


class Task extends Component{


    constructor(props){
        super(props);
        this.state = {
            // todoList: [{id: 1, title: "Complete the react task", dueDate: "2021-05-12", isCompleted: false}, {id: 2, title: "Prepare for quiz", dueDate: "2021-05-12", isCompleted: false}], 
            todoList : [],
            newTaskTitle : "", 
            newTaskDate : "",   
            editTaskTitle : "",
            editTaskDate: ""
        }

    }

    componentDidMount(){
        ax
        .get('rajat')
        .then(res =>{
            this.setState({
                todoList : res.data
            });
        })
        .catch(err=>{
            throw err;
        });
        this.state.todoList.map(
            obj=> ({ ...obj, isEditing: 'false' })
        )
       
    }
    
    render(){

        const handleChange =(event)=>{
            event.preventDefault() 
            const {name, value} = event.target;
            this.setState({ 
                [name] : value
            }) 
        };

        const handleClick = () =>{
            if(this.state.newTaskTitle!=="" && this.state.newTaskDate!==""){
                const obj = {
                    user: 115,
                    title: this.state.newTaskTitle,
                    dueDate : this.state.newTaskDate,
                    isCompleted: false
                }
                const ID = addTask(obj);  
                console.log(ID)
                const lst = this.state.todoList
                const item = {
                    id: ID,
                    title: this.state.newTaskTitle,
                    dueDate : this.state.newTaskDate,
                    isCompleted: false
                }
                lst.push(item)
                
                this.setState({
                    newTaskDate: "",
                    newTaskTitle: "",
                    todoList: lst
                })

                
            }
              
        };

        const deleteHandle =(taskId) =>{
            // console.log(taskId)
            const todos = this.state.todoList.filter((todo) => todo.id !== taskId);
            this.setState({
                todoList: todos,
            });
            deleteTask(taskId)
        }

        

        const editClick = (taskId, TorF) =>{
            const tasks = [...this.state.todoList]
            const ind = tasks.findIndex(el => el.id === taskId)
            tasks[ind].isEditing = TorF;
            tasks[ind].title = this.state.editTaskTitle;
            tasks[ind].dueDate = this.state.editTaskDate;
            this.setState({
                editTaskDate: "",
                editTaskTitle: "",
                todoList: tasks
            })  
            console.log(tasks)
            if(!TorF && this.state.editTaskTitle!=="" && this.state.editTaskDate!==""){
                const todo={
                    title: tasks[ind]['title'],
                    user: 115,
                    isComplete: tasks[ind]['isComplete'],
                    dueDate: tasks[ind]['dueDate']
                } 
                console.log(todo)
                updateTask(taskId, todo)
            }
        }


        return(
            <div className="box">
                <h1>Todo</h1>
                <div>
                    <form>
                        <input onChange={handleChange} type="text" name="newTaskTitle" value={this.state.newTaskTitle} label="Task"/>
                        <input onChange={handleChange} type="date" name="newTaskDate" value={this.state.newTaskDate} label="DueDate"/> 
                    </form>
                    <div><button onClick={handleClick}>Add</button></div>
                </div>
                <div className="List">
                {this.state.todoList.map((task) => 
                    
                    ( !task.isEditing )?
                    
                        (
                            <div key={task.id} className="Task" >
                                <div>
                                    <div>{task.title}</div>
                                    <div>{task.dueDate}</div>
                                </div>
                                <div><EditRoundedIcon onClick={()=>editClick(task.id, true)}/></div>
                                <div><DeleteIcon onClick={() => deleteHandle(task.id)}/></div>
                            </div>
                        ):
                        (
                            <div key={task.id} className="Task">
                                <form>
                                    <input onChange={handleChange} type="text" name="editTaskTitle" value={this.state.editTaskTitle} label="Task"/>
                                    <input onChange={handleChange} type="date" name="editTaskDate" value={this.state.editTaskDate} label="DueDate"/>
                                </form>
                                <div><button onClick={()=>editClick(task.id, false)}>Edit</button></div>
                            </div>
                        )
                    
                )
                }
            </div>
            </div>
        );
    }
}

export default Task;