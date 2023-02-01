import { UIComponentPrototype } from "../ui.component.prototype";
import "./button.component.css"

export class ButtonComponent extends UIComponentPrototype {
    constructor() {
        super();
        this.createHtml("button");
    }

    public addText(text: string): ButtonComponent {
        this.html.innerText = text;
        return this;
    }

    public addClasses(classes: string[]): ButtonComponent {
        super.addClasses(classes);
        return this;
    }
}