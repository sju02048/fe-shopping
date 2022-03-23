import { LayerController } from "./controller/LayerController.js";
import { SearchController } from "./controller/SearchController.js";
import LocalStorage from "./util/localstorage.js";
import { LayerView } from "./view/LayerView.js";
import { SearchView } from "./view/SearchView.js";

const apps = [
  new LayerController(new LayerView()),
  new SearchController(new SearchView()),
];

for (const app of apps) {
  app.init();
}
