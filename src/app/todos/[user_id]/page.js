"use client";
import React, { useState } from "react";
import Styles from "./todos.module.scss";
import Button from "@mui/material/Button";
import { Icon } from "@iconify/react";
import {
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Stack,
} from "@mui/material";
import Task from "@/components/todo/Task/Task";
import EditTask from "@/Modals/Todo/EditTask/EditTask";
import AddTask from "@/Modals/Todo/AddTask/AddTask";
import axios from "axios";
import { useEffect } from "react";
import { useContext } from "react";
import { StateContext } from "@/app/layout";
// import addTask from "@/Images/addTask.png";
import sortByCreated from "@/Helpers/Tasks/sortTaskByCreated/sortTaskbyCreated";
import sortByDeadline from "@/Helpers/Tasks/sortTasksByDeadline/sortByDeadLine";
import sortByPriority from "@/Helpers/Tasks/sortByPriority/sortByPriority";
// import { useNavigate } from "react-router-dom";
import { useRouter } from "next/navigation";
import Wrapper from "@/components/wrapper/Wrapper";

function ToDo() {
  const navigate = useRouter();
  const { states, setStates } = useContext(StateContext);
  const [sortBy, setSortBy] = useState("created");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setSortBy(event.target.value);
  };

  useEffect(() => {
    if (!states.userLoggedIn) {
      navigate.push("/");
    }
  }, []);

  function taskSorter() {
    switch (sortBy) {
      case "created":
        const sortedUserTasksByCreated = sortByCreated(states.userTasks);
        setStates((prev) => ({ ...prev, userTasks: sortedUserTasksByCreated }));
        break;
      case "deadline":
        const sortedUserTasksByDeadline = sortByDeadline(states.userTasks);
        setStates((prev) => ({
          ...prev,
          userTasks: sortedUserTasksByDeadline,
        }));
        break;
      case "priority":
        const sortedUserTasksBypriority = sortByPriority(states.userTasks);
        setStates((prev) => ({
          ...prev,
          userTasks: sortedUserTasksBypriority,
        }));
        break;
    }
  }

  const userTasks = states.userTasks;
  const completedTask = states.completedTask;

  const totalTasks = userTasks.length + completedTask.length;
  const progress = (completedTask.length / (totalTasks ? totalTasks : 1)) * 100;

  const getTasksOfUser = async () => {
    setLoading(true);
    try {
      const tasksDetails = await axios({
        method: "post",
        url: "/api/user/tasks",
        data: {
          user_id: states.user_id,
        },
      });
      const userTasks = tasksDetails.data.data;
      setStates((prev) => ({
        ...prev,
        userTasks: sortByCreated(
          userTasks.filter((task, index) => task.task.status === "progress")
        ),
        completedTask: userTasks.filter(
          (task, index) => task.task.status === "completed"
        ),
      }));
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const clearAllCompletedTasks = async () => {
    try {
      const tasksToBeDeleted = states.completedTask.reduce((idAccArr, task) => {
        return [...idAccArr, task._id];
      }, []);
      const result = await axios({
        method: "delete",
        url: "/api/user/tasks",
        data: {
          user_id: states.user_id,
          tasksToBeDeleted,
        },
      });
      setStates((prev) => ({ ...prev, completedTask: [] }));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!states.openAddTaskModal) {
      getTasksOfUser();
    }
  }, [states.openAddTaskModal]);

  useEffect(taskSorter, [sortBy]);

  return (
    <Wrapper>
      <>
        {loading ? (
          <CircularProgress
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              trasnform: "translate(-50%,-50%)",
              color: "#00E0C7",
            }}
          />
        ) : (
          <div className={Styles.todo}>
            <div className={Styles.todo_header}>
              <h1>To-Do List</h1>
              <div className={Styles.todo_progress}>
                <p>{Math.round(progress)}% Completed</p>
                <div
                  className={Styles.todo_progress_bar}
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
            <div className={Styles.todo_main}>
              <div className={Styles.todo_intro}>
                <div className={Styles.text}>
                  <h3>Hey {states.username},</h3>
                  <p>
                    Let&apos;s get some <strong>bork</strong> done!
                  </p>
                </div>
                <div className={Styles.todo_btns}>
                  <FormControl
                    variant="standard"
                    size="small"
                    style={{ transform: "translateY(-10px)", minWidth: "80px" }}
                  >
                    <InputLabel id="demo-simple-select-autowidth-label">
                      Sort by
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-autowidth-label"
                      id="demo-simple-select-autowidth"
                      value={sortBy}
                      label="Sort by"
                      onChange={handleChange}
                    >
                      <MenuItem value={"created"}>Created First</MenuItem>
                      <MenuItem value={"priority"}>Priority (Highest)</MenuItem>
                      <MenuItem value={"deadline"}>Deadline First</MenuItem>
                    </Select>
                  </FormControl>
                  <Button
                    className={Styles.add_task_btn}
                    onClick={() => {
                      setStates((prev) => ({
                        ...prev,
                        openAddTaskModal: true,
                      }));
                    }}
                  >
                    <Icon icon="fluent:add-20-filled" />
                    Add Task
                  </Button>
                </div>
              </div>
              <div className={Styles.tasks}>
                <Stack direction={"column"} spacing={2}>
                  {states.userTasks.length ? (
                    <>
                      <p>Tasks to Do...</p>
                      {states.userTasks.map((taskData, index) => {
                        return (
                          <Task
                            key={index}
                            completed={false}
                            taskData={taskData}
                          />
                        );
                      })}
                    </>
                  ) : (
                    <img
                      className={Styles.addTask}
                      src={"/addTask.png"}
                      alt="addTask"
                    />
                  )}

                  {states.completedTask.length ? (
                    <Stack
                      direction={"row"}
                      justifyContent={"space-between"}
                      alignItems={"center"}
                      style={{ marginTop: "40px" }}
                    >
                      <p>Completed Tasks...</p>
                      <Button
                        className={Styles.clear_all_completed_tasks_btn}
                        onClick={clearAllCompletedTasks}
                      >
                        Clear All Completed Tasks
                      </Button>
                    </Stack>
                  ) : null}

                  {states.completedTask.map((taskData, index) => {
                    return (
                      <Task
                        key={index}
                        home={false}
                        completed={true}
                        taskData={taskData}
                      />
                    );
                  })}
                </Stack>
              </div>
            </div>
          </div>
        )}
        <Modal open={states.openEditTaskModal}>
          <>
            <EditTask />
          </>
        </Modal>
        <Modal open={states.openAddTaskModal}>
          <>
            <AddTask />
          </>
        </Modal>
      </>
    </Wrapper>
  );
}

export default ToDo;
