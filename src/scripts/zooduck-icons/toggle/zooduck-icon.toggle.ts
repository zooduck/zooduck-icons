import { HTMLZooduckIconBaseElement } from '../base/zooduck-icon.base';

type ToggleState = 'off'|'on';

const tagName = 'zooduck-icon-toggle';

export class HTMLZooduckIconToggleElement extends HTMLZooduckIconBaseElement {
    private _fontFamily = 'Calibri, sans-serif';
    private _toggleSwitchColor = '#fff';
    private _toggleOffColor = '#ccc';
    private _toggleOffText = '';
    private _toggleOffTextColor = '#fff';
    private _toggleOnColor = '#222';
    private _toggleOnText  = '';
    private _toggleOnTextColor = '#fff';
    private _toggleState: ToggleState = 'off';
    private _width = '0'; // the icon's width is automatically calculated based on its size attribute, but if a fixed width is desired it can be set using this attribute

    constructor() {
        super();
    }

    static get observedAttributes() {
        return [
            'fontfamily',
            'size',
            'toggleoffcolor',
            'toggleofftext',
            'toggleofftextcolor',
            'toggleoncolor',
            'toggleontext',
            'toggleontextcolor',
            'togglestate',
            'toggleswitchcolor',
            'width',
        ];
    }

    private _buildContent(): HTMLElement {
        const checked = this._toggleState === 'on'
            ? 'checked'
            : '';
        const content = new DOMParser().parseFromString(`
            <div class="toggle-icon">
                <label>
                    <input type="checkbox" ${checked} />
                    <div class="toggle-icon__switch-base">
                        <span class="toggle-icon__text --off">${this._toggleOffText}</span>
                        <span class="toggle-icon__text --on">${this._toggleOnText}</span>
                    </div>
                    <div class="toggle-icon__switch"></div>
                </label>
            </div>
        `, 'text/html').body.firstChild as HTMLElement;

        content.querySelector('input').addEventListener('click', (e: Event) => {
            // If a user clicks or taps on zooduck-icon-toggle
            // the checkbox will fire its own click event
            // (even with display set to none)
            e.stopPropagation();
        });

        return content;
    }

    private _buildStyleContent(): string {
        const style = `
            :host {
                --toggle-icon-switch-color: ${this._toggleSwitchColor};
                --toggle-icon-font-family: ${this._fontFamily};
                --toggle-icon-font-size: calc(var(--zooduck-icon-size) * .3);
                --toggle-icon-off-color: ${this._toggleOffColor};
                --toggle-icon-off-text-color: ${this._toggleOffTextColor};
                --toggle-icon-on-color: ${this._toggleOnColor};
                --toggle-icon-on-text-color: ${this._toggleOnTextColor};
                --toggle-icon-text-width: ${this._calcTextWidth()}px;
            }
            .toggle-icon {
                box-sizing: content-box !important;
                position: relative;
                width: var(--zooduck-icon-size);
                height: calc(var(--zooduck-icon-size) * .525);
                user-select: none;
                padding-right: var(--toggle-icon-text-width);
            }
            .toggle-icon label {
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                cursor: pointer;
            }
            .toggle-icon__switch-base {
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                background-color: var(--toggle-icon-off-color);
                transition: all .25s;
                border-radius: calc(var(--zooduck-icon-size) * .25);
                display: grid;
                align-items: center;
                grid-template-columns: repeat(2, auto);
            }
            .toggle-icon__text {
                margin: 0;
                font-family: var(--toggle-icon-font-family);
                font-size: var(--toggle-icon-font-size);
            }
            .toggle-icon__text.--off {
                grid-column: 1;
                margin-left: calc(var(--zooduck-icon-size) * .125);
                justify-self: left;
                color: var(--toggle-icon-off-text-color);
            }
            .toggle-icon__text.--on {
                grid-column: 2;
                margin-right: calc(var(--zooduck-icon-size) * .125);
                justify-self: right;
                color: var(--toggle-icon-on-text-color);
            }
            .toggle-icon__switch {
                position: absolute;
                left: 100%;
                top: calc(var(--zooduck-icon-size) * .075);
                transform: translateX(calc(-100% - calc(var(--zooduck-icon-size) * .075)));
                width: calc(var(--zooduck-icon-size) * .375);
                height: calc(var(--zooduck-icon-size) * .375);
                background-color: var(--toggle-icon-switch-color);
                clip-path: circle(50%);
                transition: all .25s;
            }
            .toggle-icon input[type=checkbox] {
                display: none !important;
            }
            .toggle-icon input[type=checkbox]:checked ~ .toggle-icon__switch-base {
                background-color: var(--toggle-icon-on-color);
            }
            .toggle-icon input[type=checkbox]:checked ~ .toggle-icon__switch {
                left: calc(var(--zooduck-icon-size) * .075);
                transform: translateX(0);
            }
            .toggle-icon input[type=checkbox]:checked ~ .toggle-icon__switch-base .toggle-icon__text.--off {
                display: none;
            }
            .toggle-icon input[type=checkbox]:not(:checked) ~ .toggle-icon__switch-base .toggle-icon__text.--on {
                display: none;
            }
        `;

        return style;
    }

