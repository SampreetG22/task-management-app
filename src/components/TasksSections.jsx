import "./TasksSections.css";

const TasksSections = ({ tasksList, handleDialogOps }) => {
  return (
    <div className="allTasksCategories">
      {tasksList.map((each, i) => {
        return (
          <div key={i} className="eachTasksSection">
            <p className={`${each.color} cardTitle`}>{each.title}</p>
            {each.tasks.length > 0 ? (
              each.tasks.map((task, taskIndex) => (
                <div key={taskIndex} className="eachTaskContainer">
                  <div className="taskNameAndPriority">
                    <p className="tasksName">{task.taskName}</p>
                    <p className="priority">{task.priority}</p>
                  </div>
                  <p className="description">{task.description}</p>
                  <div className="assigneeAndOptions">
                    <p className="assignee">@{task.assignee}</p>
                    <div className="editAndDelete">
                      <p
                        className="options"
                        style={{ borderRight: "1px solid gray" }}
                        onClick={() =>
                          handleDialogOps("edit", task, each.title)
                        }
                      >
                        Edit
                      </p>
                      <p
                        className="options"
                        onClick={() =>
                          handleDialogOps("delete", task, each.title)
                        }
                      >
                        Delete
                      </p>
                    </div>
                  </div>
                  {/* Task status */}
                  {each.title === "Pending" ? (
                    <p className="taskStatus">Assign</p>
                  ) : (
                    <p className="taskStatus">{each.title}</p>
                  )}
                </div>
              ))
            ) : (
              <p className="noTaskText">No tasks {each.title}</p>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default TasksSections;
