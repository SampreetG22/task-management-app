import React, { useState } from "react";
import "./TaskBoard.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TasksSections from "./TasksSections";
import Dialogs from "./Dialogs";
import { Alert, Button, Snackbar } from "@mui/material";
import { useEffect } from "react";

export let defaultList = [
  {
    title: "Pending",
    color: "gray",
    tasks: [
      {
        taskName: "Task 1",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit erat, sed diam nonumy eirmod tempor",
        assignee: "Marvel",
        team: "Avengers",
        priority: "P2",
        created: new Date("December 17, 2023 00:00:00"),
      },
      {
        taskName: "Task 1",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit erat, sed diam nonumy eirmod tempor",
        assignee: "Rookie",
        team: "Avengers",
        priority: "P0",
        created: new Date("December 17, 2023 00:00:00"),
      },
    ],
  },
  {
    title: "In Progress",
    color: "orange",
    tasks: [
      {
        taskName: "Task 2",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit erat, sed diam nonumy eirmod tempor",
        assignee: "Alpha",
        team: "Progressers",
        priority: "P1",
        created: new Date("January 10, 2024 00:00:00"),
      },
    ],
  },
  {
    title: "Completed",
    color: "green",
    tasks: [
      {
        taskName: "Task 3",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit erat, sed diam nonumy eirmod tempor",
        assignee: "Sampreet",
        team: "Completers",
        priority: "P0",
        created: new Date("Feb 14, 2024 00:00:00"),
      },
    ],
  },
  {
    title: "Deployed",
    color: "blue",
    tasks: [
      {
        taskName: "Task 4",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit erat, sed diam nonumy eirmod tempor",
        assignee: "Beta",
        team: "Deployers",
        priority: "P2",
        created: new Date("March 05, 2024 00:00:00"),
      },
      {
        taskName: "Task 4",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit erat, sed diam nonumy eirmod tempor",
        assignee: "Beta",
        team: "Deployers",
        priority: "P0",
        created: new Date("March 05, 2024 00:00:00"),
      },
    ],
  },
  {
    title: "Deferred",
    color: "pink",
    tasks: [
      {
        taskName: "Task 5",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit erat, sed diam nonumy eirmod tempor",
        assignee: "Gamma",
        team: "Deferrers",
        priority: "P2",
        created: new Date("Feb 01, 2024 00:00:00"),
      },
    ],
  },
];

