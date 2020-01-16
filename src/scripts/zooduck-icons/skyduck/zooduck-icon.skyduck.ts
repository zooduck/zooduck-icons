import { HTMLZooduckIconBaseElement } from '../base/zooduck-icon.base';

const tagName = 'zooduck-icon-skyduck';

export class HTMLZooduckIconSkyduckElement extends HTMLZooduckIconBaseElement {
    constructor() {
        super();
    }

    private _build() {
        this.styleContent = this._buildStyleContent();
        this.content = this._buildContent();

        this.render();
    }

    private _buildContent(): HTMLElement {
        const content = new DOMParser().parseFromString(`
            <div class="skyduck-icon">
                <div class="skyduck-icon__body">
                    <div class="skyduck-icon__beak"></div>
                </div>
                <div class="skyduck-icon__wing-left"></div>
                <div class="skyduck-icon__wing-right"></div>
                <div class="skyduck-icon__eye-left"></div>
                <div class="skyduck-icon__eye-right"></div>
            </div>
        `, 'text/html').body.firstChild as HTMLElement;

        return content;
    }

    private _buildStyleContent(): string {
        const styleContent = `
            .skyduck-icon {
                position: relative;
                width: var(--zooduck-icon-size);
                height: var(--zooduck-icon-size);
                display: grid;
                grid-template-columns: repeat(20, 5%);
                grid-template-rows: repeat(20, 5%);
            }
            .skyduck-icon__wing-left {
                grid-row: 3 / span 4;
                grid-column: 6 / span 14;
                background-color: var(--zooduck-icon-color);
                transform: skewY(-30deg) rotate(20deg);
            }
            .skyduck-icon__wing-right {
                grid-row: 4 / span 15;
                grid-column: 4 / span 4;
                background-color: var(--zooduck-icon-color);
                transform: skewY(-30deg);
            }
            .skyduck-icon__body {
                display: flex;
                align-items: center;
                justify-content: center;
                clip-path: circle(50%);
                border-radius: 50%;
                background-color: var(--zooduck-icon-color);
                grid-column: 1 / span 15;
                grid-row: 1 / span 15;
            }
            .skyduck-icon__beak {
                width: 60%;
                height: 60%;
                clip-path: circle(50%);
                border-radius: 50%;
                background-color: var(--zooduck-icon-background-color);
            }
            .skyduck-icon__eye-left,
            .skyduck-icon__eye-right {
                z-index: 1;
                background-color: var(--zooduck-icon-background-color);
                clip-path: circle(50%);
                border-radius: 50%;
            }
            .skyduck-icon__eye-right {
                grid-column: 4 / span 2;
                grid-row: 7 / span 2;
            }
            .skyduck-icon__eye-left {
                grid-column: 8 / span 2;
                grid-row: 4 / span 2;
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

customElements.define(tagName, HTMLZooduckIconSkyduckElement);
