import UserCards from '../../components/UserCards';
import styles from './index.module.scss';
import kartik from '../../Assets/kartik.jpg';
import himanshu from '../../Assets/himanshu.jpeg';

// Constant used for storing the data of creators of this applicaiton.
const users = [
  {
    name: "Kartik Chawla",
    description: "Meticulous Software Engineer with 6 years of experience designing, testing, and developing software solutions. In depth understanding of web technologies with focus on delivering innovative business solutions. Excels in fast-paced, high-energy, and deadline-driven environment with willingness to take on additional tasks.",
    image: kartik
  },
  {
    name: "Himanshu",
    description: "An experienced Salesforce enthusiast having 3+ years of experience working as a Salesforce developer for US-Based Client 'Eli-Lilly' and Company.",
    image: himanshu
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