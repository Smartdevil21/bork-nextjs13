"use client";
import "./globals.css";
import { createContext, useState } from "react";

export const StateContext = createContext();

// export const metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

export default function RootLayout({ children }) {
  // const [windowWidth, setWindowWidth] = useState(0);

  const [states, setStates] = useState({
    user_id: "",
    username: "",
    user_email: "",
    userLoggedIn: false,

    // todo States
    openEditTaskModal: false,
    openAddTaskModal: false,
    taskToBeEdited: {},
    userTasks: [],
    completedTask: [],

    // Habit Tracker States
    openAddHabitModal: false,
    openEditHabitModal: false,
    openHabitStats: false,
    activeHabitStat: {},
    habitToBeEdited: {},
    userHabits: [],

    // Calender States
    tasksOfSelectedDay: [],
    dateOfDaySelectedInModal: "",
  });

  const contextObj = {
    states,
    setStates,
  };
  return (
    <StateContext.Provider value={contextObj}>
      <html lang="en">
        <body>{children}</body>
      </html>
    </StateContext.Provider>
  );
}
