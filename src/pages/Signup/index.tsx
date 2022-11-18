import React, { useState } from "react";
import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { getAuth } from 'firebase/auth'
import InputControl from "../../components/InputControl";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import * as firebaseConfig from '../../firebase'

import styles from "./index.module.scss";
import { Button, Typography } from "@mui/material";

const SignupPage = () => {
  const db = getFirestore(firebaseConfig.app);
  const [values, setValues] = useState({
    name: "",
    email: "",
    pass: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

  const handleSubmission = () => {

    if (!values.name || !values.email || !values.pass) {
      setErrorMsg("Fill all fields");
      return;
    }
    setErrorMsg("");

    setSubmitButtonDisabled(true);
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, values.email, values.pass)
      .then(async (res) => {
        setSubmitButtonDisabled(false);
        const user = res.user;
        console.log(res.user);

        await updateProfile(user, {
          displayName: values.name,
        });
        try {
          const docRef = await addDoc(collection(db, "Users"), {
            name: values.name,
            email: values.email
          });
          console.log("Document written with ID: ", docRef.id);
        } catch (e) {
          console.error("Error adding document: ", e);
        }

        setErrorMsg("User Account Created Successfully.");
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
          Signup
        </Typography>

        <InputControl
          label="Name"
          placeholder="Enter your name"
          onChange={(event: any) =>
            setValues((prev) => ({ ...prev, name: event.target.value }))
          }
        />
        <InputControl
          label="Email"
          placeholder="Enter email address"
          onChange={(event: any) =>
            setValues((prev) => ({ ...prev, email: event.target.value }))
          }
        />
        <InputControl
          label="Password"
          placeholder="Enter password"
          onChange={(event: any) =>
            setValues((prev) => ({ ...prev, pass: event.target.value }))
          }
        />

        <div className={styles.footer}>
          <b className={styles.error}>{errorMsg}</b>
          <Button variant="contained" disabled={submitButtonDisabled} onClick={handleSubmission}>
            Signup
          </Button>
          <p>
            Already have an account?{" "}
            <span>
              <Link to="/">Login</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
