import { TaskCreatorForm } from "./TaskCreatorForm.mjs";
import { TaskListView } from "./TaskListView.js";

export class DomController {
    taskData;
    pseudoEmitter;
    taskCreatorForm;
    taskListView;

    constructor(taskData, pseudoEmitter) {
        this.taskData = taskData;
        this.pseudoEmitter = pseudoEmitter;
        this.taskCreatorForm = new TaskCreatorForm(this.pseudoEmitter);
        this.taskListView = new TaskListView(this.taskData, this.pseudoEmitter);
    }
}