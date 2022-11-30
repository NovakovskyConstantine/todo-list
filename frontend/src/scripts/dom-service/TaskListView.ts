import { TaskUIComponent } from "../ui/task.ui.component";

export class TaskListView {
    taskData;
    private _tasks: Record<string, TaskUIComponent>;
    private _deleteFunctions: Record<string, Function>;
    container;
    pseudoEmitter;

    constructor(taskData, pseudoEmitter) {
        this._tasks = {};
        this._deleteFunctions = {};
        this.taskData = taskData;
        this.pseudoEmitter = pseudoEmitter;
        this.container = document.getElementsByClassName("table__body")[0];

        this.pseudoEmitter.on("changeDom", this.addAll.bind(this));
    }

    addAll() {
        this.clearAll();
        for (let id in this.taskData) {
            this._tasks[id] = new TaskUIComponent(this.taskData[id]);
            if (!this._deleteFunctions[id]) {
                this._deleteFunctions[id] = this._completeTask.bind(this, id);
                this._tasks[id].html.children[0].children[0].children[0].addEventListener("click", () => {
                    this._deleteFunctions[id]()
                });
            }
            this.container.appendChild(this._tasks[id].html);
        }
        console.log(this)
    }

    clearAll() {
        if (this.container.children.length) {
            for (let i = this.container.children.length - 1; i > -1; i--) {
                this.container.children[i].remove();
                
            }
            this._tasks = {};
        }
    }

    private _completeTask(id: string): void {
        delete this.taskData[id];
        delete this._tasks[id];
        
        this.addAll()
    }
}