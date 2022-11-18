import { useEffect, useState } from "react";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import * as firebaseConfig from '../../firebase'
import { UserType } from "../../utils/types";
import styles from './index.module.scss';
import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";


const UserListPage = () => {
    console.log('here');

    const db = getFirestore(firebaseConfig.app);
    const [users, setUsers] = useState<Array<UserType>>([])

    useEffect(() => {
        const getUsers = async () => {
            let data: Array<UserType> = []
            const querySnapshot = await getDocs(collection(db, "Users"));
            querySnapshot.forEach((doc) => {
                data.push(doc.data() as UserType)
                setUsers(data)
            });
        }
        getUsers()
    }, [])
    return users && users.length > 0 ? (

        <div className={styles.userListContainer}>
            <div className={styles.userListContent}>
                <List>
                    <ListItem key={"heading"}>
                        <ListItemText primary={"Name"} />
                        <ListItemText primary={"Email"} />
                    </ListItem>
                </List>
                <List>
                    {users.map((user, index) => {
                        return (
                            <ListItem key={index}>
                                <ListItemText primary={user.name} />
                                <ListItemText primary={user.email} />
                            </ListItem>
                        )
                    })}
                </List>
            </div>
        </div>


    ) : (<></>)
}
export default UserListPage