import styles from "./index.module.scss";
import * as firebaseConfig from "../../firebase"

const UserProfilePage = () => {
    const user = firebaseConfig.auth.currentUser
    return user ? (
        <div className={styles.userProfileContianer}>
            <div className={styles.card}>
                <h1>{user.displayName}</h1>
                <p className={styles.title}>{user.email}</p>
            </div>
        </div>
    ) : <></>
}
export default UserProfilePage