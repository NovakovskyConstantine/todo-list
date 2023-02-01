import { Emitter } from "../../emitter-service/emitter.service";
import { UIComponentPrototype } from "../ui.component.prototype";
import { TaskUIComponent } from "./task.component";

export class TaskListTableView extends UIComponentPrototype {
    taskData;
    private _tasks: Record<string, TaskUIComponent>;
    private _deleteFunctions: Record<string, Function>;
    private _emitter: Emitter;

    constructor(taskData, emitter) {
        super();
        this.createHtml("div");
        this.addClasses(["tasklist__table"]);
        this._tasks = {};
        this._deleteFunctions = {};
        this.taskData = taskData;
        this._emitter = emitter;

        this._emitter.on("changeDom", this.addAll.bind(this));
    }

    addAll() {
        this.clearAll();
        for (let id in this.taskData) {
            this._tasks[id] = new TaskUIComponent(this.taskData[id]);
            console.log(this._tasks[id])
            if (!this._deleteFunctions[id]) {
                this._tasks[id].html.children[0].children[0].addEventListener("click", () => {
                    this._emitter.emit("deleteTask", id);
                });
            }
            this.html.appendChild(this._tasks[id].html);
        }
    }

    clearAll() {
        if (this.html.children.length) {
            for (let i = this.html.children.length - 1; i > -1; i--) {
                this.html.children[i].remove();
            }
            this._tasks = {};
        }
    }
}