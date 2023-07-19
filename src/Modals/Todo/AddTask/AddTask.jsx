import { Button, Input, TextField } from "@mui/material";
import React, { useState } from "react";
import Styles from "./AddTask.module.scss";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Stack,
} from "@mui/material";
import { useEffect } from "react";
import axios from "axios";
// import { useParams } from "react-router-dom";
import { useContext } from "react";
import { StateContext } from "@/app/layout";

function AddTask() {
  const { states, setStates } = useContext(StateContext);
  //   const { path_username } = useParams();
  const [loading, setLoading] = useState(false);

  const [task, setTask] = useState({
    title: "",
    createdOn: "",
    deadline: Date,
    priority: 2,
    description: "",
  });

  const handleChange = (event) => {
    setTask((prev) => ({ ...prev, priority: event.target.value }));
  };

  const t = new Date();
  const dd = String(t.getDate()).padStart(2, "0");
  const mm = String(t.getMonth() + 1).padStart(2, "0"); //January is 0!
  const yyyy = t.getFullYear();

  const addTask = async () => {
    setLoading(true);
    try {
      const result = await axios({
        method: "post",
        url: "/api/tasks",
        data: {
          user_id: states.user_id,
          task,
        },
      });
      // console.log(result);
      // const userTasks = states.userTasks;
      setStates((prev) => ({ ...prev, openAddTaskModal: false }));
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    setTask((prev) => ({
      ...prev,
      deadline: `${yyyy}-${mm}-${dd}`,
      createdOn: `${yyyy}-${mm}-${dd}`,
    }));
  }, []);

  return (
    <div className={Styles.task_details}>
      <h3>Add some bork...</h3>
      <div className={Styles.edit_task_inputs_wrapper}>
        <Stack direction={"column"} spacing={2}>
          <TextField
            variant="outlined"
            size="small"
            autoFocus
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
              value={task.createdOn}
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
              value={task.deadline}
              onChange={(e) => {
                setTask((prev) => ({ ...prev, deadline: e.target.value }));
              }}
              InputProps={{ inputProps: { min: task.createdOn } }}
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
              addTask();
            }}
          >
            Add
          </Button>
          <Button
            onClick={() => {
              setStates((prev) => ({ ...prev, openAddTaskModal: false }));
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

export default AddTask;
