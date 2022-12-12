import { FormsController } from "./FormsController.js";
import { TaskCreatorForm } from "./TaskCreatorForm";
import { TaskListView } from "./TaskListView";

export class DomController {
    taskData;
    pseudoEmitter;
    taskCreatorForm;
    taskListView;
    formsController;

    constructor(taskData, pseudoEmitter) {
        this.taskData = taskData;
        this.pseudoEmitter = pseudoEmitter;
        this.taskCreatorForm = new TaskCreatorForm(this.pseudoEmitter);
        this.taskListView = new TaskListView(this.taskData, this.pseudoEmitter);
        this.formsController = new FormsController(this.pseudoEmitter);
    }
}