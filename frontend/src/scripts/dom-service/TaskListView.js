export class TaskListView {
    taskData;
    tasks;
    container;
    pseudoEmitter;

    constructor(taskData, pseudoEmitter) {
        this.taskData = taskData;
        this.pseudoEmitter = pseudoEmitter;
        this.container = document.getElementsByClassName("table__body")[0];

        this.pseudoEmitter.on("changeDom", this.addAll.bind(this));
    }

    addAll() {
        this.clearAll();
        for (let task in this.taskData) {
            const taskEl = document.createElement("div");
            const title = `<div><p>${this.taskData[task].title}</p></div>`;
            const description = `<div><p>${this.taskData[task].description}</p></div>`;
            const deadline = `<div><p>${this.taskData[task].deadline}</p></div>`;
            taskEl.innerHTML = `<div></div>${title}${description}${deadline}`;
            // const title = document.createElement("div");
            // const description = document.createElement("div");
            // const deadline = document.createElement("div");
            // title.innerText = this.taskData[task].title;
            // description.innerText = this.taskData[task].description;
            // deadline.innerText = this.taskData[task].deadline;
            // taskEl.appendChild(document.createElement("div"))
            // taskEl.appendChild(title);
            // taskEl.appendChild(description);
            // taskEl.appendChild(deadline);
            taskEl.classList.add("task");
            this.container.appendChild(taskEl);
        }
    }

    clearAll() {
        if (this.container.children.length) {
            for (let i = this.container.children.length - 1; i > -1; i--) {
                this.container.children[i].remove();
            }
        }
    }
}