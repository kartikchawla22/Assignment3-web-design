import { useState } from "react";
import { Link } from "react-router-dom";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import { Formik } from "formik";
import * as Yup from "yup";
import { Button, Typography } from "@mui/material";
import { FirebaseError } from "firebase/app";
import classNames from "classnames";
import styles from "./index.module.scss";

const schema = Yup.object().shape({
  email: Yup.string()
    .required("Email is a required field")
    .email("Invalid email format"),
  pass: Yup.string()
    .required("Password is a required field")
    .min(5, "Password must be at least 8 characters"),
});

const LoginPage = () => {
  const auth = getAuth();
  const [APIError, setAPIError] = useState<string>("")
  return (
    <div className={styles.container}>
      <div className={styles.innerBox}>
        <Typography variant="h4" component="div" className={styles.heading}>
          Login
        </Typography>

        <Formik
          validationSchema={schema}
          initialValues={{ email: "", pass: "" }}
          onSubmit={(values) => {
            signInWithEmailAndPassword(auth, values.email, values.pass)
              .then(async (res) => {
              })
              .catch((err: FirebaseError) => {
                console.log(err.message, err.code);
                switch (err.code) {
                  case "auth/wrong-password":
                    setAPIError("Email OR Password is wrong")
                    break;
                  case "auth/user-not-found":
                    setAPIError("User Not Found")
                    break;
                }
              });
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
          }) => (
            <div className={styles.login}>
              <div className={styles.form}>
                <form noValidate onSubmit={handleSubmit}>
                  <div className={styles.inputContainer}>
                    <input
                      type="email"
                      name="email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                      placeholder="Enter email id"
                      className={styles.formControl}
                      id="email"
                    />
                    <p className={styles.error}>
                      {errors.email && touched.email && errors.email}
                    </p>
                  </div>
                  <div className={styles.inputContainer}>
                    <input
                      type="password"
                      name="pass"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.pass}
                      placeholder="Enter password"
                      className={styles.formControl}
                    />
                    <p className={styles.error}>
                      {errors.pass && touched.pass && errors.pass}
                    </p>
                  </div>
                  <p className={classNames(styles.error, styles.apiError)}>
                    {APIError}
                  </p>
                  <Button variant="contained" type="submit">Login</Button>

                  <div className={styles.footer}>
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
                </form>

              </div>
            </div>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default LoginPage;
