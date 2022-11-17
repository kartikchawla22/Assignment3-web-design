import { Checkbox } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { ToDoListItemType } from '../../utils/types';
import styles from './index.module.scss';


const ToDoListItem = ({ title, isCompleted = false }: ToDoListItemType) => {
    const [value, setValue] = useState<boolean>(isCompleted);
    return (
        <div className={styles.toDoListItemContainer}>
            <div className={styles.toDoListContent} >
                <Typography variant="h6" component="div" className={styles.heading}>
                    {title}
                </Typography>
                <Checkbox checked={value} onChange={(e) => setValue(Boolean(e.target.checked))} />
            </div>
        </div>
    )
}

export default ToDoListItem