import { Task } from "./Task.mjs";

export class TaskList {
    tasks;
    pseudoEmitter;

    constructor(tasks, pseudoEmitter) {
        this.tasks = tasks;
        this.pseudoEmitter = pseudoEmitter;
        this.pseudoEmitter.on("createTask", this.add.bind(this));
    }

    add(task) {
        const taskData = {
            id: task.id,
            title: task.title,
            description: task.description,
            deadline: task.deadline
        }
        this.tasks[taskData.id] = new Task(taskData);
        this.pseudoEmitter.emit("changeDom");
    }
}