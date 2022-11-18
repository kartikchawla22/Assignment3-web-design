import * as React from 'react';
import AppBarHeader from '../../components/AppBar';
import styles from './index.module.scss'
import Profile from '../Profile/Profile';
import Typography from '@mui/material/Typography';

const HomePage = () => {
    return (
       
      <div className={styles.content}>
        <div className={styles.sideMenu}>
          <AppBarHeader />
        </div>
        <div className={styles.mainContent}>
        <Profile/>
        </div>
      </div>
       
    )
}
export default HomePage