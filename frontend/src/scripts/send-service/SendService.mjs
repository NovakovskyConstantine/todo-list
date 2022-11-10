export class SendService {
    url;
    pseudoEmitter;

    constructor(pseudoEmitter, url) {
        this.pseudoEmitter = pseudoEmitter;
        this.url = url;

        this.createEvents();
    }

    sendPost(data) {
        data = JSON.stringify(data);
        let postXhr = new XMLHttpRequest();
        postXhr.open("POST", this.url + "/addTask");
        // postXhr.setRequestHeader("Access-Control-Allow-Origin", "*");
        postXhr.send(data);
    }

    createEvents() {
        this.pseudoEmitter.on("createTask", this.sendPost.bind(this));
    }
}