    private _calcTextWidth(): number {
        const fixedWidth = parseInt(this._width, 10);
        const widthBeforePadding = parseInt(this.size, 10);

        if (fixedWidth) {
            return (fixedWidth - widthBeforePadding);
        }

        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        const fontSize = `${(widthBeforePadding * .3)}px`;
        const font = `${fontSize} ${this._fontFamily}`;
        context.font = font;

        const dominantText = this._toggleOnText.length > this._toggleOffText.length
            ? this._toggleOnText
            : this._toggleOffText;

        return context.measureText(dominantText).width;
    }

    private _build() {
        this.styleContent = this._buildStyleContent();
        this.content = this._buildContent();
        this._registerEvents();

        this.render();
    }

    private _onCheckboxChange() {
        this._toggleState = this._toggleState === 'off'
            ? 'on'
            : 'off';
        this.dispatchEvent(new CustomEvent('zooduck-icon-toggle:change', {
            detail: {
                toggleState: this._toggleState,
            }
        }));
    }

    private _registerEvents() {
        const checkbox = this.content.querySelector('input[type=checkbox]');
        checkbox.addEventListener('change', this._onCheckboxChange.bind(this));
    }

    public set fontfamily(val: string) {
        this._fontFamily = val;
    }

    public get fontfamily(): string {
        return this._fontFamily;
    }

    public set toggleoffcolor(val: string) {
        this._toggleOffColor = val;
    }

    public get toggleoffcolor(): string {
        return this._toggleOffColor;
    }

    public set toggleofftext(val: string) {
        this._toggleOffText = val;
    }

    public get toggleofftext(): string {
        return this._toggleOffText;
    }

    public set toggleofftextcolor(val: string) {
        this._toggleOffTextColor = val;
    }

    public get toggleofftextcolor(): string {
        return this._toggleOffTextColor;
    }

    public set toggleoncolor(val: string) {
        this._toggleOnColor = val;
    }

    public get toggleoncolor(): string {
        return this._toggleOnColor;
    }

    public set toggleontext(val: string) {
        this._toggleOnText = val;
    }

    public get toggleontext(): string {
        return this._toggleOnText;
    }

    public set toggleontextcolor(val: string) {
        this._toggleOnTextColor = val;
    }

    public get toggleontextcolor() {
        return this._toggleOnTextColor;
    }

    public set togglestate(val: ToggleState) {
        this._toggleState = val;
    }

    public get togglestate(): ToggleState {
        return this._toggleState;
    }

    public set toggleswitchcolor(val: string) {
        this._toggleSwitchColor = val;
    }

    public get toggleswitchcolor(): string {
        return this._toggleSwitchColor;
    }

    public set width(val: string) {
        this._width = val;
    }

    public get width(): string {
        return this._width;
    }

    protected attributeChangedCallback(name: string, _oldVal: string, newVal: string) {
        if (newVal === null || this[name] === newVal) {
            return;
        }

        this[name] = newVal;

        this._build();
    }

    protected connectedCallback() {
        if (!this.isConnected) {
            return;
        }

        this._build();
    }
}

customElements.define(tagName, HTMLZooduckIconToggleElement);
