import { Application, Assets } from "pixi.js";
import Gruvbox from "./gruvbox.json";
import "@pixi/layout";
import SerifFont from "@fontsource-variable/alegreya/files/alegreya-latin-wght-normal.woff2?url";
import Quote from "./slides/quote.ts";
import PopQuiz from "./slides/popquiz.ts";

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

const slides: Slide[] = [Quote, PopQuiz];

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
    let slide = slides[slide_index];
    let slide_instance = slide(app);
    await slide_instance.enter();
    const redraw_slide = async (new_slide_index: number) => {
        await slide_instance.exit();
        slide_index = new_slide_index;
        slide = slides[slide_index];
        slide_instance = slide(app);
        await slide_instance.enter();
    };
    const listen_handler = (e: KeyboardEvent) => {
        if (e.key === "ArrowLeft") {
            e.preventDefault();
            if (slide_index !== 0) {
                redraw_slide(slide_index - 1);
            }
        } else if (e.key === "ArrowRight") {
            e.preventDefault();
            if (slide_index !== slides.length - 1) {
                redraw_slide(slide_index + 1);
            }
        }
    };
    document.addEventListener("keydown", listen_handler);

})();
