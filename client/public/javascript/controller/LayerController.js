import { $ } from "../util/util.js";

export class LayerController {
  constructor(LayerView) {
    this.LayerView = LayerView;

    this.$categoryBtn = $(".category-btn");
    this.$categoryLayer = $(".category-layer");

    this.$searchSelect = $(".search-select");
    this.$searchSelectCategory = $(".search-select-category");
    this.$searchCategoryLayer = $(".search-category-layer");

    this.$input = $(".search-keyword");
    this.$inputLayer = $(".search-keyword-Layer");
  }

  init() {
    this.setCategorySelectEvent();

    this.setSearchSelectEvent();
    this.setSearchSelectDataEvent();
    this.setSearchFocusinEvent();

    this.setOutClickEvent({
      closelist: [this.$searchSelect, this.$input],
    });
  }

  setCategorySelectEvent() {
    this.$categoryBtn.addEventListener("mouseenter", () =>
      this.LayerView.show({
        $layer: this.$categoryLayer,
        className: "show",
        ms: 200,
      })
    );

    this.$categoryBtn.addEventListener("mouseleave", () =>
      this.LayerView.hide({
        $layer: this.$categoryLayer,
        className: "show",
        ms: 200,
      })
    );
  }

  setSearchSelectEvent() {
    this.$searchSelect.addEventListener("click", () =>
      this.LayerView.toggle({
        $layer: this.$searchCategoryLayer,
        className: "show-animation",
      })
    );
  }

  setSearchSelectDataEvent() {
    this.$searchCategoryLayer.addEventListener("click", ({ target }) => {
      const clickedCategory = $("a", target) || target || "전체";
      this.$searchSelectCategory.innerHTML = clickedCategory.innerHTML;
    });
  }

  setSearchFocusinEvent() {
    this.$input.addEventListener("focusin", () => {
      this.LayerView.show({ $layer: this.$inputLayer, className: "show" });
    });
  }

  //FIXME LayerView.hide 부분 하드코딩
  setOutClickEvent({ closelist }) {
    document.body.addEventListener(
      "click",
      ({ target }) => {
        if (
          closelist.some(
            (node) => node === target || target.closest(`.${node.className}`)
          )
        ) {
          return;
        }

        this.LayerView.hide({
          $layer: this.$searchCategoryLayer,
          className: "show-animation",
        });
        this.LayerView.hide({ $layer: this.$inputLayer, className: "show" });
      },
      false
    );
  }
}
