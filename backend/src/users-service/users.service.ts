import { DBService } from "../db-service/db.service";
import { CommonService } from "../interfaces/common.service.interface";

export class UsersService {
    private _apiName: string = "users";
    private _dbService: DBService;
    private _lastUserId: string;
    private _connectedUsers: Record<string, string>

    constructor(dbService: DBService) {
        this._dbService = dbService;
    }

    public useApi(route: string[], params: any): any {
        switch (route[1]) {
            case "create":
                this.createUser(params);
                break;
            case "autorization":
                this._userAutorization(params);
                break;
            default:
                console.error(`Отсутствует api: /users/${route}`);
                break;
        }
    }

    public async createUser(params): Promise<any> {
        const fields = "login, password";
        const values = [params.login, params.password];
        const newUser = await this._dbService.add("users", fields, values);
        return new Promise((resolve, reject) => {
            if (newUser) {
                return resolve(newUser);
            } else {
                return reject(`При попытке создать пользователя ${values[0]} произошла ошибка.`);
            }
        });
    }

    private async _userAutorization(params: any): Promise<any> {
        const [ user ] = await this._dbService.find("users", `login="${params.login}"`);
        return new Promise((resolve, reject) => {
            if (!user) {
                return reject("User not found");
            }
            else if (user && params.password === user.password) {
                console.log("user", user);
                return resolve(user);
            } else if (params.password !== user.password) {
                return reject("Bad password");
            }
        })
    }

    /** Поиск пользователя в таблице time_manager.users. Возвращает пользователя или undefined */
    public async findUser(params: any): Promise<any> {
        const [ user ] = await this._dbService.find("users", `login="${params.login}"`);
        return new Promise((resolve, reject) => {
            if (user) {
                return resolve(user);
            } else {
                return reject(undefined);
            }
        });
    }

    public async deleteUser(params: any): Promise<any> {
        const [ user ] = await this._dbService.find("users", `login="${params.login}"`);
        let data;
        if (user) {
            data = await this._dbService.change("users", "isDeleted=true", `login="${params.login}"`);
        }

        return new Promise(resolve => {
            resolve(data)
        })
    }
}