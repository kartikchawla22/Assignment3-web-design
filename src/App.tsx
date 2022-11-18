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
import SignUpPage from './pages/Signup/Signup';
import Login from './pages/Login/Login';
import ResetPassword from './pages/Reset/Reset';


function App() {
  return (
    <Router >
      <div className={styles.content}>
        <div className={styles.sideMenu}>
          <AppBarHeader />
        </div>
        <div className={styles.mainContent}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/tools/calculator" element={<CalculatorPage />} />
            <Route path="/tools/todolist" element={<ToDoListPage />} />
            <Route path="/services/weather" element={<WeatherPage />} />
            <Route path="/services/newsfeed" element={<NewsFeedPage />} />
            <Route path="/services/currency" element={<CurrencyConverterPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
