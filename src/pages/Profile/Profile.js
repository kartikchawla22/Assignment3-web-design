import styles from "./Profile.module.css";
import profile1 from '../../Assets/users.jpg';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function Profile() {

  return (
    <div className={styles.container}>
      <div className={styles.innerBox}>
        <h1 className={styles.heading}>Get Current User Details </h1>
        <Card style={{ width: '18rem' }}>
      <Card.Img className={styles.Cardimage} variant="top" src={profile1} />
      <Card.Body>
        <Card.Text >
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
      </Card.Body>
    </Card>
       
        <div className={styles.footer}>
          <button>
            Signup
          </button>
        </div>
      </div>
      <div className={styles.innerBox}>
        <h1 className={styles.heading}>Get Current User Details </h1>
        <Card style={{ width: '18rem' }}>
      <Card.Img className={styles.Cardimage} variant="top" src={profile1} />
      <Card.Body>
        <Card.Text >
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
      </Card.Body>
    </Card>
       
        <div className={styles.footer}>
          <button>
            Signup
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
