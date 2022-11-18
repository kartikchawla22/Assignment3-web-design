import * as React from 'react';
import AppBarHeader from './components/AppBar';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import HomePage from './pages/Home';
import styles from './index.module.scss'
import CalculatorPage from './pages/CalculatorPage';
import WeatherPage from './pages/WeatherPage';
import NewsFeedPage from './pages/NewsFeedPage';
import CurrencyConverterPage from './pages/CurrencyConverterPage';
import ToDoListPage from './pages/ToDoListPage';
import SignUpPage from './pages/Signup';
import Login from './pages/Login';
import ResetPassword from './pages/Reset';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import * as firebaseConfig from "./firebase"
import classnames from 'classnames'



function App() {
  const [isUserSignedIn, setIsUserSignedIn] = React.useState<boolean>(false)
  const auth = getAuth(firebaseConfig.app);
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setIsUserSignedIn(true)
    } else {
      setIsUserSignedIn(false)
    }
  });
  return (
    <Router >
      <div className={styles.content}>
        {isUserSignedIn ? <div className={styles.sideMenu}>
          <AppBarHeader />
        </div> : <></>}
        <div className={classnames(styles.mainContent, !isUserSignedIn ? styles.notLoggedInScreens : "")}>
          {!isUserSignedIn ? (
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route
                path="*"
                element={<Navigate to="/" />}
              />
            </Routes>
          ) : (
            <Routes>
              <Route path="/home" element={<HomePage />} />
              <Route path="/tools/calculator" element={<CalculatorPage />} />
              <Route path="/tools/todolist" element={<ToDoListPage />} />
              <Route path="/services/weather" element={<WeatherPage />} />
              <Route path="/services/newsfeed" element={<NewsFeedPage />} />
              <Route path="/services/currency" element={<CurrencyConverterPage />} />
              <Route
                path="*"
                element={<Navigate to="/home" />}
              />
            </Routes>
          )}
        </div>
      </div>
    </Router >
  );
}

export default App;
