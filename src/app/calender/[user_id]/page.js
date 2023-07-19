"use client";
import React, { useState, useEffect } from "react";
import getDatesOfMonth from "@/Helpers/Calender/getDatesOfMonth";
import Styles from "./Calender.module.scss";
import { Button, Modal, Stack } from "@mui/material";
import { Icon } from "@iconify/react";
import { useContext } from "react";
import { StateContext } from "@/app/layout";
import Day from "@/components/calender/Day/Day";
import CalenderModal from "@/Modals/Calender/CalenderModal";
// import { useNavigate } from "react-router-dom";
import { useRouter } from "next/navigation";
import Wrapper from "@/components/wrapper/Wrapper";

function CalenderPage() {
  const navigate = useRouter();
  const date = new Date();
  const [currentYear, setCurrentYear] = useState(date.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(date.getMonth());
  const monthDays = getDatesOfMonth(currentYear, currentMonth, 1);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const [showCalenderModal, setShowCalenderModal] = useState(false);

  const { states, setStates } = useContext(StateContext);
  const userTasks = states.userTasks;

  useEffect(() => {
    if (!states.userLoggedIn) {
      navigate.push("/");
    }
  }, []);

  return (
    <Wrapper>
      <>
        <div className={Styles.calender}>
          <div className={Styles.calender_wrapper}>
            <Stack
              direction={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <div className={Styles.calender_header}>
                <h1>Calender</h1>
              </div>
              <div className={Styles.controllers}>
                <Stack direction={"row"} alignItems={"center"}>
                  <Button
                    onClick={() => {
                      if (currentMonth === 0) {
                        setCurrentMonth(11);
                      } else {
                        setCurrentMonth((prev) => prev - 1);
                      }
                    }}
                  >
                    <Icon icon="akar-icons:minus" />
                  </Button>
                  <Button style={{ fontSize: "18px", fontWeight: "600" }}>
                    {months[currentMonth]}
                  </Button>
                  <Button
                    onClick={() => {
                      if (currentMonth === 11) {
                        setCurrentMonth(0);
                        setCurrentYear((prev) => prev + 1);
                      } else {
                        setCurrentMonth((prev) => prev + 1);
                      }
                    }}
                  >
                    <Icon color="#00E0C7" icon="akar-icons:plus" />
                  </Button>
                </Stack>
                <Stack direction={"row"} alignItems={"center"}>
                  <Button
                    onClick={() => {
                      setCurrentYear((prev) => prev - 1);
                    }}
                  >
                    <Icon icon="akar-icons:minus" />
                  </Button>
                  <Button style={{ fontSize: "18px", fontWeight: "600" }}>
                    {currentYear}
                  </Button>
                  <Button
                    onClick={() => {
                      setCurrentYear((prev) => prev + 1);
                    }}
                  >
                    <Icon color="#00E0C7" icon="akar-icons:plus" />
                  </Button>
                </Stack>
              </div>
            </Stack>
            <div className={Styles.calender_container}>
              {monthDays.map((date, index) => {
                // console.log(date);
                return (
                  <Day
                    date={date}
                    key={index}
                    index={index}
                    userTasks={userTasks}
                    setShowCalenderModal={setShowCalenderModal}
                  />
                );
              })}
            </div>
          </div>
        </div>
        <Modal open={showCalenderModal}>
          <>
            <CalenderModal setShowCalenderModal={setShowCalenderModal} />
          </>
        </Modal>
      </>
    </Wrapper>
  );
}

export default CalenderPage;
