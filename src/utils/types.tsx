
export type ToDoListItemType = {
    taskID: number;
    isCompleted?: boolean;
    title?: string;
    onTaskChange?: (key: boolean, id: number) => void;
}
export type UserCardTypes = {
    name: string;
    image: string;
    description: string;
}
export type InputControlType = {
    label: string;
    rest?: { [key: string]: any };
    onChange?: (e: any) => void;
    placeholder?: string
}
export type UserType = {
    email: string;
    name: string;
}