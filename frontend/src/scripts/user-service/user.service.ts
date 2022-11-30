export class UserService {
    _pseudoEmitter;
    private _isAuthorized: boolean;
    
    constructor(pseudoEmitter) {
        this._pseudoEmitter = pseudoEmitter;
        this._isAuthorized = false;

        this._pseudoEmitter.on("auth/login", this._login.bind(this));
    }

    _login(data) {
        this._pseudoEmitter.emit("sendPost", ["/auth/login", data]);
    }

    public get isAuthorized(): boolean {
        return this._isAuthorized;
    }
}