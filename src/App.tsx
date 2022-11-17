import * as React from 'react';
import AppBarHeader from './components/AppBar';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import HomePage from './pages/Home';
import styles from './index.module.scss'
import CalculatorPage from './pages/CalculatorPage';

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
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