const TaskBoard = () => {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [tasksToDisplay, setTasksToDisplay] = useState([...defaultList]);
  const [showDialog, setShowDialog] = useState(false);
  const [currentTitle, setCurrentTitle] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [dialogType, setDialogType] = useState("");
  const [nameFilter, setNameFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [snackBar, setSnackBar] = useState({
    open: false,
    color: "",
    message: "",
  });
  const [sortBy, setSortBy] = useState("Priority");

  useEffect(() => {
    const filteredList = defaultList.map((status) => {
      return {
        ...status,
        tasks: status.tasks.filter(
          (task) =>
            task.assignee.toLowerCase().includes(nameFilter.toLowerCase()) &&
            task.priority
              .toLowerCase()
              .includes(priorityFilter.toLowerCase()) &&
            (!fromDate ||
              !toDate ||
              (task.created >= fromDate && task.created <= toDate))
        ),
      };
    });
    setTasksToDisplay(filteredList);
  }, [nameFilter, priorityFilter, fromDate, toDate]);

  useEffect(() => {
    const sortedList = defaultList.map((status) => {
      let sortedTasks = [...status.tasks];
      if (sortBy === "Priority") {
        sortedTasks.sort((a, b) => {
          const priorityOrder = { P0: 0, P1: 1, P2: 2 };
          return priorityOrder[a.priority] - priorityOrder[b.priority];
        });
      } else if (sortBy === "Start Date") {
        sortedTasks.sort((a, b) => a.created - b.created);
      } else if (sortBy === "End Date") {
        sortedTasks =
          status.title === "Completed"
            ? [...status.tasks].sort((a, b) => b.endDate - a.endDate)
            : [...status.tasks];
      }
      return { ...status, tasks: sortedTasks };
    });
    setTasksToDisplay(sortedList);
  }, [sortBy]);

  const handleFromDateChange = (date) => {
    setFromDate(date);
    setToDate("");
  };

  const handleToDateChange = (date) => {
    setToDate(date);
  };

  const handleDialogOps = (value, task, title) => {
    setCurrentTitle(title);
    setSelectedTask(task);
    setShowDialog(true);
    if (value === "edit") {
      setDialogType("edit");
    } else if (value === "delete") {
      setDialogType("delete");
    } else if (value === "add") {
      setDialogType("add");
    }
  };

  const closeDialog = () => {
    setShowDialog(false);
  };

  const createNewTask = (taskToCreate) => {
    const isTaskExists = defaultList[0].tasks.some(
      (task) => task.taskName === taskToCreate.taskName
    );
    if (isTaskExists) {
      alert("Task with the same name already exists!");
    } else {
      taskToCreate.created = new Date();
      defaultList[0].tasks.push(taskToCreate);
      setTasksToDisplay(defaultList);
      setShowDialog(false);
      setSnackBar({
        open: true,
        color: "success",
        message: "Task created successfully",
      });
    }
  };

  const editTask = (taskToEdit, newPriority, newStatus) => {
    // Delete the task from its current status
    tasksToDisplay.forEach((status) => {
      if (status.title === currentTitle) {
        status.tasks = status.tasks.filter(
          (task) => task.taskName !== taskToEdit.taskName
        );
      }
    });
    // Create the edited task object
    const editedTask = {
      taskName: taskToEdit.taskName,
      description: taskToEdit.description,
      assignee: taskToEdit.assignee,
      team: taskToEdit.team,
      priority: newPriority,
      created: taskToEdit.created,
    };
    if (newStatus === "Completed") {
      editedTask.endDate = new Date();
    }
    // Find the status to which the task should be added
    const newStatusIndex = tasksToDisplay.findIndex(
      (status) => status.title === newStatus
    );
    if (newStatusIndex !== -1) {
      tasksToDisplay[newStatusIndex].tasks.push(editedTask);
    }
    setShowDialog(false);
    setSnackBar({
      open: true,
      color: "success",
      message: "Task edited successfully",
    });
  };

  const deleteTask = (taskToDelete) => {
    tasksToDisplay.forEach((status) => {
      if (status.title === currentTitle) {
        status.tasks = status.tasks.filter(
          (task) => task.taskName !== taskToDelete.taskName
        );
      }
    });
    setShowDialog(false);
    setSnackBar({
      open: true,
      color: "success",
      message: "Task deleted successfully",
    });
  };

  return (
    <>
      <div className="mainContainer">
        <div className="nameAndUserContainer">
          <p className="mainTitle">Task Board</p>
          <img src="./user.png" alt="userLogo" className="userIcon" />
        </div>
        <div className="tasksContainer">
          <div className="filteringSections">
            <div
              style={{
                width: "50vw",
                display: "flex",
                alignItems: "center",
                flexGrow: 1,
              }}
            >
              <p className="filterByText">Filter By: </p>
              <input
                type="text"
                className="inputBox"
                placeholder="Assignee Name"
                value={nameFilter}
                onChange={(event) => setNameFilter(event.target.value)}
              />
              <select
                name="priority"
                id="priority"
                className="inputBox"
                required
                value={priorityFilter}
                onChange={(event) => setPriorityFilter(event.target.value)}
              >
                <option value="" defaultValue>
                  Priority
                </option>
                <option value="P0">P0</option>
                <option value="P1">P1</option>
                <option value="P2">P2</option>
              </select>
              <div className="dateContainer">
                <DatePicker
                  selected={fromDate}
                  onChange={handleFromDateChange}
                  className="inputBoxDates"
                  placeholderText="DD/MM/YYYY"
                  dateFormat="dd/MM/yyyy"
                />
                -
                <DatePicker
                  selected={toDate}
                  onChange={handleToDateChange}
                  className="inputBoxDates"
                  placeholderText="DD/MM/YYYY"
                  dateFormat="dd/MM/yyyy"
                  minDate={fromDate}
                />
              </div>
              <p
                className="clearIcon"
                onClick={() => {
                  setNameFilter("");
                  setPriorityFilter("");
                  setFromDate("");
                  setToDate("");
                }}
              >
                Clear
              </p>
            </div>

            <Button
              variant="contained"
              className="addTaskButton"
              onClick={() => handleDialogOps("add")}
            >
              Add New Task
            </Button>
          </div>
          <div className="sortBySection">
            <p className="filterByText">Sort By: </p>
            <select
              name="priority"
              id="priority"
              className="inputBox"
              required
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
            >
              <option value="Priority" defaultValue>
                Priority
              </option>
              <option value="Start Date">Start Date</option>
              <option value="End Date">End Date</option>
            </select>
          </div>
          <TasksSections
            tasksList={tasksToDisplay}
            handleDialogOps={handleDialogOps}
            closeDialog={closeDialog}
            addTask={createNewTask}
          />
        </div>
        <Snackbar
          open={snackBar.open}
          autoHideDuration={2000}
          onClose={() => setSnackBar({ ...snackBar, open: false })}
        >
          <Alert
            onClose={() => setSnackBar({ ...snackBar, open: false })}
            severity={snackBar.color}
            variant="filled"
            sx={{ width: "100%" }}
          >
            {snackBar.message}
          </Alert>
        </Snackbar>
      </div>
      {showDialog && (
        <Dialogs
          value={dialogType}
          task={selectedTask}
          title={currentTitle}
          closeDialog={closeDialog}
          addTask={createNewTask}
          editTask={editTask}
          deleteTask={deleteTask}
        />
      )}
    </>
  );
};

export default TaskBoard;
