export default class LocalStorage {
  constructor(key) {
    this.key = key;
  }

  //TODO SET으로 중복안들어오게
  set(...items) {
    localStorage.setItem(this.key, JSON.stringify(items));
  }

  add(item) {
    const newItemsArray = [...(this.getAll() ?? []), item];
    this.set(...newItemsArray);
  }

  get(item) {
    const itemsArray = JSON.parse(localStorage.getItem(this.key));
    const findItem = itemsArray.find((value) => value === item);
    return findItem ?? false;
  }

  getAll() {
    const itemsArray = JSON.parse(localStorage.getItem(this.key));
    return itemsArray;
  }

  remove(item) {
    const itemsArray = JSON.parse(localStorage.getItem(this.key));
    localStorage.removeItem(this.key);

    const newItemsArray = itemsArray.filter((value) => value !== item);
    this.set(...newItemsArray);
  }

  clearAll() {
    localStorage.clear();
  }
}
