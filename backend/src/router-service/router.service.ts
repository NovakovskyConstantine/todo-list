import { IResponseData } from "../interfaces/router.service.interfaces";

export class RouterService {
    private _services;

    constructor(services) {
        this._services = services;
    }

    public processTheRequest(request, response): void {
        const url: string[] = request.url.slice(1).split("/");
        let data: string = "";
        request.on("data", chunk => {
            data += chunk;
            const newData: JSON = JSON.parse(data);
            console.log("newData", newData)
            this._services[url[0]].useApi(url, newData)
                .then((resolve: IResponseData) => this._sendResponse(response, resolve))
        });
    }

    private _sendResponse(response, data: IResponseData): void {
        if (data.statusCode) {
            response.statusCode = data.statusCode;
        }
        if (data.statusMessage) {
            response.statusMessage = data.statusMessage;
        }
        if (data.headers) {
            for (let name in data.headers){
                response.setHeader(name, data.headers[name]);
            }
        }
        response.end();
    }
}