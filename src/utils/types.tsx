
export type ToDoListItemType = {
    taskID: number;
    isCompleted?: boolean;
    title?: string;
    onTaskChange?: (key: boolean, id: number) => void;
}