"use client";
import { Button, Stack, TextField } from "@mui/material";
import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import Styles from "./Feedback.module.scss";
// import { useNavigate } from "react-router-dom";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { StateContext } from "@/app/layout";
import axios from "axios";

function Feedback() {
  const navigate = useRouter();
  const { states, setStates } = useContext(StateContext);
  const [feedback, setFeedback] = useState({
    username: states.username,
    email: states.user_email,
    message: "",
  });

  useEffect(() => {
    if (!states.userLoggedIn) {
      navigate.push("/");
    }
  }, []);

  async function submit() {
    try {
      if (feedback.message.length > 2) {
        const result = await axios({
          method: "post",
          url: "/api/feedback",
          data: feedback,
        });
        setFeedback((prev) => ({
          ...prev,
          message: "",
        }));
        alert("Thank You.");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className={Styles.feedback}>
      <div className={Styles.feedback_wrapper}>
        <div className={Styles.back_button}>
          <Button
            onClick={() => {
              navigate.push(`/home/${states.user_id}`);
            }}
          >
            <Icon
              icon="eva:arrow-back-fill"
              color="white"
              width="32"
              height="32"
            />
          </Button>
        </div>
        <div className={Styles.main_container}>
          <h1>We would like to hear from you!</h1>
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
            width={"100%"}
          >
            <div className={Styles.main_logo}>
              <svg
                width="150"
                height="184"
                viewBox="0 0 150 184"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M66.2526 0L123.629 33.1263V99.3789L66.2526 132.505L8.87616 99.3789V33.1263L66.2526 0Z"
                  fill="#009394"
                />
                <path
                  d="M82.8161 0L140.192 33.1263V99.3789L82.8161 132.505L25.4396 99.3789V33.1263L82.8161 0Z"
                  fill="url(#paint0_linear_143_121)"
                />
                <path
                  d="M58.52 166.808C59.6027 167.163 60.4613 167.76 61.096 168.6C61.7307 169.421 62.048 170.448 62.048 171.68C62.048 173.379 61.3947 174.695 60.088 175.628C58.7813 176.543 56.8773 177 54.376 177H44.632V157.4H53.816C56.1307 157.4 57.9133 157.857 59.164 158.772C60.4147 159.668 61.04 160.909 61.04 162.496C61.04 163.467 60.816 164.325 60.368 165.072C59.92 165.819 59.304 166.397 58.52 166.808ZM48.272 160.256V165.66H53.424C54.6933 165.66 55.664 165.436 56.336 164.988C57.0267 164.521 57.372 163.849 57.372 162.972C57.372 162.076 57.0267 161.404 56.336 160.956C55.664 160.489 54.6933 160.256 53.424 160.256H48.272ZM54.152 174.144C56.9707 174.144 58.38 173.201 58.38 171.316C58.38 169.431 56.9707 168.488 54.152 168.488H48.272V174.144H54.152ZM72.3168 177.196C70.8048 177.196 69.4421 176.869 68.2288 176.216C67.0154 175.563 66.0634 174.657 65.3728 173.5C64.7008 172.324 64.3648 170.999 64.3648 169.524C64.3648 168.049 64.7008 166.733 65.3728 165.576C66.0634 164.419 67.0154 163.513 68.2288 162.86C69.4421 162.207 70.8048 161.88 72.3168 161.88C73.8474 161.88 75.2194 162.207 76.4328 162.86C77.6461 163.513 78.5888 164.419 79.2608 165.576C79.9514 166.733 80.2968 168.049 80.2968 169.524C80.2968 170.999 79.9514 172.324 79.2608 173.5C78.5888 174.657 77.6461 175.563 76.4328 176.216C75.2194 176.869 73.8474 177.196 72.3168 177.196ZM72.3168 174.2C73.6048 174.2 74.6688 173.771 75.5088 172.912C76.3488 172.053 76.7688 170.924 76.7688 169.524C76.7688 168.124 76.3488 166.995 75.5088 166.136C74.6688 165.277 73.6048 164.848 72.3168 164.848C71.0288 164.848 69.9648 165.277 69.1248 166.136C68.3034 166.995 67.8928 168.124 67.8928 169.524C67.8928 170.924 68.3034 172.053 69.1248 172.912C69.9648 173.771 71.0288 174.2 72.3168 174.2ZM86.9757 164.232C87.9837 162.664 89.757 161.88 92.2957 161.88V165.212C91.997 165.156 91.7263 165.128 91.4837 165.128C90.121 165.128 89.057 165.529 88.2917 166.332C87.5263 167.116 87.1437 168.255 87.1437 169.748V177H83.6437V162.048H86.9757V164.232ZM101.369 170.588L98.7648 173.052V177H95.2648V156.224H98.7648V168.768L106.017 162.048H110.217L103.973 168.32L110.805 177H106.549L101.369 170.588Z"
                  fill="#009394"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_143_121"
                    x1="139.793"
                    y1="66.2526"
                    x2="21.8637"
                    y2="66.2526"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#00E0C7" />
                    <stop offset="1" stop-color="#009394" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div className={Styles.form_inputs}>
              <TextField
                label="Username"
                value={feedback.username}
                onChange={(e) => {
                  setFeedback((prev) => ({
                    ...prev,
                    username: e.target.value,
                  }));
                }}
                variant="standard"
              />
              <br />
              <TextField
                label="Email"
                value={feedback.email}
                onChange={(e) => {
                  setFeedback((prev) => ({
                    ...prev,
                    email: e.target.value,
                  }));
                }}
                variant="standard"
              />
              <br />
              <br />
              <TextField
                label="Feedback"
                multiline
                autoFocus
                minRows={4}
                maxRows={4}
                placeholder={
                  "Help us by providing your valuable feedback or by reporting a bug."
                }
                value={feedback.message}
                onChange={(e) => {
                  setFeedback((prev) => ({
                    ...prev,
                    message: e.target.value,
                  }));
                }}
                variant="outlined"
                style={{
                  background: "rgba(255,255,255,0.15)",
                  borderRadius: "10px",
                }}
              />
              <div className={Styles.submit_btn}>
                <Button onClick={submit}>
                  <p>Submit</p>
                </Button>
              </div>
            </div>
          </Stack>
        </div>
      </div>
    </div>
  );
}

export default Feedback;
