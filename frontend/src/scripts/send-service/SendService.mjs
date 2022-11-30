export class SendService {
    url;
    pseudoEmitter;

    constructor(pseudoEmitter, url) {
        this.pseudoEmitter = pseudoEmitter;
        this.url = url;

        this.createEvents();
    }

    sendPost(url, data) {
        // data = JSON.stringify(data);
        // let postXhr = new XMLHttpRequest();
        // postXhr.open("POST", this.url + url);
        // postXhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        // // postXhr.setRequestHeader("Access-Control-Allow-Origin", "*");
        // console.log(data)
        // postXhr.send(data);

        fetch(this.url + url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                "Access-Control-Allow-Origin": "*"
            },
            cache: "no-cache",
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(result => console.log(result.message))
    }

    createEvents() {
        this.pseudoEmitter.on("sendPost", this.sendPost.bind(this));
    }
}