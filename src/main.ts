import { Application, Assets } from "pixi.js";
import Gruvbox from "./gruvbox.json";
import "@pixi/layout";
import SerifFont from "@fontsource-variable/alegreya/files/alegreya-latin-wght-normal.woff2?url";
import Quote from "./slides/quote.ts";

async function load_assets() {
    await Promise.all([
        Assets.load({
            src: SerifFont,
            data: {
                family: "Serif",
            },
        })
    ]);
}

export type Slide = (app: Application) => SlideInstance;

export interface SlideInstance {
    enter: () => Promise<void>;
    exit: () => Promise<void>;
    proceed: () => Promise<void>;
}

const slides: Slide[] = [Quote];

(async () => {
    let slide_index = 0;
    const app = new Application();
    await app.init({ background: Gruvbox.bg, resizeTo: window });
    const appDiv = document.getElementById("app")!;
    appDiv.appendChild(app.canvas);
    await load_assets();
    app.stage.layout = {
        width: app.screen.width,
        height: app.screen.height,
        justifyContent: "center",
        alignItems: "center",
    };
    const slideInstance = slides[slide_index](app);
    await slideInstance.enter();
})();
