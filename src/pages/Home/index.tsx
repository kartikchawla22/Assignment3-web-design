import * as React from 'react';
import AppBarHeader from '../../components/AppBar';
import UserCards from '../../components/UserCards';
import Typography from '@mui/material/Typography';
import styles from './index.module.scss'
import profile1 from '../../Assets/users.jpg';

const users = [
  {
    name: "Kartik Chawla",
    description: "Software Developer",
    image: profile1
  },
  {
    name: "Kartik Chawla",
    description: "Software Developer",
    image: profile1
  }
]

const HomePage = () => {
  return (

    <div className={styles.homePageContainer}>
      {users.map((user, index) => {
        return <UserCards key={index} name={user.name} image={user.image} description={user.description} />
      })}
    </div>

  )
}
export default HomePage