// /docs/js/modules/render-utils.js
// Shared function to render a list of modules to a grid container

export function renderGrid(container, data) {
  if (!Array.isArray(data)) return;

  data.forEach(mod => {
    const card = document.createElement("div");
    card.className = "module-box";

    if (mod.center) {
      card.classList.add("centered-module");
    }

    card.innerHTML = `
      <h2>${mod.title}</h2>
      <p>${mod.desc}</p>
      <a href="${mod.path}" class="nav-button">${mod.button}</a>
    `;

    container.appendChild(card);
  });
}