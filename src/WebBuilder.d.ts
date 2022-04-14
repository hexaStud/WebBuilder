export declare namespace WebBuilder {
    namespace External {
        class Stylesheet {
            private static sources;
            static define(source: string): Stylesheet;
            static getAll(): Set<string>;
            readonly source: any;
            private constructor();
        }
    }
    type DataSizeType = "px" | "%" | "rem" | "em" | "pt";
    class DataSize {
        static construct(size: number, type: DataSizeType): DataSize;
        static inPx(size: number): DataSize;
        static inPercent(size: number): DataSize;
        static inRem(size: number): DataSize;
        static inEm(size: number): DataSize;
        private readonly size;
        private readonly type;
        private constructor();
        toString(): string;
    }
    abstract class Renderable<Constructor> {
        private static id;
        private readonly idGroup;
        private idIndex;
        baseElement: HTMLElement;
        protected data: Constructor;
        constructor(data: Constructor);
        build(): HTMLElement;
        rerender(): void;
        protected abstract getData(): HTMLElement;
        protected registerId(): string;
    }
    abstract class MultiRenderable<Constructor> extends Renderable<Constructor> {
        private renderer;
        constructor(data: Constructor);
        rerender(): void;
        build(): HTMLElement;
        appendElement(element: Renderable<any>): void;
        removeAllElements(rerender?: boolean): void;
        getElement(id: string): Renderable<unknown> | null;
    }
    class BaseRenderer {
        private readonly renders;
        protected constructor();
        protected renderElement(x: Renderable<any>): void;
        getElements(): Renderable<any>[];
    }
    class WebApp {
        private root;
        private routes;
        private isReleased;
        static createLocking(root?: string): WebApp;
        private constructor();
        addRoute(path: string, rout: typeof WebRout): void;
        release(): void;
    }
    abstract class WebComponent {
        abstract getStylesheets(): Generator<External.Stylesheet>;
    }
    abstract class WebRout extends BaseRenderer {
        protected data: WebData;
        isInConstruction: any;
        components: Set<WebComponent>;
        abstract start(): WebStatus;
        build(): void;
        protected addComponent(component: WebComponent): void;
        protected abstract render(): any;
        constructor(data: WebData);
    }
    class WebData {
        readonly query: URLSearchParams;
        readonly hash: string;
        readonly domain: string;
        readonly protocol: "https" | "http";
        constructor(location: Location);
    }
    class WebStatus {
        static get OK(): WebStatus;
        private readonly code;
        private constructor();
        equals(webStatus: WebStatus): boolean;
    }
    interface IEvent {
        type: "click" | "change";
        exec(item: Renderable<unknown>, e: Event): void;
    }
    class EventManager {
        static bindEvents(events: IEvent[] | undefined, element: Element, item: Renderable<any>): void;
    }
}
//# sourceMappingURL=WebBuilder.d.ts.map