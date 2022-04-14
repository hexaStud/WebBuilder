export namespace WebBuilder {
    export namespace External {
        export class Stylesheet {
            private static sources: Set<string> = new Set<string>();

            public static define(source: string): Stylesheet {
                if (this.sources.has(source)) {
                    return;
                }

                this.sources.add(source);
                return new Stylesheet(source);
            }

            public static getAll(): Set<string> {
                return this.sources;
            }

            public readonly source;

            private constructor(source: string) {
                this.source = source;
            }
        }
    }

    export type DataSizeType = "px" | "%" | "rem" | "em" | "pt";

    export class DataSize {
        public static construct(size: number, type: DataSizeType): DataSize {
            return new DataSize(size, type);
        }

        public static inPx(size: number): DataSize {
            return new DataSize(size, "px");
        }

        public static inPercent(size: number): DataSize {
            return new DataSize(size, "%");
        }

        public static inRem(size: number): DataSize {
            return new DataSize(size, "rem");
        }

        public static inEm(size: number): DataSize {
            return new DataSize(size, "em");
        }

        private readonly size: number;
        private readonly type: DataSizeType;

        private constructor(size: number, type: DataSizeType) {
            this.size = size;
            this.type = type;
        }

        public toString() {
            return `${this.size}${this.type}`;
        }
    }

    export abstract class Renderable<Constructor> {
        private static id: number = 0;
        private readonly idGroup: number;
        private idIndex: number;
        public baseElement: HTMLElement;
        protected data: Constructor;


        public constructor(data: Constructor) {
            this.idIndex = 0;
            this.idGroup = Renderable.id;
            Renderable.id++;

            this.data = data;
        }

        public build(): HTMLElement {
            const data: HTMLElement = this.getData();
            if (data.id === "") {
                data.id = this.registerId();
            }
            this.baseElement = data;

            return data;
        }

        public rerender(): void {
            let parent = this.baseElement.parentElement;

            if (!!parent) {
                const old = this.baseElement;
                const copy = this.build();
                parent.insertBefore(copy, old);
                old.remove();
            } else {
                this.baseElement.remove();
            }
        }

        protected abstract getData(): HTMLElement;

        protected registerId(): string {
            this.idIndex++;
            return `ele-${this.idGroup}-${this.idIndex}`;
        }
    }

    export abstract class MultiRenderable<Constructor> extends Renderable<Constructor> {
        private renderer: Renderable<any>[];

        public constructor(data: Constructor) {
            super(data);

            this.renderer = [];
        }

        public rerender() {
            let parent = this.baseElement.parentElement;

            if (!!parent) {
                const old = this.baseElement;
                const copy = this.build();

                parent.insertBefore(copy, old);

                old.remove();
                this.baseElement = copy;
            } else {
                this.baseElement.remove();
            }
        }

        public build(): HTMLElement {
            const element: HTMLElement = super.build();
            for (const ele of this.renderer) {
                element.appendChild(ele.build());
            }

            return element;
        }

        public appendElement(element: Renderable<any>): void {
            this.renderer.push(element);
        }

        public removeAllElements(rerender: boolean = true): void {
            this.renderer = [];
            if (rerender) {
                this.rerender();
            }
        }

        public getElement(id: string): Renderable<unknown> | null {
            for (const rendererElement of this.renderer) {
                if (rendererElement.baseElement.id === id) {
                    return rendererElement;
                }
            }

            return null;
        }
    }

    export class BaseRenderer {
        private readonly renders: Renderable<any>[];

        protected constructor() {
            this.renders = [];
        }

        protected renderElement(x: Renderable<any>): void {
            this.renders.push(x);
        }


        public getElements(): Renderable<any>[] {
            return this.renders;
        }
    }

    export class WebApp {
        private root: string;
        private routes: Map<string, typeof WebRout>
        private isReleased: boolean;

        public static createLocking(root?: string): WebApp {
            return new WebApp(root ?? "/");
        }

        private constructor(root: string) {
            this.isReleased = false;
            this.root = root;
            this.routes = new Map<string, typeof WebRout>();
        }

        public addRoute(path: string, rout: typeof WebRout) {
            if (this.isReleased) {
                throw "error: Cannot add routed to released page";
            }

            this.routes.set(path, rout);
        }

        public release() {
            console.log("Starting construct web page");
            this.isReleased = true;

            let path: string = window.location.pathname;

            let routTemplate: typeof WebRout = <typeof WebRout>this.routes.get(path);
            // @ts-ignore
            let rout: WebRout = new routTemplate(new WebData(window.location));

            console.log("Fetch rout header -> WebStatus");
            let status: WebStatus = rout.start();
            console.log(status);
            if (status.equals(WebStatus.OK)) {
                console.log("Build external sources...");
                for (const component of rout.components) {
                    for (const stylesheet of component.getStylesheets()) {
                        if (!stylesheet) {
                            break;
                        }
                        console.log(stylesheet);
                        const link = document.createElement("link");
                        link.rel = "stylesheet";
                        link.href = this.root + stylesheet.source;
                        link.type = "text/css";

                        document.head.append(link);
                    }
                }
                console.log("Build router...");
                rout.build();
                console.log("Append elements...");
                for (const x of rout.getElements()) {
                    // @ts-ignore
                    document.body.appendChild(x.build());
                }
                console.log("Build finished");
            }
        }
    }

    export abstract class WebComponent {
        public abstract getStylesheets(): Generator<External.Stylesheet>;
    }

    export abstract class WebRout extends BaseRenderer {
        protected data: WebData
        public isInConstruction;
        public components: Set<WebComponent>;

        public abstract start(): WebStatus;

        public build() {
            this.isInConstruction = false;
            this.render();
        }

        protected addComponent(component: WebComponent) {
            if (!this.isInConstruction) {
                throw "Can only add components in construction (<start> method) mode.";
            }

            if (!this.components.has(component)) {
                this.components.add(component);
            }
        }

        protected abstract render();

        public constructor(data: WebData) {
            super();
            this.components = new Set<WebComponent>();
            this.data = data;
            this.isInConstruction = true;
        }
    }

    export class WebData {
        public readonly query: URLSearchParams;
        public readonly hash: string;
        public readonly domain: string;
        public readonly protocol: "https" | "http";

        public constructor(location: Location) {
            this.hash = location.hash;
            this.protocol = location.href.startsWith("https") ? "https" : "http";
            this.query = new URLSearchParams(location.search);
            this.domain = location.hostname;
        }
    }

    export class WebStatus {

        static get OK() {
            return new WebStatus("OK");
        }

        private readonly code: string;

        private constructor(code: string) {
            this.code = code;
        }

        public equals(webStatus: WebStatus) {
            return this.code === webStatus.code;
        }
    }

    export interface IEvent {
        type: "click" | "change";

        exec(item: Renderable<unknown>, e: Event): void;
    }

    export class EventManager {
        public static bindEvents(events: IEvent[] | undefined, element: Element, item: Renderable<any>): void {
            if (!events) {
                return;
            }

            for (const event of events) {
                element.addEventListener(event.type, (e) => event.exec(item, e));
            }
        }
    }
}
