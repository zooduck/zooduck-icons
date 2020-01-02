const tagName = 'zooduck-icon-base';
export class HTMLZooduckIconBaseElement extends HTMLElement {
    private _content: HTMLElement;
    private _backgroundColor = '#fff';
    private _baseStyle: string;
    private _color = '#222';
    private _defaultBackgroundColor: string;
    private _defaultColor: string;
    private _defaultSize: string;
    private _size = '50';
    private _styleContent: string;
    private _stylesheet: HTMLStyleElement;
    private _vars: string;

    constructor() {
        super();

        this._defaultBackgroundColor = this._backgroundColor;
        this._defaultColor = this._color;
        this._defaultSize = this._size;

        this.attachShadow({ mode: 'open' });

        this._stylesheet = document.createElement('style');
    }

    static get observedAttributes() {
        return [
            'backgroundcolor',
            'color',
            'size',
        ];
    }

    private _setBaseStyle() {
        this._baseStyle = `
            * {
                box-sizing: border-box !important;
            }
        `;
    }

    private _setVars() {
        this._vars = `
            :host {
                --zooduck-icon-background-color: ${this._backgroundColor};
                --zooduck-icon-color: ${this._color};
                --zooduck-icon-size: ${this._size}px;
                box-sizing: border-box;
            }

            * {
                box-sizing: border-box !important;
            }
        `;
    }

    private _syncAttr(name: string, val: string) {
        this.setAttribute(name, val);
    }

    private _updateStyle() {
        this._setVars();
        this._setBaseStyle();

        this._stylesheet.textContent = `${this._vars}${this._baseStyle}${this._styleContent}`;
    }

    public set backgroundcolor(val: string) {
        const parsedVal = val || this._defaultBackgroundColor;
        this._backgroundColor = parsedVal;
        this._syncAttr('backgroundcolor', parsedVal);
        this.update();
    }

    public get backgroundcolor(): string {
        return this._backgroundColor;
    }

    public set color(val: string) {
        const parsedVal = val || this._defaultColor;
        this._color = parsedVal;
        this._syncAttr('color', parsedVal);
        this.update();
    }

    public get color(): string {
        return this._color;
    }

    public set defaultBackgroundColor(val: string) {
        this._backgroundColor = val;
        this.update();
    }

    public set defaultColor(val: string) {
        this._color = val;
        this.update();
    }

    public set defaultSize(val: string) {
        this._size = val;
        this.update();
    }

    public set size(val: string) {
        const parsedVal = val || this._defaultSize;
        this._size = parseInt(parsedVal, 10).toString();
        this._syncAttr('size', val);
        this.update();
    }

    public get size(): string {
        return this._size;
    }

    public set styleContent(textContent: string) {
        this._styleContent = textContent;
    }

    public get styleContent(): string {
        return this._styleContent;
    }

    public set content(content: HTMLElement) {
        this._content = content;
    }

    public get content(): HTMLElement {
        return this._content;
    }

    public render() {
        this.shadowRoot.innerHTML = '';
        this.shadowRoot.appendChild(this._stylesheet);
        this.shadowRoot.appendChild(this._content);

        this.update();
    }

    public update() {
        this._updateStyle();
    }

    protected attributeChangedCallback(name: string, _oldVal: string, newVal: string) {
        if (this[name] === newVal) {
            return;
        }

        this[name] = newVal;
    }
}

customElements.define(tagName, HTMLZooduckIconBaseElement);
