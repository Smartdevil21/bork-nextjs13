import { Button, Input, TextField } from "@mui/material";
import React, { useState } from "react";
import Styles from "./EditTask.module.scss";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Stack,
} from "@mui/material";
import axios from "axios";
import { useContext } from "react";
import { StateContext } from "@/app/layout";

function EditTask() {
  const { states, setStates } = useContext(StateContext);
  const [loading, setLoading] = useState(false);

  // Extracting the task that is going to be updated
  const [task, setTask] = useState(states.taskToBeEdited.task);

  const handleChange = (event) => {
    setTask((prev) => ({ ...prev, priority: event.target.value }));
  };

  const EditTask = async () => {
    setLoading(true);
    try {
      const result = await axios({
        method: "patch",
        url: "/api/tasks",
        data: {
          _id: states.taskToBeEdited._id,
          updatedTask: task,
        },
      });
      const indexOfCurentTask = states.userTasks.indexOf(states.taskToBeEdited);
      let updatedUserTasks = states.userTasks;
      updatedUserTasks.splice(indexOfCurentTask, 1, {
        ...states.taskToBeEdited,
        task: task,
      });
      setStates((prev) => {
        return {
          ...prev,
          openEditTaskModal: false,
          userTasks: [...updatedUserTasks],
        };
      });
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <div className={Styles.task_details}>
      <h3>Edit your task...</h3>
      <div className={Styles.edit_task_inputs_wrapper}>
        <Stack direction={"column"} spacing={2}>
          <TextField
            variant="outlined"
            size="small"
            value={task.title}
            onChange={(e) => {
              setTask((prev) => ({ ...prev, title: e.target.value }));
            }}
            fullWidth
            label="Title"
          />
          <div className={Styles.date_priority_inputs}>
            <TextField
              variant="outlined"
              size="small"
              label="Created On"
              value={task.createdOn.split("T")[0]}
              disabled
              type={"date"}
            />
            <FormControl
              variant="standard"
              size="small"
              style={{ transform: "translateY(-10px)", minWidth: "80px" }}
            >
              <InputLabel id="demo-simple-select-autowidth-label">
                Priority Level
              </InputLabel>
              <Select
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                value={task.priority}
                label="Priority Level"
                onChange={handleChange}
              >
                <MenuItem value={0}>God</MenuItem>
                <MenuItem value={1}>Dragon</MenuItem>
                <MenuItem value={2}>Wolf</MenuItem>
              </Select>
            </FormControl>
            <TextField
              variant="outlined"
              size="small"
              label="Deadline"
              type={"date"}
              value={task.deadline.split("T")[0]}
              onChange={(e) => {
                setTask((prev) => ({ ...prev, deadline: e.target.value }));
              }}
              InputProps={{ inputProps: { min: task.createdOn.split("T")[0] } }}
            />
          </div>
          <TextField
            variant="standard"
            placeholder="Description"
            multiline
            fullWidth
            minRows={5}
            value={task.description}
            onChange={(e) => {
              setTask((prev) => ({ ...prev, description: e.target.value }));
            }}
          />
        </Stack>
        <div className={Styles.bottom_btns}>
          <Button
            className={Styles.save}
            onClick={() => {
              EditTask();
            }}
          >
            Update
          </Button>
          <Button
            onClick={() => {
              setStates((prev) => ({ ...prev, openEditTaskModal: false }));
            }}
            className={Styles.cancel}
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}

export default EditTask;
