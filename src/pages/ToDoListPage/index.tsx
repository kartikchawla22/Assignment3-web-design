import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import ToDoListInput from '../../components/ToDoListInput';
import ToDoListItem from '../../components/ToDoListItem';
import { ToDoListItemType } from '../../utils/types';
import styles from './index.module.scss';

const tasklist = [
    {
        title: "this is 1",
        isCompleted: false
    },
    {
        title: "this is 2",
        isCompleted: true
    },
    {
        title: "this is 3",
        isCompleted: false
    },
    {
        title: "this is 4",
        isCompleted: true
    },
    {
        title: "this is 5",
        isCompleted: false
    },
]

const ToDoListPage = () => {
    const [tasks, setTasks] = useState<Array<ToDoListItemType>>([])
    const [taskInput, setTaskInput] = useState<string>("")
    const addTask = () => {
        const newTask: ToDoListItemType = { title: taskInput, isCompleted: false }
        setTasks([...tasks, newTask])
        setTaskInput("")
    }
    return (
        <div>
            <Typography variant="h6" noWrap component="div" className={styles.heading}>
                This is To Do List
            </Typography>
            <div className={styles.toDoListContainer}>
                <div className={styles.toDoListContent} >
                    <div className={styles.addTaskBox}>
                        <ToDoListInput value={taskInput} onInputChange={setTaskInput} />
                        <Button variant="contained" onClick={addTask}>Add</Button>
                    </div>
                    {tasks.map((task: ToDoListItemType, index: number) => {
                        return (
                            <ToDoListItem key={index} title={task.title} isCompleted={task.isCompleted} />
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
export default ToDoListPage