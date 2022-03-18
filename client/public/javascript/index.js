import { $, delay } from "./util/util.js";

let layerFlag = true;
const $categoryBtn = $(".category-btn");
$categoryBtn.addEventListener("mouseenter", ({ target }) => {
  delay(200);
  if (layerFlag) {
    $(".category-layer", target).classList.add("show");
  }
  layerFlag = false;
});

$categoryBtn.addEventListener("mouseleave", ({ target }) => {
  $(".category-layer", target).classList.remove("show");
});

const $searchSelect = $(".search-select");
$searchSelect.addEventListener("click", ({ currentTarget }) => {
  const $layer = $(".search-category-layer", currentTarget.parent);
  $layer.classList.toggle("show-animation");
});
