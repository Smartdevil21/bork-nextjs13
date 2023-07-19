"use client";
import React, { useEffect, useState } from "react";
import Styles from "./page.module.scss";
// import login from "../../Images/login.png";
import TextField from "@mui/material/TextField";
import { Button, Stack } from "@mui/material";
// import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { StateContext } from "./layout";
import Link from "next/link";
import { useRouter } from "next/navigation";

function Login() {
  const { setStates } = useContext(StateContext);
  const navigator = useRouter();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const loginUser = async (e) => {
    if (e.key === "Enter" || e.type === "click") {
      setLoading(true);
      try {
        const response = await axios.post("/api/login", user);
        console.log(response);
        if (response.data.success) {
          document.querySelector(".login_err").innerHTML = "";
          setStates((prev) => ({
            ...prev,
            user_email: response.data.result.email,
            username: response.data.result.username,
            userLoggedIn: true,
            user_id: response.data.result._id,
          }));
          alert("Welcome");
          navigator.push(`/home/${response.data.result._id}`);
        } else {
          document.querySelector(".login_err").innerHTML =
            "Incorrect Username or Password!";
        }
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    }
  };

  return (
    <div className={Styles.login} onKeyDown={loginUser} tabIndex="0">
      <div className={Styles.login_wrapper}>
        <div className={Styles.login_img}>
          <img src={"/login.png"} alt="login_img" />
        </div>
        <div className={Styles.login_inputs}>
          <Stack direction={"column"} spacing={2}>
            <h1>Sign In...</h1>
            <TextField
              variant="standard"
              size="small"
              label="Username"
              value={user.username}
              onChange={(e) => {
                setUser((prev) => ({ ...prev, username: e.target.value }));
              }}
              type="text"
            />
            <TextField
              variant="standard"
              size="small"
              value={user.password}
              onChange={(e) => {
                setUser((prev) => ({ ...prev, password: e.target.value }));
              }}
              label="Password"
              type="password"
            />
            <p
              className="login_err"
              style={{ color: "red", fontSize: "10px", fontWeight: "600" }}
            ></p>
            <div className={Styles.bottom_btns}>
              <Button onClick={loginUser}>
                {loading ? "loading" : "Sign-In"}
              </Button>
            </div>
            <Stack>
              <p className={Styles.sign_up_link}>
                Don&apos;t have an account?{" "}
                <Link href={"/signup"} passHref>
                  Create one
                </Link>
              </p>
            </Stack>
          </Stack>
        </div>
      </div>
    </div>
  );
}

export default Login;
