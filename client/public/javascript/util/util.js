export const $ = (selector, base = document.body) => {
  let node;
  try {
    node = base.querySelector(selector);
  } catch (error) {
    console.log(error);
  }
  return node;
};

export const $$ = (selectors, base = document) => {
  let nodes;
  try {
    nodes = base.querySelectorAll(selectors);
  } catch (error) {
    console.log(error);
  }
  return nodes;
};

export const delay = (ms) =>
  new Promise((resolve) => setTimeout(() => resolve(ms), ms));

export const fetchData = async (url) => {
  try {
    const data = await fetch(url);
    if (data.ok) {
      return data.json();
    } else {
      throw new Error(data.statusText);
    }
  } catch (error) {
    console.log(error);
  }
};
