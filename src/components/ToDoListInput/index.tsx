import { TextField } from "@mui/material"
import styles from "./index.module.scss";

const ToDoListInput = ({ onInputChange = (value: string) => { }, value = "" }) => {
    return (
        <div className={styles.inputContainer}>
            <TextField value={value} onChange={(e) => onInputChange(e.target.value)} id="outlined-basic" label="Add New Item" variant="outlined" />
        </div>
    )
}
export default ToDoListInput