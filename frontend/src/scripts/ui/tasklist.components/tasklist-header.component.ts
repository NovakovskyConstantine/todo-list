import { Emitter } from "../../emitter-service/emitter.service";
import { ButtonComponent } from "../common.components/button.component";
import { UIComponentPrototype } from "../ui.component.prototype";

export class TaskListHeaderView extends UIComponentPrototype {
    private _emitter: Emitter;
    private _createTaskButton: ButtonComponent;
    private _filtersButton: ButtonComponent;
    
    constructor(emitter: Emitter) {
        super();
        this._emitter = emitter;

        this.createHtml("div");
        this._createTaskButton = new ButtonComponent().addText("Создать задачу").addClasses(["button", "button__create-task"]);
        this._filtersButton = new ButtonComponent().addText("Фильтры").addClasses(["button"]);
        this.addClasses(["tasklist__header"]);

        this.addChild(this._createTaskButton.html);
        this.addChild(this._filtersButton.html);

        this._createEvents();
    }

    private _createEvents(): void {
        this._createTaskButton.html.addEventListener("click", () => {
            this._emitter.emit("forms-controller-change-state");
        })
    }
}