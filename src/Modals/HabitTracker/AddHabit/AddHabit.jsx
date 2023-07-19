import React from "react";
import Styles from "./AddHabit.module.scss";
import { useContext } from "react";
import { StateContext } from "@/app/layout";
import { Button, Stack, TextField } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import daysSorter from "@/Helpers/Habits/daysSorter/daysSorter";

function AddHabit({ setLoading }) {
  const { states, setStates } = useContext(StateContext);
  const date = new Date();
  const trimmedDate = `${String(date).split(" ")[1]}-${
    String(date).split(" ")[2]
  }-${String(date).split(" ")[3]}`;
  const [habit, setHabit] = useState({
    user_id: states.user_id,
    title: "",
    description: "",
    daysSelected: [],
    timeOfTheDay: "Morning",
    doneDates: [],
    color: "#73A39E",
    totalTimesDone: 0,
    totalTimesMissed: 0,
    currentStreak: [0, trimmedDate],
    bestStreak: 0,
    createdOn: trimmedDate,
  });

  const daySelect = (day, e) => {
    if (habit.daysSelected.indexOf(day) !== -1) {
      e.target.style.background = "#f7f7f7";
      e.target.style.color = "#73A39E";
      const daysSelectedArr = habit.daysSelected;
      setHabit((prev) => ({
        ...prev,
        daysSelected: daysSelectedArr.filter((item) => item !== day),
      }));
    } else {
      e.target.style.background = "#73A39E";
      e.target.style.color = "#f7f7f7";
      const daysSelectedArr = habit.daysSelected;
      setHabit((prev) => ({
        ...prev,
        daysSelected: daysSorter(daysSelectedArr.concat(day)),
      }));
    }
  };

  function selectColor(e) {
    setHabit((prev) => ({ ...prev, color: e.target.style.background }));
  }

  const addHabit = async () => {
    setLoading(true);
    try {
      const result = await axios({
        method: "post",
        url: "/api/habits",
        data: habit,
      });
      const updatedUserHabits = states.userHabits;
      setStates((prev) => ({
        ...prev,
        userHabits: updatedUserHabits.concat(habit),
        openAddHabitModal: false,
      }));
      // console.log(result);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <div className={Styles.add_habit}>
      <div className={Styles.add_habit_wrapper}>
        <div className={Styles.add_habit_main_wrapper}>
          <h2>Add a new habit...</h2>
          <Stack spacing={2}>
            <TextField
              label="Title of habit"
              value={habit.value}
              onChange={(e) => {
                setHabit((prev) => ({ ...prev, title: e.target.value }));
              }}
              size="small"
            />
            <TextField
              value={habit.description}
              onChange={(e) => {
                setHabit((prev) => ({ ...prev, description: e.target.value }));
              }}
              multiline
              minRows={3}
              maxRows={3}
              label="Description"
              size="small"
            />
            <Stack direction={"row"} justifyContent={"space-between"}>
              <div className={Styles.do_it_at}>
                <h3>Do it at:</h3>
                <div className={Styles.do_it_at_wrapper}>
                  <Stack width={"50%"} spacing={2} marginRight={"20px"}>
                    <Button
                      className={Styles.time_of_day}
                      onClick={() => {
                        setHabit((prev) => ({
                          ...prev,
                          timeOfTheDay: "Morning",
                        }));
                      }}
                      style={{
                        background:
                          habit.timeOfTheDay == "Morning"
                            ? "#73A39E"
                            : "#f7f7f7",
                        color:
                          habit.timeOfTheDay == "Morning" ? "#fff" : "#73A39E",
                      }}
                    >
                      Morning
                    </Button>
                    <Button
                      className={Styles.time_of_day}
                      onClick={() => {
                        setHabit((prev) => ({
                          ...prev,
                          timeOfTheDay: "Evening",
                        }));
                      }}
                      style={{
                        background:
                          habit.timeOfTheDay == "Evening"
                            ? "#73A39E"
                            : "#f7f7f7",
                        color:
                          habit.timeOfTheDay == "Evening" ? "#fff" : "#73A39E",
                      }}
                    >
                      Evening
                    </Button>
                  </Stack>
                  <Stack width={"50%"} spacing={2}>
                    <Button
                      className={Styles.time_of_day}
                      onClick={() => {
                        setHabit((prev) => ({
                          ...prev,
                          timeOfTheDay: "Afternoon",
                        }));
                      }}
                      style={{
                        background:
                          habit.timeOfTheDay == "Afternoon"
                            ? "#73A39E"
                            : "#f7f7f7",
                        color:
                          habit.timeOfTheDay == "Afternoon"
                            ? "#fff"
                            : "#73A39E",
                      }}
                    >
                      Afternoon
                    </Button>
                    <Button
                      className={Styles.time_of_day}
                      onClick={() => {
                        setHabit((prev) => ({
                          ...prev,
                          timeOfTheDay: "Night",
                        }));
                      }}
                      style={{
                        background:
                          habit.timeOfTheDay == "Night" ? "#73A39E" : "#f7f7f7",
                        color:
                          habit.timeOfTheDay == "Night" ? "#fff" : "#73A39E",
                      }}
                    >
                      Night
                    </Button>
                  </Stack>
                </div>
              </div>
              <div className={Styles.colors}>
                <h3>Color:</h3>
                <Stack direction={"row"} flexWrap={"wrap"}>
                  <div
                    className={`${Styles.color}  ${
                      habit.color === "rgb(33, 104, 105)"
                        ? Styles.active_color
                        : null
                    }`}
                    onClick={selectColor}
                    style={{ background: "rgb(33, 104, 105)" }}
                  ></div>
                  <div
                    className={`${Styles.color}  ${
                      habit.color === "rgb(185, 226, 140)"
                        ? Styles.active_color
                        : null
                    }`}
                    onClick={selectColor}
                    style={{ background: "rgb(185, 226, 140)" }}
                  ></div>
                  <div
                    className={`${Styles.color}  ${
                      habit.color === "rgb(67, 87, 173)"
                        ? Styles.active_color
                        : null
                    }`}
                    onClick={selectColor}
                    style={{ background: "rgb(67, 87, 173)" }}
                  ></div>
                  <div
                    className={`${Styles.color}  ${
                      habit.color === "rgb(233, 79, 55)"
                        ? Styles.active_color
                        : null
                    }`}
                    onClick={selectColor}
                    style={{ background: "rgb(233, 79, 55)" }}
                  ></div>
                  <div
                    className={`${Styles.color}  ${
                      habit.color === "rgb(243, 116, 174)"
                        ? Styles.active_color
                        : null
                    }`}
                    onClick={selectColor}
                    style={{ background: "rgb(243, 116, 174)" }}
                  ></div>
                </Stack>
                <Stack direction={"row"} alignItems={"center"}>
                  <h4 style={{ marginRight: "10px" }}>Custom Color:</h4>
                  <div className={Styles.color_input_wrapper}>
                    <input
                      type={"color"}
                      className={Styles.color_input}
                      value={habit.color}
                      onChange={(e) => {
                        setHabit((prev) => ({
                          ...prev,
                          color: e.target.value,
                        }));
                      }}
                      name="color"
                    />
                  </div>
                </Stack>
              </div>
            </Stack>
            <div className={Styles.days_of_the_week}>
              <h3>Select the days of the week:</h3>
              <Stack direction={"row"} spacing={2}>
                <Button
                  className={Styles.day}
                  onClick={(e) => {
                    daySelect("SUN", e);
                  }}
                >
                  Sunday
                </Button>
                <Button
                  className={Styles.day}
                  onClick={(e) => {
                    daySelect("MON", e);
                  }}
                >
                  Monday
                </Button>
                <Button
                  className={Styles.day}
                  onClick={(e) => {
                    daySelect("TUE", e);
                  }}
                >
                  Tuesday
                </Button>
                <Button
                  className={Styles.day}
                  onClick={(e) => {
                    daySelect("WED", e);
                  }}
                >
                  Wednesday
                </Button>
                <Button
                  className={Styles.day}
                  onClick={(e) => {
                    daySelect("THU", e);
                  }}
                >
                  Thursday
                </Button>
                <Button
                  className={Styles.day}
                  onClick={(e) => {
                    daySelect("FRI", e);
                  }}
                >
                  Friday
                </Button>
                <Button
                  className={Styles.day}
                  onClick={(e) => {
                    daySelect("SAT", e);
                  }}
                >
                  Saturday
                </Button>
              </Stack>
            </div>
          </Stack>
          <p
            className="days_selected_err"
            style={{
              fontFamily: "'Montserrat', sans-serif",
              color: "red",
              fontSize: "12px",
              fontWeight: "600",
              marginTop: "10px",
            }}
          ></p>
        </div>
        <div className={Styles.bottom_div}>
          <Button
            className={Styles.add_btn}
            onClick={() => {
              if (habit.daysSelected.length == 0) {
                document.querySelector(".days_selected_err").innerHTML =
                  "Select Some Days First!";
              } else {
                addHabit();
              }
            }}
          >
            Add
          </Button>
          <Button
            className={Styles.cancel_btn}
            onClick={() => {
              setStates((prev) => ({ ...prev, openAddHabitModal: false }));
            }}
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AddHabit;
