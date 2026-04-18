import { Application, Container, HTMLText } from "pixi.js";
import Gruvbox from "../gruvbox.json";
import { Slide, SlideInstance } from "../main";

export default ((app: Application) => {
    const instance = {
        app,
        cleanup: () => { },
        async enter() {
            const quoteContainer = new Container({
                layout: {
                    justifyContent: "center",
                    flexDirection: "column",
                    gap: 30,
                },
            });
            this.app.stage.addChild(quoteContainer);
            const text = new HTMLText({
                text: "The only <c>languages</c> that do not <c>change</c> are the dead ones.",
                style: {
                    fontFamily: 'Serif',
                    fontSize: 58,
                    fill: Gruvbox.fg,
                    tagStyles: {
                        c: { fill: Gruvbox.light_yellow, fontWeight: "900" },
                    },
                },
                layout: true,
            });
            const author = new HTMLText({
                text: "— David Crystal, <c>Linguist<c>",
                style: {
                    fill: Gruvbox.fg,
                    fontSize: 46,
                    fontFamily: "Serif",
                    tagStyles: {
                        c: { fill: Gruvbox.yellow },
                    },
                },
                layout: {
                    alignSelf: "flex-end"
                },
            });
            quoteContainer.addChild(text);
            quoteContainer.addChild(author);
            this.cleanup = () => {
                text.destroy();
                author.destroy();
                quoteContainer.destroy();
            };
        },
        async exit() {
            app.stage.removeChildren();
            this.cleanup();
        },
        async proceed() { },
    };
    return instance as SlideInstance;
}) as Slide;
