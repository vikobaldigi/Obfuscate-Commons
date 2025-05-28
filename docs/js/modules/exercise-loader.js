// /docs/js/modules/exercise-loader.js
// Dynamically load cryptographic exercises using shared renderer

import { renderGrid } from './render-utils.js';

document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("exercise-grid");
  if (grid && window.exerciseModules) {
    renderGrid(grid, window.exerciseModules);
  }
});