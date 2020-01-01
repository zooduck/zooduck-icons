const tagName = 'zooduck-icon-base';
export class HTMLZooduckIconBaseElement extends HTMLElement {
    private _content: HTMLElement;
    private _backgroundColor = '#fff';
    private _baseStyle: string;
    private _color = '#222';
    private _size = '50';
    private _styleContent: string;
    private _stylesheet: HTMLStyleElement;
    private _vars: string;

    constructor() {
        super();

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
        if (val === '') {
            return;
        }

        this._backgroundColor = val;
        this._syncAttr('backgroundcolor', val);
        this.update();
    }

    public get backgroundcolor(): string {
        return this._backgroundColor;
    }

    public set color(val: string) {
        if (val === '') {
            return;
        }

        this._color = val;
        this._syncAttr('color', val);
        this.update();
    }

    public get color(): string {
        return this._color;
    }

    public set size(val: string) {
        if (val === '') {
            return;
        }

        this._size = parseInt(val, 10).toString();
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
        if (newVal === null || this[name] === newVal) {
            return;
        }

        this[name] = newVal;
    }
}

customElements.define(tagName, HTMLZooduckIconBaseElement);
