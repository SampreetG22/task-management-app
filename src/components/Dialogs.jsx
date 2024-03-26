import { Button, Dialog } from "@mui/material";
import React, { useState } from "react";
import "./Dialogs.css";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

const Dialogs = ({
  value,
  task,
  title,
  closeDialog,
  addTask,
  editTask,
  deleteTask,
}) => {
  const [newTaskDetails, setNewTaskDetails] = useState({
    taskName: "",
    description: "",
    team: "",
    assignee: "",
    priority: "",
  });
  const [editingPriority, setEditingPriority] = useState(
    task ? task.priority : ""
  );
  const [editingTitle, setEditingTitle] = useState(title);

  const handleInputChange = (event, field) => {
    setNewTaskDetails({
      ...newTaskDetails,
      [field]: event.target.value,
    });
  };

  const getAddTaskDialog = () => {
    return (
      <Dialog
        open
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            width: "30vw",
            height: "100%",
            padding: "1vw 0",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          },
        }}
      >
        <div className="headerAndClose">
          <h2 className="dialogHeader">CREATE TASK</h2>
          <HighlightOffIcon className="closeIcon" onClick={closeDialog} />
        </div>
        <div className="dialogContent">
          <p className="label" htmlFor="title">
            Title:
          </p>
          <input
            id="title"
            value={newTaskDetails.title}
            className="dialogInputs"
            onInput={(event) => handleInputChange(event, "taskName")}
          />
          <p className="label" htmlFor="description">
            Description:
          </p>
          <textarea
            rows={3.5}
            id="description"
            value={newTaskDetails.description}
            className="dialogInputs"
            onInput={(event) => handleInputChange(event, "description")}
          />
          <p className="label" htmlFor="team">
            Team:
          </p>
          <input
            id="team"
            value={newTaskDetails.team}
            className="dialogInputs"
            onInput={(event) => handleInputChange(event, "team")}
          />
          <p className="label" htmlFor="assignee">
            Assignee:
          </p>
          <input
            id="assignee"
            value={newTaskDetails.assignee}
            className="dialogInputs"
            onInput={(event) => handleInputChange(event, "assignee")}
          />
          <label
            className="label"
            htmlFor="priority"
            style={{ marginTop: "1vw" }}
          >
            Priority:
          </label>
          <select
            name="priority"
            id="priority"
            className="inputBox addTaskSelectEl"
            required
            style={{ width: "30%" }}
            onChange={(event) => handleInputChange(event, "priority")}
          >
            <option value="" defaultValue>
              Priority
            </option>
            <option value="P0">P0</option>
            <option value="P1">P1</option>
            <option value="P2">P2</option>
          </select>
        </div>
        <Button
          variant="contained"
          className="finalButtons"
          onClick={() => addTask(newTaskDetails)}
          style={{ marginTop: "1vw" }}
        >
          Create Task
        </Button>
      </Dialog>
    );
  };

  const getEditTaskDialog = () => {
    return (
      <Dialog
        open
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            width: "40vw",
            padding: "1vw 0",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          },
        }}
      >
        <div className="headerAndClose">
          <h2 className="dialogHeader">EDIT TASK</h2>
          <HighlightOffIcon className="closeIcon" onClick={closeDialog} />
        </div>
        <div className="dialogContent">
          <p className="label" htmlFor="title">
            Title:
          </p>
          <input
            id="title"
            value={task.taskName}
            className="dialogInputs"
            readOnly
          />
          <p className="label" htmlFor="description">
            Description:
          </p>
          <textarea
            rows={4}
            id="description"
            value={task.description}
            className="dialogInputs"
            readOnly
          />
          <p className="label" htmlFor="team">
            Team:
          </p>
          <input
            id="team"
            value={task.team}
            className="dialogInputs"
            readOnly
          />
          <p className="label" htmlFor="assignee">
            Assignee:
          </p>
          <input
            id="assignee"
            value={task.assignee}
            className="dialogInputs"
            readOnly
          />
          <div className="selectElementsContainer">
            <div style={{ width: "30%", display: "flex", flexGrow: 1 }}>
              <label className="label" htmlFor="priority">
                Priority:
              </label>
              <select
                name="priority"
                id="priority"
                className="selectTags"
                required
                onChange={(event) => setEditingPriority(event.target.value)}
                defaultValue={editingPriority}
              >
                <option value="P0">P0</option>
                <option value="P1">P1</option>
                <option value="P2">P2</option>
              </select>
            </div>
            <div style={{ width: "40%", display: "flex", flexGrow: 1 }}>
              <label className="label" htmlFor="status">
                Status:
              </label>
              <select
                name="status"
                id="status"
                className="selectTags"
                required
                onChange={(event) => setEditingTitle(event.target.value)}
                defaultValue={editingTitle}
              >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="Deployed">Deployed</option>
                <option value="Deferred">Deferred</option>
              </select>
            </div>
          </div>
        </div>
        <div className="buttonContainer">
          <Button
            variant="contained"
            className="finalButtons"
            onClick={() => editTask(task, editingPriority, editingTitle)}
          >
            Submit
          </Button>
          <Button
            variant="contained"
            className="finalButtons"
            onClick={closeDialog}
          >
            Reset
          </Button>
        </div>
      </Dialog>
    );
  };

  const getDeleteTaskDialog = () => {
    return (
      <Dialog
        open
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            width: "30vw",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          },
        }}
      >
        <div className="headerAndClose">
          <h2 className="dialogHeader">DELETE TASK</h2>
          <HighlightOffIcon className="closeIcon" onClick={closeDialog} />
        </div>
        <div className="dialogContent">
          <p>
            Do you wish to Delete Task <strong>{task.taskName}</strong>
          </p>
          <div className="buttonContainer">
            <Button
              variant="contained"
              className="finalButtons"
              onClick={() => deleteTask(task)}
            >
              Yes
            </Button>
            <Button
              variant="contained"
              className="finalButtons"
              onClick={closeDialog}
            >
              No
            </Button>
          </div>
        </div>
      </Dialog>
    );
  };

  if (value === "edit") {
    return getEditTaskDialog();
  } else if (value === "delete") {
    return getDeleteTaskDialog();
  } else if (value === "add") {
    return getAddTaskDialog();
  }
};

export default Dialogs;
