import { Application } from "pixi.js";
// import Gruvbox from "../gruvbox.json";
import { Slide, SlideInstance } from "../main";
// import { easeInOutCubic, progressAnimation } from "../lib/animation";

export default ((app: Application) => {
    const instance = {
        app,
        cleanup: async () => { },
        async enter() {

        },
        async exit() {
            await this.cleanup();
            app.stage.removeChildren();
        },
        async proceed() { },
    };
    return instance as SlideInstance;
}) as Slide;
