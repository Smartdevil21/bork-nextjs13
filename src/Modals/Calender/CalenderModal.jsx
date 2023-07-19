import { Button, Stack } from "@mui/material";
import React from "react";
import Styles from "./CalenderModal.module.scss";
import { useContext } from "react";
import { StateContext } from "@/app/layout";

function CalenderModal({ setShowCalenderModal }) {
  const { states, setStates } = useContext(StateContext);

  return (
    <div className={Styles.calender_modal}>
      <Stack>
        <h3>
          Tasks you need to get done by{" "}
          <strong>{states.dateOfDaySelectedInModal}</strong> :
        </h3>
        <div className={Styles.tasks_wrapper}>
          {states.tasksOfSelectedDay.map((userTask, index) => (
            <>
              <div key={index} className={Styles.task_title_wrapper}>
                <div
                  style={{
                    backgroundColor:
                      userTask.task.priority === 0
                        ? "#FF6363"
                        : userTask.task.priority === 1
                        ? "#FFC700"
                        : "#6EEF9A",
                  }}
                  className={Styles.priority}
                ></div>
                <p>{userTask.task.title}</p>
              </div>
            </>
          ))}
        </div>
      </Stack>
      <div className={Styles.bottom_div}>
        <Button
          onClick={() => {
            setShowCalenderModal(false);
          }}
        >
          Close
        </Button>
      </div>
    </div>
  );
}

export default CalenderModal;
