import styles from "./index.module.scss";

const UserProfilePage = () => {
    return (
        <div className={styles.userProfileContianer}>
            <div className={styles.userProfileContent}>
                <div className={styles.userData}>
                    <span>Name:</span>
                    <span>Kartik</span>
                </div>
                <div className={styles.userData}>
                    <span>Email:</span>
                    <span>Kartik</span>
                </div>
            </div>
        </div>
    )
}
export default UserProfilePage