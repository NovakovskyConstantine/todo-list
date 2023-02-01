import { Emitter } from "../../emitter-service/emitter.service";
import { UIComponentPrototype } from "../ui.component.prototype";
import { TaskListHeaderView } from "./tasklist-header.component";
import { TaskListTableView } from "./tasklist-table.component";

export class TaskListView extends UIComponentPrototype {
    private _taskData: any;
    private _emitter: Emitter;
    private _header: TaskListHeaderView;
    private _table: TaskListTableView;

    constructor(taskData: any, emitter: Emitter) {
        super();

        this._taskData = taskData;
        this._emitter = emitter;

        this.createHtml("div");
        this.addClasses(["tasklist"]);

        this._createComponents();
    }

    private _createComponents(): void {
        this._header = new TaskListHeaderView(this._emitter);
        this._table = new TaskListTableView(this._taskData, this._emitter);

        this.addChild(this._header.html);
        this.addChild(this._table.html);
    }
}