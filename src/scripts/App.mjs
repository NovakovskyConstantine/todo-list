import { TaskList } from "./TaskList.mjs";
import { DomController } from "./DomController.mjs";
import { PseudoEmitter } from "./PseudoEmitter.js";

export class App {
    taskList;
    domController;
    pseudoEmitter;
    appConfig;
    appData;

    constructor() {
        this.init();
    }

    init() {
        this.appData = {
            tasks: {}
        };
        this.pseudoEmitter = new PseudoEmitter();
        this.taskList = new TaskList(this.appData.tasks, this.pseudoEmitter);
        this.domController = new DomController(this.appData.tasks, this.pseudoEmitter);
    }
}