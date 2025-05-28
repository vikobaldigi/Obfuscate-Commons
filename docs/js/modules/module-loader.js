// /docs/js/modules/module-loader.js
// Dynamically load homepage modules using shared renderer

import { renderGrid } from './render-utils.js';

document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("module-grid");
  if (grid && window.modules) {
    renderGrid(grid, window.modules);
  }
});