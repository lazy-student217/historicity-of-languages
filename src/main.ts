import { Application, Assets, Text, Container } from "pixi.js";
import Gruvbox from "./gruvbox.json";
import "@pixi/layout";
import LibreBaskervilleFont from "@fontsource-variable/libre-baskerville/files/libre-baskerville-latin-wght-normal.woff2?url";

async function load_assets() {
  await Assets.load({
    src: LibreBaskervilleFont,
    data: {
      family: "Libre Baskerville",
    },
  });
}

(async () => {
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

  const quoteContainer = new Container({
    layout: {
      justifyContent: "center",
      flexDirection: "column",
      gap: 30,
    },
  });
  app.stage.addChild(quoteContainer);

  const text = new Text({
    text: "The only languages that do not change are the dead ones.",
    style: {
      fill: Gruvbox.fg,
      fontSize: 50,
      fontFamily: "Libre Baskerville",
    },
    anchor: 0.5,
    layout: true,
  });

  const author = new Text({
    text: "-- David Crystal",
    style: {
      fill: Gruvbox.fg,
      fontSize: 36,
      fontFamily: "Libre Baskerville",
    },
    anchor: 0.5,
    layout: true,
  });

  quoteContainer.addChild(text);
  quoteContainer.addChild(author);
})();
