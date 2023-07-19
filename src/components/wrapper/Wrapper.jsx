import React from "react";
import Styles from "./wrapper.module.scss";
import Sidebar from "@/components/sidebar/Sidebar";

function Wrapper({ children }) {
  return (
    <div className={Styles.wrapper}>
      <Sidebar />
      {children}
    </div>
  );
}

export default Wrapper;
