import { ITask } from "../task-service/task.interface";

export class Task implements ITask {
    id;
    title;
    description;
    deadline;
    status;

    constructor(taskData) {
        this.id = taskData.id;
        this.title = taskData.title;
        this.description = taskData.description;
        this.deadline = taskData.deadline;
    }
}