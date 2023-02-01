import { Emitter } from "../emitter-service/emitter.service";
import { HeaderComponet } from "../ui/header.components/header.component";
import { FormsController } from "./FormsController.js";
import { TaskCreatorForm } from "./TaskCreatorForm";
import { TaskListView } from "../ui/tasklist.components/tasklist.component";

const bodyBg = require("./../../assets/images/bg.png")

export class DomService {
    taskData;
    private _emitter: Emitter;
    private _body: HTMLElement;
    private _header: HeaderComponet;
    taskCreatorForm;
    private _taskListView: TaskListView;
    formsController;

    constructor(taskData, emitter: Emitter) {
        this.taskData = taskData;
        this._emitter = emitter;
        this._body = document.getElementsByTagName("body")[0];
        this._body.setAttribute("background", bodyBg);
        this._header = new HeaderComponet();
        this.taskCreatorForm = new TaskCreatorForm(this._emitter);
        this._taskListView = new TaskListView(this.taskData, this._emitter);
        this.formsController = new FormsController(this._emitter);
        this._addComponents();
        this._emitter.emit("domReady");
    }

    private _addComponents(): void {
        this._body.appendChild(this._header.html);
        this._body.appendChild(this._taskListView.html);
    }
}