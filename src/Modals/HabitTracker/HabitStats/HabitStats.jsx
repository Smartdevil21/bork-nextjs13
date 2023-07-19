import React, { useEffect, useState } from "react";
import Styles from "./HabitStats.module.scss";
import { useContext } from "react";
import { StateContext } from "@/app/layout";
import { Button, Stack } from "@mui/material";
import Calender from "@/components/calender/Calender";
import convertDatesArrToObj from "@/Helpers/Calender/convertDateArrToObj";

function HabitStats() {
  const { states, setStates } = useContext(StateContext);
  const currentActiveHabit = states.activeHabitStat;

  const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const doneDates = currentActiveHabit.doneDates;
  const daysSelected = currentActiveHabit.daysSelected;
  const daysCorrespondingToDoneDays = [];

  doneDates.map((date, index) => {
    const dateInfo = new Date(date);
    daysCorrespondingToDoneDays.push(days[dateInfo.getDay()]);
  });

  // For getting the Best Streak
  let bestStreak = 0;
  let initialDay = daysSelected.indexOf(daysCorrespondingToDoneDays[0]);

  //for Getting the Current Streak
  let currentStreak = 0;
  const reversedDoneDates = [];
  const reversedDaysSelected = [];
  const reversedDaysOfTheWeek = [];

  doneDates.map((date, index) => {
    reversedDoneDates.unshift(date);
  });
  daysSelected.map((day, index) => {
    reversedDaysSelected.unshift(day);
  });
  days.map((day, index) => {
    reversedDaysOfTheWeek.unshift(day);
  });
  for (let i = 0; i < reversedDoneDates.length; i++) {
    const currentDateInfo = new Date(reversedDoneDates[i]);
    const correspondingDay = days[currentDateInfo.getDay()];
    // console.log(correspondingDay, reversedDaysSelected[i%reversedDaysSelected.length]);
    if (
      correspondingDay === reversedDaysSelected[i % reversedDaysSelected.length]
    ) {
      currentStreak++;
    } else {
      break;
    }
  }
  // console.log(reversedDaysSelected);
  // console.log(reversedDoneDates);
  // console.log(reversedDaysOfTheWeek);

  //for Getting the total missed days
  let missedDaysCount = 0;
  const selectedDaysObj = convertDatesArrToObj(daysSelected);
  const doneDatesObj = convertDatesArrToObj(doneDates);
  // console.log(selectedDaysObj);
  const dayToBeChecked = new Date(currentActiveHabit.createdOn);
  const today = new Date();
  function getMissedDays() {
    if (dayToBeChecked <= today) {
      if (days[dayToBeChecked.getDay()] in selectedDaysObj) {
        if (
          `${String(dayToBeChecked).split(" ")[1]}-${
            String(dayToBeChecked).split(" ")[2]
          }-${String(dayToBeChecked).split(" ")[3]}` in doneDatesObj
        ) {
        } else {
          missedDaysCount++;
        }
      } else {
      }
      dayToBeChecked.setDate(dayToBeChecked.getDate() + 1);
      getMissedDays();
    } else {
    }
  }
  getMissedDays();
  // const days

  return (
    <div className={Styles.habit_stats}>
      <div className={Styles.habit_stats_wrapper}>
        <div className={Styles.habit_stats_heading}>
          <h2>About your Habit...</h2>
        </div>
        <div className={Styles.habit_title}>
          <h3>{currentActiveHabit.title}</h3>
        </div>
        <Stack
          justifyContent={"space-between"}
          width={"100%"}
          direction={"row"}
          flexWrap={"wrap"}
        >
          <Stack
            justifyContent={"space-around"}
            width={"50%"}
            direction={"row"}
            flexWrap={"wrap"}
          >
            <div className={Styles.habit_stats_numbers}>
              <p>Total times done: </p>
              <h1 style={{ color: currentActiveHabit.color }}>
                {currentActiveHabit.doneDates.length}
              </h1>
            </div>
            <div className={Styles.habit_stats_numbers}>
              <p>Total times missed: </p>
              <h1 style={{ color: currentActiveHabit.color }}>
                {missedDaysCount}
              </h1>
            </div>
          </Stack>
          <Stack
            justifyContent={"space-around"}
            width={"50%"}
            direction={"row"}
            flexWrap={"wrap"}
          >
            <div className={Styles.habit_stats_numbers}>
              <p>Current Streak: </p>
              <h1 style={{ color: currentActiveHabit.color }}>
                {currentStreak}
              </h1>
            </div>
            <div className={Styles.habit_stats_numbers}>
              <p>Best streak: </p>
              <h1 style={{ color: currentActiveHabit.color }}>{bestStreak}</h1>
            </div>
          </Stack>
        </Stack>
        <Calender currentActiveHabit={currentActiveHabit} />
      </div>
      <div className={Styles.bottom_btns}>
        <Button
          onClick={() => {
            setStates((prev) => ({ ...prev, openHabitStats: false }));
          }}
        >
          Close
        </Button>
      </div>
    </div>
  );
}

export default HabitStats;
