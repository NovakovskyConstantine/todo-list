export class FormsController {
    formCreatorButton;
    uiCreatorForm;
    pseudoEmitter;
    state;

    constructor(pseudoEmitter) {
        this.pseudoEmitter = pseudoEmitter;
        this.uiCreatorForm = document.getElementById("ui-creator-form");
        this.formCreatorButton = document.getElementsByClassName("body-header__nav__button__deactive")[0];
        this.state = "hide";

        this.createEvents();
    }

    changeState() {
        this.uiCreatorForm.classList.remove([this.state]);
        this.state = this.state === "hide" ? "dark-bg" : "hide";
        this.uiCreatorForm.classList.add([this.state]);
    }

    createEvents() {
        this.formCreatorButton.addEventListener("click", () => {
            this.changeState();
        });
        this.uiCreatorForm.addEventListener("click", (event) => {
            if (event.target == this.uiCreatorForm) {
                this.changeState();
                this.pseudoEmitter.emit("clearForm");
            }
        })
        this.pseudoEmitter.on("createTask", this.changeState.bind(this));
    }
}