export class UIComponentPrototype {
    private _html: HTMLElement;
    private _childrens: HTMLElement[];
    private _classList: string[];

    constructor() {
        this._classList = [];
        this._childrens = [];
    }

    protected createHtml(htmlTag: keyof HTMLElementTagNameMap): UIComponentPrototype {
        this._html = document.createElement(htmlTag);
        return this;
    }

    protected addClasses(classes: string[]): UIComponentPrototype {
        classes.forEach(className => {
            this._html.classList.add(className);
        });
        return this;
    }

    protected addChild(child: HTMLElement): UIComponentPrototype {
        this._childrens.push(child);
        this._html.appendChild(child);
        return this;
    }

    public get html(): HTMLElement {
        return this._html;
    }

    public get classList(): string[] {
        return this._classList;
    }
}