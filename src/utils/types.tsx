// This file is used to store all the user defined dataTypes.

// This is the dataType for a to do list task.
export type ToDoListItemType = {
    taskID: number;
    isCompleted?: boolean;
    title?: string;
    onTaskChange?: (key: boolean, id: number) => void;
}

// This is the dataType for a user details to be shown in cards.
export type UserCardTypes = {
    name: string;
    image: string;
    description: string;
}

// This is the dataType for a user details to be shown in table.
export type UserType = {
    email: string;
    name: string;
}