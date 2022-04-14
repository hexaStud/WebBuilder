import { WebBuilder } from "./WebBuilder.js";
export var System;
(function (System) {
    var Renderable = WebBuilder.Renderable;
    var EventManager = WebBuilder.EventManager;
    var MultiRenderable = WebBuilder.MultiRenderable;
    var WebComponent = WebBuilder.WebComponent;
    var Stylesheet = WebBuilder.External.Stylesheet;
    class SystemComponent extends WebComponent {
        *getStylesheets() {
            yield Stylesheet.define("src/System.css");
        }
    }
    System.SystemComponent = SystemComponent;
    class Text extends Renderable {
        getData() {
            const element = document.createElement("text");
            element.innerText = this.data.text;
            if (!!this.data.size) {
                element.style.fontSize = this.data.size.toString();
            }
            EventManager.bindEvents(this.data.events, element, this);
            return element;
        }
    }
    System.Text = Text;
    class LineBreak extends Renderable {
        getData() {
            const element = document.createElement("br");
            EventManager.bindEvents(this.data.events, element, this);
            return element;
        }
    }
    System.LineBreak = LineBreak;
    class Panel extends MultiRenderable {
        getData() {
            const element = document.createElement("panel");
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
    System.Panel = Panel;
    class ListGrid extends MultiRenderable {
        getData() {
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
    System.ListGrid = ListGrid;
    class Box extends MultiRenderable {
        getData() {
            const element = document.createElement("box");
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
    System.Box = Box;
    class CenteredBox extends MultiRenderable {
        getData() {
            const element = document.createElement("box");
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
    System.CenteredBox = CenteredBox;
    class UserInput extends Renderable {
        getData() {
            const element = document.createElement("input");
            element.classList.add("system", "user-input");
            if (!!this.data.placeholder) {
                element.placeholder = this.data.placeholder;
            }
            EventManager.bindEvents(this.data.events, element, this);
            return element;
        }
        getValue() {
            return this.baseElement.value;
        }
        clear() {
            this.baseElement.value = "";
        }
    }
    System.UserInput = UserInput;
    class Button extends Renderable {
        getData() {
            const element = document.createElement("button");
            element.classList.add("system", "button");
            element.appendChild(this.data.showing.build());
            EventManager.bindEvents(this.data.events, element, this);
            return element;
        }
    }
    System.Button = Button;
})(System || (System = {}));
//# sourceMappingURL=System.js.map