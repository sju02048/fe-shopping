import { delay } from "../util/util.js";

export class LayerView {
  isEnter = false;

  async show({ $layer, className, ms = 0 }) {
    this.isEnter = true;
    await delay(ms);
    if (this.isEnter) $layer.classList.add(className);
  }

  async hide({ $layer, className }) {
    this.isEnter = false;
    if (!this.isEnter) $layer.classList.remove(className);
  }

  toggle({ $layer, className }) {
    $layer.classList.toggle(className);
  }
}
