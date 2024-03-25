import React from "react";
import "./TasksSections.css";

const TasksSections = () => {
  const statuses = [
    {
      title: "Pending",
      color: "gray",
    },
    {
      title: "In Progress",
      color: "orange",
    },
    {
      title: "Completed",
      color: "green",
    },
    {
      title: "Deployed",
      color: "blue",
    },
    {
      title: "Deferred",
      color: "pink",
    },
  ];
  return (
    <div className="allTasksCategories">
      {statuses.map((each, i) => {
        return (
          <div key={i} className="eachTasksSection">
            <p className={`${each.color} cardTitle`}>{each.title}</p>
          </div>
        );
      })}
    </div>
  );
};

export default TasksSections;
