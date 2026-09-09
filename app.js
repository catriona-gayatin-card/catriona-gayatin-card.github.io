(() => {
  const tabs = [...document.querySelectorAll('[role="tab"][data-side]')];
  const panels = {
    front: document.getElementById("front-panel"),
    back: document.getElementById("back-panel"),
  };

  function showSide(side) {
    if (!panels[side]) return;
    for (const [name, panel] of Object.entries(panels)) {
      panel.hidden = name !== side;
    }
    for (const tab of tabs) {
      const selected = tab.dataset.side === side;
      tab.setAttribute("aria-selected", String(selected));
      tab.tabIndex = selected ? 0 : -1;
    }
  }

  for (const [index, tab] of tabs.entries()) {
    tab.addEventListener("click", () => showSide(tab.dataset.side));
    tab.addEventListener("keydown", (event) => {
      let next;
      if (event.key === "ArrowRight") next = (index + 1) % tabs.length;
      else if (event.key === "ArrowLeft") next = (index + tabs.length - 1) % tabs.length;
      else if (event.key === "Home") next = 0;
      else if (event.key === "End") next = tabs.length - 1;
      else return;
      event.preventDefault();
      showSide(tabs[next].dataset.side);
      tabs[next].focus();
    });
  }

  // The front is the entry view on every page load, including browser restores.
  showSide("front");
  window.addEventListener("pageshow", () => showSide("front"));
})();
