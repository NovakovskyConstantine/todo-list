import { Emitter } from "../emitter-service/emitter.service";
import { TaskUIComponent } from "../ui/task.ui.component";

export class TaskListView {
    taskData;
    private _tasks: Record<string, TaskUIComponent>;
    private _deleteFunctions: Record<string, Function>;
    container;
    private _emitter: Emitter;

    constructor(taskData, pseudoEmitter) {
        this._tasks = {};
        this._deleteFunctions = {};
        this.taskData = taskData;
        this._emitter = pseudoEmitter;
        this.container = document.getElementsByClassName("table__body")[0];

        this._emitter.on("changeDom", this.addAll.bind(this));
    }

    addAll() {
        this.clearAll();
        for (let id in this.taskData) {
            this._tasks[id] = new TaskUIComponent(this.taskData[id]);
            if (!this._deleteFunctions[id]) {
                this._tasks[id].html.children[0].children[0].children[0].addEventListener("click", () => {
                    this._emitter.emit("deleteTask", id);
                });
            }
            this.container.appendChild(this._tasks[id].html);
        }
    }

    clearAll() {
        if (this.container.children.length) {
            for (let i = this.container.children.length - 1; i > -1; i--) {
                this.container.children[i].remove();
                
            }
            this._tasks = {};
        }
    }
}