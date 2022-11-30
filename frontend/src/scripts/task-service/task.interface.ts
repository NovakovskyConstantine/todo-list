export interface ITask {
    id: string;
    title: string;
    description: string;
    deadline: Date;
    status: TaskStatusDictionary
}

export enum TaskStatusDictionary {
    "open",
    "closed",
    "inwork"
}