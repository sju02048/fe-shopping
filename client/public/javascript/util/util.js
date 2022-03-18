export const $ = (selector, base = document.body) =>
  base.querySelector(selector);

export const delay = (ms) =>
  new Promise((resolve) => setTimeout(() => resolve(ms), ms));
