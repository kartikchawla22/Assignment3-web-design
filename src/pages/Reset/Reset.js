import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {getAuth,sendPasswordResetEmail}  from 'firebase/auth'
import InputControl from "../InputControl/InputControl";


import styles from "./Reset.module.css";

function Reset() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

  const handleSubmission = () => {
    if (!values.email) {
      setErrorMsg("Enter a valid email id");
      return;
    }
    setErrorMsg("");

    setSubmitButtonDisabled(true);
    const auth = getAuth();
    sendPasswordResetEmail(auth, values.email)
      .then(async (res) => {
        setSubmitButtonDisabled(false);
        
        setErrorMsg("Password reset email Sent.");
      })
      .catch((err) => {
        setSubmitButtonDisabled(false);
        setErrorMsg(err.message);
      });
  };
  return (
    <div className={styles.container}>
      <div className={styles.innerBox}>
        <h1 className={styles.heading}>Enter your Email </h1>

        <InputControl
          label="Email"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, email: event.target.value }))
          }
          placeholder="Enter email address"
        />
        <div className={styles.footer}>
          <b className={styles.error}>{errorMsg}</b>
          <button disabled={submitButtonDisabled} onClick={handleSubmission}>
            Reset Password
          </button>
          <p>
          Create a new account here{" "}
            <span>
              <Link to="/signup">Sign up</Link>
            </span>
          </p>
          <p>
          Login here{" "}
            <span>
              <Link to="/signup">Login</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Reset;
