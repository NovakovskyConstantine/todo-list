import "./task.ui.component.style.css";

import { ITask } from "../../task-service/task.interface";
import { UIComponentPrototype } from "../ui.component.prototype";

export class TaskUIComponent extends UIComponentPrototype {
    private _id: string;
    private _title: string;
    private _description: string;
    private _deadline: Date;

    constructor(task: ITask) {
        super();
        this._id = task.id;
        this._title = task.title;
        this._description = task.description;
        this._deadline = task.deadline;
        this.createHtml("div");
        this.addClasses(["task", this._id]);
        this._init();
    }

    private _init(): void {
        this._addCheckbox("task__checkbox");
        this._addText("task__title", this._title);
        this._addText("task__deadline", this._deadline);
    }

    private _addText(className: string, data: string | Date) {
        const child = document.createElement("div");
        child.classList.add(className);
        child.innerHTML = `<p>${data}</p>`;
        this.html.appendChild(child);
    }

    private _addCheckbox(className: string): void {
        const checkbox = document.createElement("input");
        const child = document.createElement("div");
        checkbox.setAttribute("type", "checkbox");
        child.classList.add(className);
        child.appendChild(checkbox);
        this.html.appendChild(child);
    }
}