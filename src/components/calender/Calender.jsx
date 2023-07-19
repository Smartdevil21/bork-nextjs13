import React, { useState } from "react";
import Styles from "./Calender.module.scss";
import getDatesOfMonth from "@/Helpers/Calender/getDatesOfMonth";
import { Button, Stack } from "@mui/material";
import convertDatesArrToObj from "@/Helpers/Calender/convertDateArrToObj";

function Calender({ currentActiveHabit }) {
  const datesObj = convertDatesArrToObj(currentActiveHabit.doneDates);
  const currentDate = new Date();
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
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
  const todayDate = `${String(currentDate).split(" ")[1]}-${
    String(currentDate).split(" ")[2]
  }-${String(currentDate).split(" ")[3]}`;
  const dates = getDatesOfMonth(currentYear, currentMonth, 1);
  return (
    <div className={Styles.calender}>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        width={"100%"}
        marginBottom={"20px"}
      >
        <h4>You did this habit on:</h4>
        <Stack direction={"row"} alignItems={"center"}>
          <Stack direction={"row"} spacing={2} alignItems={"center"}>
            <Button
              onClick={() => {
                if (currentMonth == 0) {
                  setCurrentMonth(11);
                  setCurrentYear((prev) => prev - 1);
                } else {
                  setCurrentMonth((prev) => prev - 1);
                }
              }}
            >
              {"-"}
            </Button>
            <h4>{months[currentMonth]}</h4>
            <Button
              onClick={() => {
                if (currentMonth < currentDate.getMonth()) {
                  if (currentMonth == 11) {
                    setCurrentMonth(0);
                    setCurrentYear((prev) => prev + 1);
                  } else {
                    setCurrentMonth((prev) => prev + 1);
                  }
                }
              }}
            >
              {"+"}
            </Button>
          </Stack>

          <Stack direction={"row"} spacing={2} alignItems={"center"}>
            <Button
              onClick={() => {
                setCurrentYear((prev) => prev - 1);
              }}
            >
              {"-"}
            </Button>
            <h4>{currentYear}</h4>
            <Button
              onClick={() => {
                if (currentYear < currentDate.getFullYear()) {
                  setCurrentYear((prev) => prev + 1);
                }
              }}
            >
              {"+"}
            </Button>
          </Stack>
        </Stack>
      </Stack>
      <Stack direction={"row"} width={"100%"} flexWrap={"wrap"}>
        {dates.map((date, index) => (
          <div
            className={Styles.date}
            key={index}
            style={{
              backgroundColor:
                date in datesObj ? currentActiveHabit.color : "#0000000d",
              border:
                date == currentActiveHabit?.createdOn
                  ? `2px dashed ${currentActiveHabit.color}`
                  : "none",
            }}
          >
            <h5>{date.split("-")[1]}</h5>
          </div>
        ))}
      </Stack>
    </div>
  );
}

export default Calender;
