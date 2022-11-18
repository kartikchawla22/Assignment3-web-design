import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { getAuth } from 'firebase/auth'
import InputControl from "../../components/InputControl";


import styles from "./index.module.scss";
import { Button, Typography } from "@mui/material";

const LoginPage = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    pass: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

  const handleSubmission = () => {
    if (!values.email || !values.pass) {
      setErrorMsg("Fill all fields");
      return;
    }
    setErrorMsg("");

    setSubmitButtonDisabled(true);
    const auth = getAuth();
    signInWithEmailAndPassword(auth, values.email, values.pass)
      .then(async (res) => {
        setSubmitButtonDisabled(false);
      })
      .catch((err) => {
        setSubmitButtonDisabled(false);
        setErrorMsg(err.message);
      });
  };
  return (
    <div className={styles.container}>
      <div className={styles.innerBox}>
        <Typography variant="h4" component="div">
          Login
        </Typography>

        <InputControl
          label="Email"
          onChange={(event: any) =>
            setValues((prev) => ({ ...prev, email: event.target.value }))
          }
          placeholder="Enter email address"
        />
        <InputControl
          label="Password"
          onChange={(event: any) =>
            setValues((prev) => ({ ...prev, pass: event.target.value }))
          }
          placeholder="Enter Password"
        />

        <div className={styles.footer}>
          <b className={styles.error}>{errorMsg}</b>
          <Button variant="contained" disabled={submitButtonDisabled} onClick={handleSubmission}>
            Login
          </Button>
          <p>
            Create a new account here{" "}
            <span>
              <Link to="/signup">Sign up</Link>
            </span>
          </p>
          <p>
            Forgot Password?{" "}
            <span>
              <Link to="/reset">Reset Password</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
