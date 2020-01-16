import { HTMLZooduckIconBaseElement } from '../base/zooduck-icon.base';

const tagName = 'zooduck-icon-menu';

export class HTMLZooduckIconMenuElement extends HTMLZooduckIconBaseElement {
    constructor() {
        super();

        this.defaultBackgroundColor = 'transparent';
    }

    private _build() {
        this.styleContent = this._buildStyleContent();
        this.content = this._buildContent();

        this.render();
    }

    private _buildContent(): HTMLElement {
        const content = new DOMParser().parseFromString(`
            <div class="icon-menu">
                <div class="icon-menu__bar"></div>
                <div class="icon-menu__bar"></div>
                <div class="icon-menu__bar"></div>
            </div>
        `, 'text/html').body.firstChild as HTMLElement;

        return content;
    }

    private _buildStyleContent(): string {
        const styleContent = `
            .icon-menu {
                display: grid;
                grid-template-rows: repeat(3, auto);
                grid-gap: calc(var(--zooduck-icon-size) * .1);
                width: var(--zooduck-icon-size);
                height: var(--zooduck-icon-size);
                background-color: var(--zooduck-icon-background-color);
                padding: 10%;
            }
            .icon-menu__bar {
                background-color: var(--zooduck-icon-color);
            }
        `;

        return styleContent;
    }

    protected connectedCallback() {
        if (!this.isConnected) {
            return;
        }

        this._build();
    }
}

customElements.define(tagName, HTMLZooduckIconMenuElement);
