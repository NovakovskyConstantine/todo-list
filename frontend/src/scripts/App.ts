import { DomService } from "./dom-service/DomService";
import { Emitter } from "./emitter-service/emitter.service";
import { SendService } from "./send-service/SendService.mjs";
import { UserService } from "./user-service/user.service";

import { MemoryService } from "./memory-service/memory.service";
import { TaskService } from "./task-service/task.service";

export class App {
    private _services: Record<string, any>; // ? edit Создать общий интерфейс для всех сервисов

    private _emitter: Emitter;
    private _memory: MemoryService;
    private _userService: UserService;

    private _taskService: TaskService;
    private _domService: DomService;
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

        this._emitter = new Emitter();
        this._userService = new UserService(this._emitter);
        this._memory = new MemoryService();

        this._taskService = new TaskService({emitter: this._emitter, userService: this._userService, memory: this._memory});
        this._domService = new DomService(this._taskService.tasksData, this._emitter);
        
        this._services = {
            emitter: this._emitter,
            userService: this._userService,
            memory: this._memory
        };
        
        this.sendService = new SendService(this._emitter, "http://127.0.0.1:8000");

        console.log(document.getElementsByClassName("body-header")[0].children)
    }
}