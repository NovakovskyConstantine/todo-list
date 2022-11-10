import { CommonService } from "../interfaces/common.service.interface";
import { IResponseData } from "../interfaces/router.service.interfaces";
import { UsersService } from "../users-service/users.service";
import { IParams, ILoggedUser } from "./auth.interfaces";
import { findUser, signJWT, userAutorization } from "./auth.utils";

export class AuthService implements CommonService {
    private _apiName: string = "auth";
    private _userService: UsersService;
    private _loggedUsers: Record<string, ILoggedUser>;

    constructor(userService) {
        this._userService = userService;
        this._loggedUsers = {};
    }

    public useApi(route: string[], params: IParams): Promise<any> {
        return new Promise((resolve, reject) => {
            switch (route[1]) {
                case "register":
                    this._registerUser(params)
                        .then((res) => resolve(res));
                    break;
                case "login":
                    this._loginUser(params)
                        .then((res) => resolve(res));
                    break;
                case "logout":
                    this._logoutUser(params)
                        .then((res) => resolve(res));
                    break;
                case "delete":
                    this._deleteUser(params)
                        .then(res => resolve(res))
                        .catch(rej => reject(rej));
                    break;
                case "check":
                    this._checkAccess(params)
                        .then(res => resolve(res))
                        .catch(res => reject(res));
                    break;
                default:
                    console.error(`Отсутствует api: ${route}`);
                    break;
            }
        })
    }

    private async _registerUser(params: IParams): Promise<any> {
        const responseData: IResponseData = {
            statusCode: 200
        };
        let user;
        await findUser(this._userService, params).then(res => user = res);

        if (user) {
            console.error(`Уже существует пользователь с логином ${params.login}`);
            responseData.statusMessage = `User already exists`;
        } else {
            console.log(params)
            this._userService.createUser(params)
                .then(() => {
                    console.log(`Создан пользователь ${params.login}`);
                    responseData.statusMessage = `User created`;
                });
        }
        return new Promise(resolve => {
            return resolve(responseData); 
        });
    }

    private _checkLoggedUser(userName: string): boolean {
        if (!this._loggedUsers[userName]) {
            return false;
        } else {
            return true;
        }
    }

    private async _loginUser(params: IParams): Promise<any> {
        const responseData: IResponseData = {
            headers: {}
        };

        let user
        await userAutorization(this._userService, params)
            .then(res => user = res)
            .catch(res => {
                responseData.statusCode = res.statusCode;
                responseData.statusMessage = res.statusMessage;
            });
        
        return new Promise((resolve) => {
            if (user) {
                responseData.statusCode = 200;
                    if (this._checkLoggedUser(user.login)) {
                        console.log("Пользователь уже зарегистрирован");
                        responseData.headers["token"] = this._loggedUsers[user.login].token;
                        resolve(responseData);
                    } else {
                        signJWT(user.login, "myapp")
                            .then(token => {
                                responseData.headers["token"] = token;
                                this._loggedUsers[user.login] = {
                                    token: token,
                                    rights: user.rights
                                }
                                resolve(responseData);
                            });
                    }
            } else {
                resolve(responseData);
            }
        });
    }

    private async _logoutUser(params: IParams): Promise<IResponseData> {
        const responseData: IResponseData = { headers: {} };

        if (this._loggedUsers[params.login].token === params.token) {
            delete this._loggedUsers[params.login];
            responseData.statusCode = 200;
            responseData.statusMessage = "User is logout";
        } else {
            responseData.statusCode = 403;
            responseData.statusMessage = "Bad token";
        }

        return new Promise((resolve, reject) => {
            return resolve(responseData);
        })
    }

    private async _deleteUser(params: IParams): Promise<any> {
        const responseData: IResponseData = {
            headers: {}
        };
        return new Promise((resolve, reject) => {
        this._checkAccess(params)
            .then(res => {
                if (res.statusCode === 200) {
                    responseData.statusCode = 200;
                    responseData.statusMessage = "User deleted";
                    this._userService.deleteUser(params);
                    resolve(responseData);
                } else {
                    responseData.statusCode = 403;
                    responseData.statusMessage = "Access denied";
                    resolve(responseData);
                }
            });
        })
    }

    private async _checkAccess(params): Promise<any> {
        const responseData: IResponseData = {
            headers: {}
        };

        const user = this._loggedUsers[params.login];
        
        if (user && params.token && user.token === params.token) {
            responseData.statusCode = 200;
            responseData.statusMessage = "OK";
            responseData.headers.isVerifyUser = true;
        } else {
            responseData.statusCode = 403;
            responseData.statusMessage = "Access denied";
            responseData.headers.isVerifyUser = false;
        }

        return new Promise((resolve, reject) => {
            resolve(responseData);
        });
    }
}