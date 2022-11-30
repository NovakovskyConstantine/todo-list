import { ITask } from "../task-service/task.interface";

export class MemoryService {
    private _localStorage: Storage;
    private _sessionStorage: Storage;
    private _tasks: Record<string, ITask>;
    
    constructor() {
        this._localStorage = window.localStorage;
        this._sessionStorage = window.sessionStorage;
    }

    public get localStorage(): Storage {
        return this._localStorage;
    }
}