import { UIComponentPrototype } from "../ui.component.prototype";

let logo = require("./../../../assets/images/logo.png");

export class LogoComponent extends UIComponentPrototype {
    constructor() {
        super();
        this.createHtml("img");
        
        this.html.setAttribute("src", logo);
    }
}