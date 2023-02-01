import { UIComponentPrototype } from "../ui.component.prototype";

export class TextComponent extends UIComponentPrototype {
    private _text: string;

    constructor(tag: "h1" | "h2" | "h3", text: string) {
        super();
        this.createHtml(tag);
        this._text = text;
        this.html.innerText = this._text;
    }
}