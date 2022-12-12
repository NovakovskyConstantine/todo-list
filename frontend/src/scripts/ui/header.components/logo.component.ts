import { UIComponentPrototype } from "../ui.component.prototype";

export class LogoComponent extends UIComponentPrototype {
    constructor() {
        super();
        this.createHtml("img");
    }
}