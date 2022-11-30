import { Emitter } from "../emitter-service/emitter.service";
import { MemoryService } from "../memory-service/memory.service";
import { Task } from "../task-model/Task";
import { UserService } from "../user-service/user.service";
import { ITask } from "./task.interface";

export class TaskService {
    private _emitter: Emitter;
    private _userService: UserService;
    private _memory: MemoryService;
    private _tasksData: {};

    constructor(options: {emitter: Emitter, userService: UserService, memory: MemoryService}) {
        this._userService = options.userService;
        this._memory = options.memory;
        this._emitter = options.emitter;
        
        this._emitter.on("createTask", this.addTask.bind(this));
        this._emitter.on("deleteTask", this.deleteTask.bind(this));
        this._tasksData = {};
    }

    public startService(): void {
        if (this._userService.isAuthorized) {

        } else {
            if (this._memory.localStorage.getItem("tasksData")) {
                this.loadTasks();
            } else {
                this._memory.localStorage.setItem("tasksData", JSON.stringify(this._tasksData));
            }
        }
    }

    public addTask(task: ITask): void {
        if (this._userService.isAuthorized) {

        } else {
            this.tasksData[task.id] = new Task(task);
            this._memory.localStorage.setItem("tasksData", JSON.stringify(this._tasksData));
        }
        this._emitter.emit("changeDom");
    }

    public deleteTask(id: string): void {
        delete this._tasksData[id];
        this._memory.localStorage.setItem("tasksData", JSON.stringify(this._tasksData));
        this._emitter.emit("changeDom");
    }

    public changeStatus(task: ITask, newStatus): void {

    }

    public loadTasks(): void {
        const data = JSON.parse(this._memory.localStorage.getItem("tasksData"));
        for (let id in data) {
            this._tasksData[id] = data[id];
        }
        this._emitter.emit("changeDom");
    }

    public get tasksData(): any {
        return this._tasksData;
    }
}