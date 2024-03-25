import React, { useState } from "react";
import "./TaskBoard.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TasksSections from "./TasksSections";

const TaskBoard = () => {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const handleFromDateChange = (date) => {
    setFromDate(date);
    setToDate("");
  };

  const handleToDateChange = (date) => {
    setToDate(date);
  };
  return (
    <div className="mainContainer">
      <div className="nameAndUserContainer">
        <p className="mainTitle">Task Board</p>
        <img src="./user.png" alt="userLogo" className="userIcon" />
      </div>
      <div className="tasksContainer">
        <div className="filteringSections">
          <p className="filterByText">Filter By: </p>
          <input type="text" className="inputBox" placeholder="Assignee Name" />
          <select name="priority" id="priority" className="inputBox" required>
            <option value="" disabled selected className="placeholder">
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
              setFromDate("");
              setToDate("");
            }}
          >
            Clear
          </p>
          <button type="button" className="addTaskButton">
            Add New Task
          </button>
        </div>
        <div className="sortBySection">
          <p className="filterByText">Sort By: </p>
          <select name="priority" id="priority" className="inputBox" required>
            <option value="Priority" selected>
              Priority
            </option>
            <option value="Start Date">Start Date</option>
            <option value="End Date">End Date</option>
          </select>
        </div>
        <TasksSections />
      </div>
    </div>
  );
};

export default TaskBoard;
