import { WebBuilder } from "./WebBuilder.js";
export declare namespace System {
    import IEvent = WebBuilder.IEvent;
    import Renderable = WebBuilder.Renderable;
    import DataSize = WebBuilder.DataSize;
    import MultiRenderable = WebBuilder.MultiRenderable;
    import WebComponent = WebBuilder.WebComponent;
    class SystemComponent extends WebComponent {
        getStylesheets(): Generator<WebBuilder.External.Stylesheet>;
    }
    interface IBaseElement {
        events?: IEvent[];
    }
    interface IText extends IBaseElement {
        text: string;
        size?: DataSize;
    }
    class Text extends Renderable<IText> {
        getData(): HTMLElement;
    }
    class LineBreak extends Renderable<{
        events?: IEvent[];
    }> {
        protected getData(): HTMLElement;
    }
    interface IPanel extends IBaseElement {
        height: DataSize;
        width: DataSize;
        left?: DataSize;
        top?: DataSize;
    }
    class Panel extends MultiRenderable<IPanel> {
        protected getData(): HTMLElement;
    }
    interface IListGrid extends IBaseElement {
        padding?: DataSize[];
        gap?: DataSize;
    }
    class ListGrid extends MultiRenderable<IListGrid> {
        protected getData(): HTMLElement;
    }
    interface IBox extends IBaseElement {
        margin?: DataSize[];
        padding?: DataSize[];
    }
    class Box extends MultiRenderable<IBox> {
        protected getData(): HTMLElement;
    }
    interface ICenteredBox extends IBox {
    }
    class CenteredBox extends MultiRenderable<ICenteredBox> {
        protected getData(): HTMLElement;
    }
    interface IUserInput extends IBaseElement {
        type: "text" | "password" | string;
        placeholder?: string;
    }
    class UserInput extends Renderable<IUserInput> {
        protected getData(): HTMLElement;
        getValue(): string;
        clear(): void;
    }
    interface IButton extends IBaseElement {
        showing: Renderable<any>;
    }
    class Button extends Renderable<IButton> {
        protected getData(): HTMLElement;
    }
}
//# sourceMappingURL=System.d.ts.map