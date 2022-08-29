export class TaskCreatorForm {
    title;
    description;
    deadline;
    submitButton;
    pseudoEmitter;

    constructor(pseudoEmitter) {
        this.pseudoEmitter = pseudoEmitter;
        this.title = document.getElementsByClassName("creator-form__title")[0];
        this.description = document.getElementsByClassName("creator-form__description")[0];
        this.deadline = document.getElementsByClassName("creator-form__deadline")[0];
        this.submitButton = document.getElementsByClassName("creator-form__submit-button")[0];

        this.submitButton.addEventListener("click", () => {
            if (this.checkData()) {
                this.pseudoEmitter.emit("createTask", this.createTaskData());
                this.clearCreatorForm();
            }
        });
    }

    checkData () {
        if (this.title.value && this.description.value && this.deadline.value) {
            return true;
        }
        return false;
    }

    createTaskData() {
        return {
            title: this.title.value,
            description: this.description.value,
            deadline: this.deadline.value
        }
    }

    clearCreatorForm() {
        this.title.value = "";
        this.description.value = "";
        this.deadline.value = null;
    }
}