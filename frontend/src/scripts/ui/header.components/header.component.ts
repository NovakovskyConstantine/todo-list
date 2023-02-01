import "./left-menu.style.css";

import { UIComponentPrototype } from "../ui.component.prototype";
import { LogoComponent } from "./logo.component";
import { TextComponent } from "./text.prototype";

export class HeaderComponet extends UIComponentPrototype {
    private _logo: LogoComponent;
    private _textCompany: TextComponent;

    constructor() {
        super();
        this.createHtml("header");
        this.addClasses(["left-menu"]);

        this._textCompany = new TextComponent("h1", "Менеджер задач");
        this.addChild(this._textCompany.html);
    }
}