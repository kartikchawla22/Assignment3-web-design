import { useState } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";
import { Formik } from "formik";
import * as Yup from "yup";
import * as firebaseConfig from '../../firebase'
import styles from "./index.module.scss";
import { Button, Typography } from "@mui/material";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword, updateProfile, getAuth } from "firebase/auth";
import { FirebaseError } from "firebase/app";

const schema = Yup.object().shape({
  name: Yup.string()
    .required("Name is a required field"),
  email: Yup.string()
    .required("Email is a required field")
    .email("Invalid email format"),
  pass: Yup.string()
    .required("Password is a required field")
    .min(6, "Password must be at least 6 characters"),
});


const SignupPage = () => {
  const auth = getAuth();
  const db = getFirestore(firebaseConfig.app);
  const [APIError, setAPIError] = useState<string>("")

  return (
    <div className={styles.container}>
      <div className={styles.innerBox}>
        <Typography variant="h4" component="div" className={styles.heading}>
          Signup
        </Typography>

        <Formik
          validationSchema={schema}
          initialValues={{ email: "", pass: "", name: "" }}
          onSubmit={(values) => {
            createUserWithEmailAndPassword(auth, values.email, values.pass)
              .then(async (res) => {
                const user = res.user;
                await updateProfile(user, {
                  displayName: values.name,
                });
                try {
                  const docRef = await addDoc(collection(db, "Users"), {
                    name: values.name,
                    email: values.email
                  });
                } catch (e) {
                  console.error("Error adding document: ", e);
                }
              })
              .catch((err: FirebaseError) => {
                switch (err.code) {
                  case "auth/wrong-password":
                    setAPIError("Email OR Password is wrong")
                    break;
                  case "auth/user-not-found":
                    setAPIError("User Not Found")
                    break;
                  case "auth/email-already-in-use":
                    setAPIError("User Aready Exists")
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
                      type="text"
                      name="name"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.name}
                      placeholder="Enter Name"
                      className={styles.formControl}
                    />
                    <p className={styles.error}>
                      {errors.name && touched.name && errors.name}
                    </p>
                  </div>
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
                      Already Have an account{" "}
                      <span>
                        <Link to="/">Login</Link>
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

export default SignupPage;
