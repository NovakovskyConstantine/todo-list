import { Emitter } from "../emitter-service/emitter.service";

export class UserService {
    private _emitter: Emitter;
    private _isAuthorized: boolean;
    
    constructor(pseudoEmitter) {
        this._emitter = pseudoEmitter;
        this._isAuthorized = false;

        this._emitter.on("auth/login", this._login.bind(this));
        console.log("Запущен UserService");
    }

    private _login(data) {
        this._emitter.emit("sendPost", ["/auth/login", data]);
    }

    public get isAuthorized(): boolean {
        return this._isAuthorized;
    }
}