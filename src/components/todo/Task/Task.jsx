import React from "react";
import Styles from "./Task.module.scss";
import { Icon } from "@iconify/react";
import { IconButton } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import { useContext } from "react";
import { StateContext } from "@/app/layout";
import axios from "axios";

function Task({ taskData, completed, home }) {
  const { states, setStates } = useContext(StateContext);

  async function deleteTask(taskDataArg) {
    try {
      const result = await axios({
        method: "delete",
        url: "/api/tasks",
        data: {
          _id: taskDataArg._id,
        },
      });
      // console.log(result);
      const userTasks = states.userTasks;
      const completedTask = states.completedTask;
      setStates((prev) => ({
        ...prev,
        userTasks: userTasks.filter((task, index) => task !== taskDataArg),
        completedTask: completedTask.filter(
          (task, index) => task !== taskDataArg
        ),
      }));
    } catch (error) {
      console.log(error);
    }
  }

  async function completedTask(taskDataArg) {
    let completedTask = { ...taskDataArg };
    if (completedTask.task.status === "progress") {
      completedTask.task.status = "completed";
    } else {
      completedTask.task.status = "progress";
    }
    try {
      const result = await axios({
        method: "put",
        url: "/api/tasks",
        data: {
          completedTask,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className={Styles.task} style={{ opacity: completed ? 0.5 : 1 }}>
      <div className={Styles.status}>
        <Checkbox
          style={{ color: "#009394" }}
          checked={completed}
          onChange={(e) => {
            if (e.target.checked) {
              const indexOfTask = states.userTasks.indexOf(taskData);
              const completedTaskList = states.completedTask;
              let userTasks = states.userTasks;
              setStates((prev) => ({
                ...prev,
                completedTask: completedTaskList.concat(userTasks[indexOfTask]),
                userTasks: userTasks.filter(
                  (ele, index) => index !== indexOfTask
                ),
              }));
            } else {
              const indexOfTask = states.completedTask.indexOf(taskData);
              const completedTaskList = states.completedTask;
              let userTasks = states.userTasks;
              setStates((prev) => ({
                ...prev,
                completedTask: completedTaskList.filter(
                  (task, index) => index !== indexOfTask
                ),
                userTasks: userTasks.concat(taskData),
              }));
            }
            completedTask(taskData);
          }}
        />
      </div>
      <div
        className={Styles.task_title}
        onClick={() => {
          if (!completed) {
            setStates((prev) => ({
              ...prev,
              openEditTaskModal: home ? false : true,
              taskToBeEdited: taskData,
            }));
          }
        }}
      >
        <h3 style={{ textDecoration: completed ? "line-through" : "none" }}>
          {taskData.task.title}
        </h3>
        <div
          className={Styles.priority}
          style={{
            backgroundColor:
              taskData.task.priority == 0
                ? "#FF6363"
                : taskData.task.priority == 1
                ? "#FFC700"
                : "#6EEF9A",
          }}
        ></div>
      </div>
      <div className={Styles.delete_task}>
        <IconButton
          onClick={() => {
            deleteTask(taskData);
          }}
        >
          <Icon color="red " icon="fluent:delete-24-regular" />
        </IconButton>
      </div>
    </div>
  );
}

export default Task;
