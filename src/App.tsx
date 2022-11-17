import * as React from 'react';
import AppBarHeader from './components/AppBar/appBar';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import HomePage from './pages/Home/home';
import styles from './index.module.scss'

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
            {/* <Route path="/" element={<HomePage />} />
      <Route path="/news" element={<NewsPage />} />
      <Route path="/calculator" element={<CalculatorPage />} />
      <Route path="/weather" element={<WeatherPage />} /> */}
            {/* <Route
          path="*"
          element={<Navigate to="/" />}
        /> */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
