import {WebBuilder} from "./WebBuilder.js";

export namespace System {


    import IEvent = WebBuilder.IEvent;
    import Renderable = WebBuilder.Renderable;
    import EventManager = WebBuilder.EventManager;
    import DataSize = WebBuilder.DataSize;
    import MultiRenderable = WebBuilder.MultiRenderable;
    import WebComponent = WebBuilder.WebComponent;
    import Stylesheet = WebBuilder.External.Stylesheet;

    export class SystemComponent extends WebComponent {
        public* getStylesheets(): Generator<WebBuilder.External.Stylesheet> {
            yield Stylesheet.define("src/System.css");
        }
    }

    export interface IBaseElement {
        events?: IEvent[];
    }

    export interface IText extends IBaseElement {
        text: string;
        size?: DataSize;
    }

    export class Text extends Renderable<IText> {
        getData(): HTMLElement {
            // @ts-ignore
            const element: HTMLElement = document.createElement("text");
            element.innerText = this.data.text;

            if (!!this.data.size) {
                element.style.fontSize = this.data.size.toString();
            }

            EventManager.bindEvents(this.data.events, element, this);

            return element;
        }
    }

    export class LineBreak extends Renderable<{ events?: IEvent[] }> {
        protected getData(): HTMLElement {
            const element: HTMLElement = document.createElement("br");

            EventManager.bindEvents(this.data.events, element, this);
            return element;
        }
    }

    export interface IPanel extends IBaseElement {
        height: DataSize;
        width: DataSize;
        left?: DataSize;
        top?: DataSize;
    }

    export class Panel extends MultiRenderable<IPanel> {
        protected getData(): HTMLElement {
            const element: HTMLElement = document.createElement("panel");
            element.classList.add("system", "panel");
            element.style.height = this.data.height.toString();
            element.style.width = this.data.width.toString();

            if (!!this.data.left) {
                element.style.left = this.data.left.toString();
            }

            if (!!this.data.top) {
                element.style.left = this.data.left.toString();
            }

            EventManager.bindEvents(this.data.events, element, this);

            return element;
        }
    }

    export interface IListGrid extends IBaseElement {
        padding?: DataSize[];
        gap?: DataSize;
    }

    export class ListGrid extends MultiRenderable<IListGrid> {
        protected getData(): HTMLElement {
            const element = document.createElement("grid");
            element.classList.add("system", "grid");
            element.setAttribute("type", "list");


            if (!!this.data.padding) {
                let string = "";
                for (let margin of this.data.padding) {
                    string += margin.toString() + " ";
                }

                element.style.padding = string;
            }

            if (!!this.data.gap) {
                element.style.gap = this.data.gap.toString();
            }

            EventManager.bindEvents(this.data.events, element, this);

            return element;
        }

    }

    export interface IBox extends IBaseElement {
        margin?: DataSize[],
        padding?: DataSize[]
    }

    export class Box extends MultiRenderable<IBox> {
        protected getData(): HTMLElement {
            const element: HTMLElement = document.createElement("box");
            element.classList.add("system", "box");

            if (!!this.data.margin) {
                let string = "";
                for (let margin of this.data.margin) {
                    string += margin.toString() + " ";
                }

                element.style.margin = string;
            }

            if (!!this.data.padding) {
                let string = "";
                for (let margin of this.data.padding) {
                    string += margin.toString() + " ";
                }

                element.style.padding = string;
            }

            EventManager.bindEvents(this.data.events, element, this);

            return element;
        }
    }

    export interface ICenteredBox extends IBox {

    }

    export class CenteredBox extends MultiRenderable<ICenteredBox> {
        protected getData(): HTMLElement {
            const element: HTMLElement = document.createElement("box");
            element.classList.add("system", "box", "centered");

            if (!!this.data.margin) {
                let string = "";
                for (let margin of this.data.margin) {
                    string += margin.toString() + " ";
                }

                element.style.margin = string;
            }

            if (!!this.data.padding) {
                let string = "";
                for (let margin of this.data.padding) {
                    string += margin.toString() + " ";
                }

                element.style.padding = string;
            }

            EventManager.bindEvents(this.data.events, element, this);

            return element;
        }
    }

    export interface IUserInput extends IBaseElement {
        type: "text" | "password" | string;
        placeholder?: string
    }

    export class UserInput extends Renderable<IUserInput> {
        protected getData(): HTMLElement {
            const element = document.createElement("input");

            element.classList.add("system", "user-input");

            if (!!this.data.placeholder) {
                element.placeholder = this.data.placeholder;
            }

            EventManager.bindEvents(this.data.events, element, this);

            return element;
        }

        public getValue(): string {
            // @ts-ignore
            return this.baseElement.value;
        }

        public clear(): void {
            // @ts-ignore
            this.baseElement.value = "";
        }

    }

    export interface IButton extends IBaseElement {
        showing: Renderable<any>;
    }

    export class Button extends Renderable<IButton> {
        protected getData(): HTMLElement {
            const element = document.createElement("button");
            element.classList.add("system", "button");
            element.appendChild(this.data.showing.build());

            EventManager.bindEvents(this.data.events, element, this);

            return element;
        }
    }
}
