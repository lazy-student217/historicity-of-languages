import { Application, Assets, Text, Container } from "pixi.js";
import Gruvbox from "./gruvbox.json";
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
  const app_div = document.getElementById("app")!;
  app_div.appendChild(app.canvas);
  await load_assets();
  const container = new Container();
  container.x = app.screen.width / 2;
  container.y = app.screen.height / 2;
  container.pivot.x = container.width / 2;
  container.pivot.y = container.height / 2;
  app.stage.addChild(container);

  const text = new Text({
    text: "The only languages that do not change are the dead ones.",
    style: {
      fill: Gruvbox.fg,
      fontSize: 50,
      fontFamily: "Libre Baskerville",
    },
    anchor: 0.5,
  });

  container.addChild(text);
})();
