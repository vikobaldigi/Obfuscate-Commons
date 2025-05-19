// /docs/js/modules/module-loader.js
// Dynamically generate module cards from module-data.js

document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("module-grid");

  if (!window.modules || !Array.isArray(window.modules)) return;

  window.modules.forEach(mod => {
    const card = document.createElement("div");
    card.className = "module-box";
    card.innerHTML = `
      <h2>${mod.title}</h2>
      <p>${mod.desc}</p>
      <button onclick="location.href='${mod.path}'">${mod.button}</button>
    `;
    grid.appendChild(card);
  });
});