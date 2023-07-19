"use client";
import React from "react";
import Styles from "./habits.module.scss";
import { useContext } from "react";
import { StateContext } from "@/app/layout";
// import { NavLink, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Button, CircularProgress, Modal, Stack } from "@mui/material";
import { Icon } from "@iconify/react";
import Habit from "@/components/habit_tracker/Habit/Habit";
import AddHabit from "@/Modals/HabitTracker/AddHabit/AddHabit";
import EditHabit from "@/Modals/HabitTracker/EditHabit/EditHabit";
import HabitStats from "@/Modals/HabitTracker/HabitStats/HabitStats";
import getCurrentWeekDates from "@/Helpers/Habits/getCurrentWeekDates/getCurrentWeekDates";
import { useRouter } from "next/navigation";
import Wrapper from "@/components/wrapper/Wrapper";

function HabitTracker() {
  const navigate = useRouter();
  const [loading, setLoading] = useState(false);
  const { states, setStates } = useContext(StateContext);
  const weekdaysWithDates = getCurrentWeekDates();
  const user_id = states.user_id;
  const dayIndex = new Date().getDay();

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

  //   const getDetailsOfUser = async () => {
  //     setLoading(true);
  //     try {
  //       const result = await axios({
  //         method: "post",
  //         url: "/username",
  //         data: {
  //           user_id,
  //         },
  //       });
  //       setStates((prev) => ({ ...prev, username: result.data, user_id }));
  //       getUserHabits();
  //     } catch (error) {
  //       console.log(error);
  //     }
  //     setLoading(false);
  //   };

  useEffect(() => {
    // getDetailsOfUser();
    getUserHabits();
  }, [states.openAddHabitModal]);

  useEffect(() => {
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
              transform: "translate(-50%,-50%)",
              color: "#00E0C7",
            }}
          />
        ) : (
          <div className={Styles.habit_tracker}>
            <div className={Styles.habit_tracker_header}>
              <h1 className={Styles.habit_tracker_title}>Habit-Tracker</h1>
              <div className={Styles.header_btns}>
                <Button
                  className={Styles.add_habit_btn}
                  onClick={() => {
                    setStates((prev) => ({ ...prev, openAddHabitModal: true }));
                  }}
                >
                  Add Habit
                </Button>
                {/* <NavLink to={`/habit_tracker/stats?user_id=${states.user_id}`}>
								<svg
									width="24"
									height="24"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
								>
									<g clipPath="url(#clip0_3_201)">
										<path
											d="M7 24H1V18H7V24ZM15 15H9V24H15V15ZM23 11H17V24H23V11ZM23 0L17 1.221L18.716 2.929L11.866 9.662L8.865 6.66L1.024 14.457L2.434 15.875L8.861 9.485L11.852 12.478L20.132 4.341L21.799 6.001L23 0V0Z"
											fill="#73A39E"
										/>
									</g>
									<defs>
										<clipPath id="clip0_3_201">
											<rect width="24" height="24" fill="white" />
										</clipPath>
									</defs>
								</svg>
							</NavLink> */}
              </div>
            </div>
            <div className={Styles.habit_tracker_main_container}>
              {/* For heading and weekdays */}
              <Stack
                direction={"row"}
                alignItems={"center"}
                justifyContent={"space-between"}
                marginBottom={"30px"}
              >
                <div className={Styles.habit_heading}>
                  <h1>Habits</h1>
                </div>
                <Stack
                  direction={"row"}
                  justifyContent={"space-around"}
                  style={{
                    width: "calc(100% - 300px)",
                    backgroundColor: "#F0F0F0",
                    padding: "10px 10px",
                    borderRadius: "20px",
                    boxShadow: "5px 5px 10px rgba(0,0,0,0.05)",
                  }}
                >
                  {weekdaysWithDates.map((dayWithDate, index) => {
                    return (
                      <>
                        <div
                          className={Styles.weekday}
                          key={index}
                          style={{
                            backgroundColor:
                              dayIndex === index ? "#00E0C7" : "#89BFBF",
                          }}
                        >
                          <h3>{dayWithDate.date.split("-")[0]}</h3>
                          <p className={Styles.date}>
                            {dayWithDate.date.split("-")[1]}
                          </p>
                          <p className={Styles.day}>{dayWithDate.day}</p>
                        </div>
                      </>
                    );
                  })}
                </Stack>
              </Stack>

              <div className={Styles.habit_tracker_main}>
                {/* For habits and statuses */}
                <div className={Styles.habit_statuses_container}>
                  <Stack spacing={3}>
                    {/* Each Stack for a single habit */}
                    {states.userHabits.map((habit, index) => {
                      return (
                        <>
                          <Habit
                            habit={habit}
                            index={index}
                            key={index}
                            setLoading={setLoading}
                          />
                        </>
                      );
                    })}
                  </Stack>
                </div>
              </div>
            </div>
            <Modal open={states.openAddHabitModal}>
              <>
                <AddHabit setLoading={setLoading} />
              </>
            </Modal>
            <Modal open={states.openEditHabitModal}>
              <>
                <EditHabit setLoading={setLoading} />
              </>
            </Modal>
            <Modal open={states.openHabitStats}>
              <>
                <HabitStats />
              </>
            </Modal>
          </div>
        )}
      </>
    </Wrapper>
  );
}

export default HabitTracker;
