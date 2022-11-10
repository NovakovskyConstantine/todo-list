import { TaskList } from "./task-model/TaskList.mjs";
import { DomController } from "./dom-service/DomController.mjs";
import { PseudoEmitter } from "./PseudoEmitter.js";
import { SendService } from "./send-service/SendService.mjs";

export class App {
    taskList;
    domController;
    pseudoEmitter;
    appConfig;
    appData;
    sendService;

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
        this.sendService = new SendService(this.pseudoEmitter, "http://127.0.0.1:8000");
    }
}