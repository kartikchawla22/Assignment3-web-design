import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import ToDoListInput from '../../components/ToDoListInput';
import ToDoListItem from '../../components/ToDoListItem';
import { ToDoListItemType } from '../../utils/types';
import styles from './index.module.scss';

const ToDoListPage = () => {
    // Setting the Getting the tasks of type ToDoListItemType.
    const [tasks, setTasks] = useState<Array<ToDoListItemType>>([])
    // Setting / getting the text that user inputs in the input field.
    const [taskInput, setTaskInput] = useState<string>("")

    // This function adds a new task to the list. By default task is marked as incomplete.
    const addTask = () => {
        const newTask: ToDoListItemType = { title: taskInput, isCompleted: false, taskID: tasks ? tasks.length : 0 }
        setTasks(tasks && tasks.length > 0 ? [...tasks, newTask] : [newTask])
        setTaskInput("")
    }
    // This hook is fired everytime tasks are updated.
    // We are saving the tasks Array in localstorage.
    useEffect(() => {
        if (tasks && tasks.length > 0) {
            localStorage.setItem("tasks", JSON.stringify(tasks))
        }

    }, [tasks])

    // This hook is fired everytime this page loads.
    // We check if we have previously stored tasks in localstorage.
    useEffect(() => {
        const savedTasks: Array<ToDoListItemType> = JSON.parse(localStorage.getItem("tasks") as any)
        setTasks(savedTasks)
    }, [])

    // This is called everytime task is marked as complete / incomplete by the user.
    const onTaskChange = (isCompleted: boolean, taskID: number) => {
        const changedTask = tasks.map((task, index) => {
            return task.taskID === taskID ? { ...task, isCompleted: isCompleted } : task
        })
        setTasks(changedTask)
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
                    {tasks?.map((task: ToDoListItemType, index: number) => {
                        return (
                            <ToDoListItem taskID={index} key={index} title={task.title} isCompleted={task.isCompleted} onTaskChange={onTaskChange} />
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
export default ToDoListPage