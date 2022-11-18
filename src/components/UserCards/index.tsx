import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import styles from "./index.module.scss";
import { UserCardTypes } from '../../utils/types';

const UserCards = ({ name, image, description }: UserCardTypes) => {

  return (
    <div className={styles.container}>
      <div className={styles.innerBox}>
        <Card style={{ width: '100%' }}>
          <Card.Header><h1 className={styles.heading}>{name}</h1></Card.Header>
          <Card.Img className={styles.Cardimage} variant="top" src={image} />
          <Card.Body>
            <Card.Text >
              {description}
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

export default UserCards;
