export var WebBuilder;
(function (WebBuilder) {
    let External;
    (function (External) {
        class Stylesheet {
            constructor(source) {
                this.source = source;
            }
            static define(source) {
                if (this.sources.has(source)) {
                    return;
                }
                this.sources.add(source);
                return new Stylesheet(source);
            }
            static getAll() {
                return this.sources;
            }
        }
        Stylesheet.sources = new Set();
        External.Stylesheet = Stylesheet;
    })(External = WebBuilder.External || (WebBuilder.External = {}));
    class DataSize {
        constructor(size, type) {
            this.size = size;
            this.type = type;
        }
        static construct(size, type) {
            return new DataSize(size, type);
        }
        static inPx(size) {
            return new DataSize(size, "px");
        }
        static inPercent(size) {
            return new DataSize(size, "%");
        }
        static inRem(size) {
            return new DataSize(size, "rem");
        }
        static inEm(size) {
            return new DataSize(size, "em");
        }
        toString() {
            return `${this.size}${this.type}`;
        }
    }
    WebBuilder.DataSize = DataSize;
    class Renderable {
        constructor(data) {
            this.idIndex = 0;
            this.idGroup = Renderable.id;
            Renderable.id++;
            this.data = data;
        }
        build() {
            const data = this.getData();
            if (data.id === "") {
                data.id = this.registerId();
            }
            this.baseElement = data;
            return data;
        }
        rerender() {
            let parent = this.baseElement.parentElement;
            if (!!parent) {
                const old = this.baseElement;
                const copy = this.build();
                parent.insertBefore(copy, old);
                old.remove();
            }
            else {
                this.baseElement.remove();
            }
        }
        registerId() {
            this.idIndex++;
            return `ele-${this.idGroup}-${this.idIndex}`;
        }
    }
    Renderable.id = 0;
    WebBuilder.Renderable = Renderable;
    class MultiRenderable extends Renderable {
        constructor(data) {
            super(data);
            this.renderer = [];
        }
        rerender() {
            let parent = this.baseElement.parentElement;
            if (!!parent) {
                const old = this.baseElement;
                const copy = this.build();
                parent.insertBefore(copy, old);
                old.remove();
                this.baseElement = copy;
            }
            else {
                this.baseElement.remove();
            }
        }
        build() {
            const element = super.build();
            for (const ele of this.renderer) {
                element.appendChild(ele.build());
            }
            return element;
        }
        appendElement(element) {
            this.renderer.push(element);
        }
        removeAllElements(rerender = true) {
            this.renderer = [];
            if (rerender) {
                this.rerender();
            }
        }
        getElement(id) {
            for (const rendererElement of this.renderer) {
                if (rendererElement.baseElement.id === id) {
                    return rendererElement;
                }
            }
            return null;
        }
    }
    WebBuilder.MultiRenderable = MultiRenderable;
    class BaseRenderer {
        constructor() {
            this.renders = [];
        }
        renderElement(x) {
            this.renders.push(x);
        }
        getElements() {
            return this.renders;
        }
    }
    WebBuilder.BaseRenderer = BaseRenderer;
    class WebApp {
        constructor(root) {
            this.isReleased = false;
            this.root = root;
            this.routes = new Map();
        }
        static createLocking(root) {
            return new WebApp(root !== null && root !== void 0 ? root : "/");
        }
        addRoute(path, rout) {
            if (this.isReleased) {
                throw "error: Cannot add routed to released page";
            }
            this.routes.set(path, rout);
        }
        release() {
            console.log("Starting construct web page");
            this.isReleased = true;
            let path = window.location.pathname;
            let routTemplate = this.routes.get(path);
            let rout = new routTemplate(new WebData(window.location));
            console.log("Fetch rout header -> WebStatus");
            let status = rout.start();
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
                    document.body.appendChild(x.build());
                }
                console.log("Build finished");
            }
        }
    }
    WebBuilder.WebApp = WebApp;
    class WebComponent {
    }
    WebBuilder.WebComponent = WebComponent;
    class WebRout extends BaseRenderer {
        constructor(data) {
            super();
            this.components = new Set();
            this.data = data;
            this.isInConstruction = true;
        }
        build() {
            this.isInConstruction = false;
            this.render();
        }
        addComponent(component) {
            if (!this.isInConstruction) {
                throw "Can only add components in construction (<start> method) mode.";
            }
            if (!this.components.has(component)) {
                this.components.add(component);
            }
        }
    }
    WebBuilder.WebRout = WebRout;
    class WebData {
        constructor(location) {
            this.hash = location.hash;
            this.protocol = location.href.startsWith("https") ? "https" : "http";
            this.query = new URLSearchParams(location.search);
            this.domain = location.hostname;
        }
    }
    WebBuilder.WebData = WebData;
    class WebStatus {
        constructor(code) {
            this.code = code;
        }
        static get OK() {
            return new WebStatus("OK");
        }
        equals(webStatus) {
            return this.code === webStatus.code;
        }
    }
    WebBuilder.WebStatus = WebStatus;
    class EventManager {
        static bindEvents(events, element, item) {
            if (!events) {
                return;
            }
            for (const event of events) {
                element.addEventListener(event.type, (e) => event.exec(item, e));
            }
        }
    }
    WebBuilder.EventManager = EventManager;
})(WebBuilder || (WebBuilder = {}));
//# sourceMappingURL=WebBuilder.js.map