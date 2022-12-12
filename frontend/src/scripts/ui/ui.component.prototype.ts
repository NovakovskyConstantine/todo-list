export class UIComponentPrototype {
    private _html: HTMLElement;
    private _classList: string[];

    constructor() {
        this._classList = [];
    }

    protected createHtml(htmlTag: keyof HTMLElementTagNameMap): void {
        this._html = document.createElement(htmlTag);
    }

    protected addClasses(classes: string[]): void {
        classes.forEach(className => {
            this._html.classList.add(className);
        });
    }

    public get html(): HTMLElement {
        return this._html;
    }

    public get classList(): string[] {
        return this._classList;
    }
}