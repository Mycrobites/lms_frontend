import React, { useEffect, useState } from "react";
// import "./Task.css";
// import plus from './icons8-plus-24.png';
import axios from "axios";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import DeleteIcon from "@material-ui/icons/Delete";
import { Modal } from "react-bootstrap";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";

const ax = axios.create({
  baseURL: "https://lms-seg.herokuapp.com/api/todo/",
  // baseURL: 'https://api.fake.rest/189bf93b-4d78-4f00-86ac-76d87cfccbd1/'
});

const sendTask = (url, task) =>
  ax.post(url, task).catch((err) => {
    throw err;
  });

export const addTask = (task) => {
  console.log(task);
  sendTask(`create`, task);
};

export const updateTask = (taskId) => sendTask(`edit`, taskId);

export const deleteTask = (taskId) => {
  console.log(`edit/${taskId}`);
  ax.delete(`edit/${taskId}`).catch((err) => {
    throw err;
  });
};

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

function AddNewTodoModal(props) {
  const classes = useStyles();

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
        <form
          method="POST"
          className={classes.container}
          onSubmit={props.createNewTask}
        >
          <TextField
            id="taskName"
            label="Task Name"
            autoComplete="current-password"
            className={classes.textField}
          />
          <TextField
            id="date"
            label="Due Date"
            type="date"
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <Button
            type="submit"
            style={{ outline: "none", marginTop: "10px" }}
            variant="contained"
            color="primary"
            onClick={props.onHide}
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
}

class Tasks extends React.Component {
  state = {
    tasks: [],
    modalShow: false,
  };

  showModal() {
    this.setState({
      modalShow: true,
    });
  }

  hideModal() {
    this.setState({
      modalShow: false,
    });
  }

  render() {
    let mounted = true;
    ax.get("Abhinay")
      .then((res) => {
        this.setState((this.state.tasks = res.data));
      })
      .catch((err) => {
        throw err;
      });

    const handleChange = (id) => {
      let task = this.state.tasks.find((task) => task.id === id);
      if (task.isComplete === false) {
        task.isComplete = true;
        ax.put(`https://lms-seg.herokuapp.com/api/todo/edit/${task.id}`, task);
      } else {
        task.isComplete = false;
        ax.put(`https://lms-seg.herokuapp.com/api/todo/edit/${task.id}`, task);
      }
      let tasks = [...this.state.tasks];
      this.setState({
        tasks: tasks,
      });
    };

    const createNewTask = (event) => {
      event.preventDefault();
      const taskName = event.target.taskName.value;
      const dueDate = event.target.date.value;
      const newTodo = {
        title: taskName,
        dueDate: dueDate,
        isComplete: false,
        user: 28,
      };
      addTask(newTodo);
      this.state.tasks = [...this.state.tasks, newTodo];
    };

    return (
      <div className="box">
        <div className="heading">
          Tasks
          <div className="plus">
            <AddIcon
              onClick={() => {
                this.showModal();
              }}
            />
            <AddNewTodoModal
              show={this.state.modalShow}
              onHide={() => this.hideModal()}
              createNewTask={createNewTask}
            />
          </div>
        </div>
        <div className="List">
          {this.state.tasks.map((task) => (
            <div key={task.id} className="Task">
              <input
                onClick={() => handleChange(task.id)}
                type="checkbox"
                checked={task.isComplete}
                value={task.id}
              />
              {task.title}
              <br />
              {task.dueDate}
              <DeleteIcon
                onClick={() => {
                  deleteTask(task.id);
                }}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Tasks;
