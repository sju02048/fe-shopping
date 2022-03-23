import LocalStorage from "../util/localstorage.js";
import { $, $$, fetchData } from "../util/util.js";

export class SearchController {
  constructor(SearchView) {
    this.SearchView = SearchView;
    this.recentStorage = new LocalStorage("recentKeyword");

    this.$input = $(".search-keyword");
    this.$inputLayer = $(".search-keyword-Layer");
    this.$inputForm = $(".search-form");
  }

  init() {
    this.setAutoKeywordEvent();
    this.setAutoKeywordKeyBtnEvent();

    this.setInputFocusEvent();
    this.setSubmitSearchEvent();
  }

  setAutoKeywordEvent() {
    this.$input.addEventListener("input", async ({ target }) => {
      const currentKeyword = target.value;
      if (!currentKeyword) {
        return this.renderRecentSearch();
      }

      const data = await fetchData(`/search/keyword=${currentKeyword}`);
      if (!data?.length) throw Error("가져오는 데이터가 없음!");

      this.$inputLayer.innerHTML = `
      <ul>
        ${data.reduce((prev, { keyword }) => {
          const [prefix, suffix] = keyword.split(currentKeyword);
          const boldKeyword = keyword.includes(currentKeyword)
            ? currentKeyword
            : "";

          return (
            prev +
            `<li>
            <a>${prefix || ""}<strong>${boldKeyword}</strong>${suffix || ""}</a>
             </li>`
          );
        }, "")}
      </ul>`;
    });
  }

  setAutoKeywordKeyBtnEvent() {}

  setInputFocusEvent() {
    this.$input.addEventListener("focus", () => {
      this.renderRecentSearch();
    });
  }

  setSubmitSearchEvent() {
    this.$inputForm.addEventListener("submit", (e) => {
      const inputValue = $("input", e.currentTarget).value;
      this.recentStorage.add(inputValue);
    });
  }

  renderRecentSearch() {
    const haveData = this.recentStorage.getAll()?.length;

    this.$inputLayer.innerHTML = haveData
      ? `
    <h3 class="search-keyword-Layer--top">최근 검색어</h3>
      <ul>
        ${this.recentStorage.getAll().reduce((prev, curr) => {
          return (
            prev +
            `<li data-recent-keyword="${curr}">
              <a>${curr}</a>
              <span class="deleteRecentKeyword">삭제</span>
             </li>`
          );
        }, "")}
      </ul>
    <div class="search-keyword-Layer--bottom">
        <span class="deleteAllRecentKeyword">전체삭제</span>
        <span>최근검색어끄기</span>
    </div>
      `
      : "";

    this.setDeleteSearchEvent();
    this.setDeleteAllSearchEvent();
  }

  setDeleteSearchEvent() {
    const children = [...$$(".deleteRecentKeyword", this.$inputLayer)];
    const isTarget = (target) =>
      children.includes(target) || target.closest(".deleteRecentKeyword");

    this.$inputLayer.addEventListener("click", ({ target }) => {
      if (!isTarget(target)) return;

      const keyword = target.closest("[data-recent-keyword]").dataset
        .recentKeyword;

      this.recentStorage.remove(keyword);
    });
  }

  setDeleteAllSearchEvent() {
    $(".deleteAllRecentKeyword", this.$inputLayer)?.addEventListener(
      "click",
      () => this.recentStorage.set()
    );
  }
}
