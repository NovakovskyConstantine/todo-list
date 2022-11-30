import { ITask } from "../task-service/task.interface";

export class TaskUIComponent {
    private _id: string;
    private _title: string;
    private _description: string;
    private _deadline: Date;
    private _html: HTMLElement;

    constructor(task: ITask) {
        this._id = task.id;
        this._title = task.title;
        this._description = task.description;
        this._deadline = task.deadline;
        this._html = document.createElement("div");
        this._html.classList.add("task");
        this._html.classList.add(this._id);
        this._init();
    }

    private _init(): void {
        this._addChild("task__checkbox", `<input type="checkbox">`);
        this._addChild("task__title", this._title);
        this._addChild("task__description", this._description);
        this._addChild("task__deadline", this._deadline);
    }

    private _addChild(className: string, data: string | Date) {
        const child = document.createElement("div");
        child.classList.add(className);
        child.innerHTML = `<p>${data}</p>`;
        this._html.appendChild(child);
    }

    public get html(): HTMLElement {
        return this._html;
    }
}