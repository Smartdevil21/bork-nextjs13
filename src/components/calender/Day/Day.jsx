// import { Stack } from "@mui/material";
import React, { useState } from "react";
// import CalenderModal from "../../../Modals/Calender/CalenderModal";
import Styles from "./Day.module.scss";
import { useContext } from "react";
import { StateContext } from "@/app/layout";
import sortByPriority from "@/Helpers/Tasks/sortByPriority/sortByPriority";

function Day({ date, index, userTasks, setShowCalenderModal }) {
  const { states, setStates } = useContext(StateContext);
  let limit = 0;
  let totalTasks = 0;
  let tasksArr = [];

  const todayinfo = new Date();
  const todayDate = `${String(todayinfo).split(" ")[1]}-${
    String(todayinfo).split(" ")[2]
  }-${String(todayinfo).split(" ")[3]}`;

  return (
    <>
      <div
        key={index}
        className={Styles.day_div}
        style={{ border: todayDate === date ? "2px solid #00E0C7" : "none" }}
        onClick={() => {
          setShowCalenderModal(true);
          setStates((prev) => ({
            ...prev,
            dateOfDaySelectedInModal: date,
            tasksOfSelectedDay: sortByPriority(tasksArr),
          }));
        }}
      >
        <div className={Styles.date}>
          <h3>{date.split("-")[1]}</h3>
        </div>
        {userTasks.map((userTask, taskIndex) => {
          const deadlineDate = new Date(userTask.task.deadline);
          const currentDate = `${String(deadlineDate).split(" ")[1]}-${
            String(deadlineDate).split(" ")[2]
          }-${String(deadlineDate).split(" ")[3]}`;
          if (date === currentDate) {
            totalTasks++;
            tasksArr.push(userTask);
            if (limit <= 1) {
              limit++;
              return (
                <div key={taskIndex} className={Styles.tasks_for_the_day}>
                  <div
                    className={Styles.priority}
                    style={{
                      backgroundColor:
                        userTask.task.priority === 0
                          ? "#FF6363"
                          : userTask.task.priority === 1
                          ? "#FFC700"
                          : "#6EEF9A",
                    }}
                  />
                  <p>
                    {userTask.task.title.length < 8
                      ? userTask.task.title
                      : `${userTask.task.title.slice(0, 8)}...`}
                  </p>
                </div>
              );
            }
          }
        })}
        {totalTasks - limit > 0 ? (
          <p className={Styles.task_indicator}>{`+${totalTasks - 2} tasks`}</p>
        ) : (
          ""
        )}
      </div>
    </>
  );
}

export default Day;
