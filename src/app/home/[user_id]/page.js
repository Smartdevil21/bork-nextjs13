"use client";
import Styles from "./home.module.scss";
import React, { useEffect, useState } from "react";
// import afternoon from "../../Images/afternoon.svg";
// import morning from "../../Images/morning.svg";
// import evening from "../../Images/evening.svg";
import axios from "axios";
import { useContext } from "react";
import { StateContext } from "@/app/layout";
import sortByCreated from "@/Helpers/Tasks/sortTaskByCreated/sortTaskbyCreated";
// import { useLocation } from "react-router-dom";
import { CircularProgress, Stack } from "@mui/material";
import Task from "@/components/todo/Task/Task";
// import { useNavigate } from "react-router-dom";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react";
import Wrapper from "@/components/wrapper/Wrapper";

function Home({ params }) {
  const navigate = useRouter();
  const user_id = params.user_id;
  const [loading, setLoading] = useState(false);
  const { states, setStates } = useContext(StateContext);
  const [qoute, setQuote] = useState("");

  //TO GET TODAY'S DATE
  const todayInfo = new Date();
  const todayDate = `${String(todayInfo).split(" ")[1]} ${
    String(todayInfo).split(" ")[2]
  }, ${String(todayInfo).split(" ")[3]}`;

  //to get the % of tasks remaining
  const userTasks = states.userTasks;
  const completedTask = states.completedTask;

  const totalTasks = userTasks.length + completedTask.length;
  const progress = (completedTask.length / (totalTasks ? totalTasks : 1)) * 100;

  //   const months = [
  //     "January",
  //     "February",
  //     "March",
  //     "April",
  //     "May",
  //     "June",
  //     "July",
  //     "August",
  //     "September",
  //     "October",
  //     "November",
  //     "December",
  //   ];
  const daysArr = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let missedTasks = 0; // MISSED TASKS COUNT

  //TO GET THE tASK OF USER
  const getTasksOfUser = async () => {
    setLoading(true);
    try {
      const tasksDetails = await axios({
        method: "post",
        url: "/api/user/tasks",
        data: {
          user_id,
        },
      });
      const result = await axios({
        method: "get",
        url: "https://api.quotable.io/random?maxLength=50",
      });
      setQuote(result.data.content);
      const userTasks = tasksDetails.data.data;
      setStates((prev) => ({
        ...prev,
        userTasks: sortByCreated(
          userTasks?.filter((task, index) => task.task.status === "progress")
        ),
        completedTask: userTasks.filter(
          (task, index) => task.task.status === "completed"
        ),
        user_id,
      }));
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  //TO GET USER HABITS
  const getUserHabits = async () => {
    try {
      const result = await axios({
        method: "post",
        url: "/api/user/habits",
        data: {
          user_id,
        },
      });
      setStates((prev) => ({ ...prev, userHabits: result.data.data }));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getTasksOfUser();
    getUserHabits();
    if (!states.userLoggedIn) {
      navigate.push("/");
    }
  }, []);

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
          <div className={Styles.home}>
            <div className={Styles.home_heading}>
              <h1>Dashboard</h1>
              <p>{todayDate}</p>
            </div>
            <div className={Styles.main_wrapper}>
              <div className={Styles.horizontal_divs}>
                <div className={Styles.time_div}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={
                      todayInfo.getHours() < 12
                        ? "/morning.svg"
                        : todayInfo.getHours() > 17
                        ? "/evening.svg"
                        : "/afternoon.svg"
                    }
                    alt=""
                  />
                  <div className={Styles.time_div_text}>
                    <p className={Styles.thought}>{qoute}</p>
                    <div className={Styles.time_day}>
                      <div className={Styles.time}>
                        <h1>{`${todayInfo.getHours()}:${
                          todayInfo.getMinutes() < 10
                            ? "0" + todayInfo.getMinutes()
                            : todayInfo.getMinutes()
                        }`}</h1>
                        <p>{todayInfo.getHours() < 12 ? "A.M." : "P.M."}</p>
                      </div>
                      <h3>{daysArr[todayInfo.getDay()]}</h3>
                    </div>
                  </div>
                </div>
                <div className={Styles.remaining_tasks}>
                  <p>Remaining tasks for today:</p>
                  <div className={Styles.task}>
                    <Stack direction={"column"} spacing={1}>
                      {states.userTasks
                        .filter(
                          (task, index) => task.task.status === "progress"
                        )
                        .map((userTask, index) => {
                          const deadline = new Date(userTask.task.deadline);
                          const today = new Date(todayDate);
                          const finalDeadline = new Date(
                            `${String(deadline).split(" ")[1]}-${
                              String(deadline).split(" ")[2]
                            }-${String(deadline).split(" ")[3]}`
                          );

                          if (today.getTime() === finalDeadline.getTime()) {
                            // setMissedTasks(prev=>prev+1);
                            return (
                              <Task
                                key={index}
                                completed={false}
                                taskData={userTask}
                                home={true}
                              />
                            );
                          }
                          if (today.getTime() > finalDeadline.getTime()) {
                            missedTasks++;
                          }
                        })}
                    </Stack>
                  </div>
                </div>
              </div>
              <div className={Styles.user_profile}>
                <div className={Styles.user_image}>
                  {/* <img src={morning} alt="" /> */}
                  <Icon
                    icon="bi:person-fill"
                    color="gray"
                    width="32"
                    height="32"
                  />
                </div>
                <div className={Styles.user_greetings_text}>
                  <p>
                    {todayInfo.getHours() < 12
                      ? "Good Morning"
                      : todayInfo.getHours() > 17
                      ? "Good Evening"
                      : "Good Afternoon"}
                    ,
                  </p>
                  <h3>{states.username}</h3>
                </div>
                <div className={Styles.user_stat_numbers}>
                  <div className={Styles.missed_tasks}>
                    <p>Total Missed Tasks:</p>
                    <h3>{missedTasks}</h3>
                  </div>
                  <br />
                  <div className={Styles.missed_tasks}>
                    <p>Habits currently working on:</p>
                    <h3>{states.userHabits.length}</h3>
                  </div>
                </div>
                <div
                  className={Styles.task_pie_chart}
                  style={{
                    background: `conic-gradient(#00E0C7 0% ${progress}%, transparent ${progress}% 100%)`,
                  }}
                >
                  <div className={Styles.percentage}>
                    <h3>{Math.round(progress)}%</h3>
                    <p> Tasks completed!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    </Wrapper>
  );
}

export default Home;
