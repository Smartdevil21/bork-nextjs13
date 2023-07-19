import React from "react";
import Styles from "./Habit.module.scss";
import { Stack } from "@mui/material";
import { Icon } from "@iconify/react";
import getCurrentWeekDates from "@/Helpers/Habits/getCurrentWeekDates/getCurrentWeekDates";
import { useContext } from "react";
import { StateContext } from "@/app/layout";
import axios from "axios";
import convertDatesArrToObj from "@/Helpers/Calender/convertDateArrToObj";
import doneDatesSorter from "@/Helpers/Habits/doneDatesSorter/doneDatesSorter";

function Habit({ habit, index, setLoading }) {
  const { states, setStates } = useContext(StateContext);
  const weekdaysWithDates = getCurrentWeekDates();
  const date = new Date();
  const todayDate = `${String(date).split(" ")[1]}-${
    String(date).split(" ")[2]
  }-${String(date).split(" ")[3]}`;
  // const todayDate = "Mar-08-2022";
  const dateArr = [];
  weekdaysWithDates.forEach((dateObj, index) => {
    dateArr.push(dateObj.date);
  });
  const daysArr = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const changeHabitToBeEdited = () => {
    setStates((prev) => ({
      ...prev,
      openEditHabitModal: true,
      habitToBeEdited: habit,
    }));
  };

  const openHabitStats = () => {
    setStates((prev) => ({
      ...prev,
      activeHabitStat: habit,
      openHabitStats: true,
    }));
  };

  const deleteHabit = async () => {
    setLoading(true);
    try {
      const result = await axios({
        method: "delete",
        url: "/api/habits",
        data: {
          habit_id: habit._id,
        },
      });
      const prevHabits = states.userHabits;
      setStates((prev) => ({
        ...prev,
        userHabits: prevHabits.filter((item) => item !== habit),
      }));
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const updateHabit = async (dateToBeChecked) => {
    //For upading the doneDates Array
    let updatedDoneDates = habit.doneDates;
    const updatedDoneDatesObj = convertDatesArrToObj(updatedDoneDates);
    if (dateToBeChecked in updatedDoneDatesObj) {
      updatedDoneDates = updatedDoneDates.filter(
        (date) => date !== dateToBeChecked
      );
    } else {
      updatedDoneDates.push(dateToBeChecked);
    }
    let allUserHabits = states.userHabits;
    const currentlyUpdatedHabit = habit;
    currentlyUpdatedHabit.doneDates = doneDatesSorter(updatedDoneDates);
    allUserHabits.splice(index, 1, currentlyUpdatedHabit);

    try {
      const result = await axios({
        method: "patch",
        url: "/api/habits",
        data: currentlyUpdatedHabit,
      });
      setStates((prev) => ({
        ...prev,
        userHabits: allUserHabits,
      }));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Stack direction={"row"} alignItems={"center"}>
      {/* For name of habit */}
      <div className={Styles.habit_name}>
        <p onClick={openHabitStats}>{habit.title}</p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          className={Styles.habit_action_menu}
        >
          <path d="M12 18c1.657 0 3 1.343 3 3s-1.343 3-3 3-3-1.343-3-3 1.343-3 3-3zm0-9c1.657 0 3 1.343 3 3s-1.343 3-3 3-3-1.343-3-3 1.343-3 3-3zm0-9c1.657 0 3 1.343 3 3s-1.343 3-3 3-3-1.343-3-3 1.343-3 3-3z" />
        </svg>
        <div className={Styles.habit_edit_opts}>
          <div className={Styles.habit_edit_opts_container}>
            <Icon
              icon="ant-design:edit-outlined"
              onClick={changeHabitToBeEdited}
              style={{ color: "#00E0C7" }}
              width="24"
            />
            <Icon
              icon="ant-design:delete-outlined"
              style={{ color: "red" }}
              width="24"
              onClick={deleteHabit}
            />
          </div>
        </div>
      </div>
      {/* For Status of the habit */}
      <Stack
        direction={"row"}
        justifyContent={"space-around"}
        alignItems={"center"}
        style={{
          width: "calc(100% - 300px)",
          padding: "0px 10px",
        }}
      >
        {weekdaysWithDates.map((weekdayWithDate, index) => {
          if (habit.daysSelected?.indexOf(weekdayWithDate.day) == -1) {
            // to check if the day is in selected days or not
            return (
              <div key={index} className={Styles.unselected_day_indicator}>
                <div
                  className={Styles.dash}
                  style={{ background: habit.color, opacity: "0.5" }}
                />
              </div>
            );
          } else {
            if (habit.doneDates?.indexOf(weekdayWithDate.date) !== -1) {
              // to check if the day is in doneDates arr or not
              return (
                <div key={index} className={Styles.done_day}>
                  {/* Check svg */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill={habit.color}
                    onClick={() => {
                      // console.log(states);
                      updateHabit(weekdayWithDate.date);
                    }}
                  >
                    <path d="M0 11c2.761.575 6.312 1.688 9 3.438 3.157-4.23 8.828-8.187 15-11.438-5.861 5.775-10.711 12.328-14 18.917-2.651-3.766-5.547-7.271-10-10.917z" />
                  </svg>
                </div>
              );
            } else {
              if (
                dateArr.indexOf(weekdayWithDate.date) >=
                dateArr.indexOf(todayDate)
              ) {
                // to check if the day is ahead of today or passed
                return (
                  <div
                    key={index}
                    onClick={() => {
                      if (
                        dateArr.indexOf(weekdayWithDate.date) ===
                        dateArr.indexOf(todayDate)
                      ) {
                        updateHabit(weekdayWithDate.date);
                      }
                    }}
                    className={Styles.habit_circle}
                    style={{ backgroundColor: habit.color }}
                  ></div>
                );
              } else {
                if (
                  dateArr.indexOf(weekdayWithDate.date) >=
                  dateArr.indexOf(habit.createdOn)
                ) {
                  // to check if
                  return (
                    <div key={index} className={Styles.done_day}>
                      {/* Missed svg */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill={habit.color}
                        className={Styles.missed_day}
                        onClick={() => {
                          updateHabit(weekdayWithDate.date);
                        }}
                      >
                        <path d="M23.954 21.03l-9.184-9.095 9.092-9.174-2.832-2.807-9.09 9.179-9.176-9.088-2.81 2.81 9.186 9.105-9.095 9.184 2.81 2.81 9.112-9.192 9.18 9.1z" />
                      </svg>
                    </div>
                  );
                } else {
                  return (
                    <div
                      key={index}
                      className={Styles.unselected_day_indicator}
                    >
                      <div className={Styles.dash} />
                    </div>
                  );
                }
              }
            }
          }
        })}
      </Stack>
    </Stack>
  );
}

export default Habit;
