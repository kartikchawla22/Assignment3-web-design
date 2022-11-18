import { useState } from 'react';
import { Checkbox } from '@mui/material';
import Typography from '@mui/material/Typography';
import { ToDoListItemType } from '../../utils/types';
import styles from './index.module.scss';


const ToDoListItem = ({ taskID, title, isCompleted = false, onTaskChange = (value: boolean, taskID: number) => { } }: ToDoListItemType) => {
    // Setting and Getting the value of whether the task is completed or not. 
    const [value, setValue] = useState<boolean>(isCompleted);
    return (
        <div className={styles.toDoListItemContainer}>
            <div className={styles.toDoListContent} >
                <Typography variant="h6" component="div" className={styles.heading}>
                    {title}
                </Typography>
                <Checkbox checked={value} onChange={(e) => {
                    setValue(Boolean(e.target.checked))
                    onTaskChange(Boolean(e.target.checked), taskID)
                }} />
            </div>
        </div>
    )
}

export default ToDoListItem