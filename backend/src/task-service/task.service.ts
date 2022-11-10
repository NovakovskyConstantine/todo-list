import { IParams } from "../auth-service/auth.interfaces";
import { AuthService } from "../auth-service/auth.service";
import { DBService } from "../db-service/db.service";
import { CommonService } from "../interfaces/common.service.interface";
import { IResponseData } from "../interfaces/router.service.interfaces";
import { createTask } from "./task.utils";

export class TaskService implements CommonService{
    private _dbService: DBService;
    private _authService: AuthService
    constructor(dbService: DBService, authService: AuthService) {
        this._dbService = dbService;
        this._authService = authService;
    }

    public useApi(route: string[], params: IParams): Promise<any> {
        return new Promise((resolve, reject) => {
            switch (route[1]) {
                case "create":
                    this._createTask(params)
                        .then(response => resolve(response));
                    break;
                case "delete":
                    break;
                case "finish":
                    break;
                case "getall":
                    this._getAll(params)
                        .then(response => resolve(response));
                    break;
                case "getone":
                    break;
                default:
                    console.error(`Отсутствует api: ${route}`);
                    break;
            }
        });
    }

    private async _createTask(params): Promise<any> {
        const responseData: IResponseData = {
            headers: {}
        }
        const checkedUser = await this._authService.useApi(["auth", "check"], params);
        console.log(params);
        console.log(checkedUser)

        if (checkedUser.headers.isVerifyUser) {
            createTask(this._dbService, params)
                .then(() => {
                    responseData.statusCode = 200;
                    responseData.statusMessage = "Task created";
                })
        } else {
            responseData.statusCode = 403;
            responseData.statusMessage = "Access denied";
        }
        return new Promise((resolve, reject) => {
            resolve(responseData);
        });
    }

    private async _getAll(params): Promise<any> {
        const responseData: IResponseData = {
            headers: {
                tasks: ""
            }
        }

        const checkedUser = await this._authService.useApi(["auth", "check"], params);
        return new Promise(resolve => {
            if (checkedUser.headers.isVerifyUser) {
                this._dbService.find("tasks", `userLogin = "${params.login}"`)
                    .then(tasks => {
                        console.log(tasks)
                        responseData.statusCode = 200;
                        responseData.statusMessage = "OK";
                        responseData.headers["tasks"] = tasks;
                        resolve(responseData);
                    })
            } else {
                responseData.statusCode = 403;
                responseData.statusMessage = "Access denied";
                resolve(responseData);
            }
        })
    }
}