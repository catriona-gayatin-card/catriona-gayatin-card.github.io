(() => {
  const card = document.getElementById("original-card");
  const status = document.querySelector(".side-status");

  if (!card || !status) return;

  function showFront() {
    card.classList.remove("is-flipped");
    card.setAttribute("aria-pressed", "false");
    card.setAttribute("aria-label", "Original business card, front shown. Click to show the back.");
    status.textContent = "Front";
  }

  card.addEventListener("click", () => {
    const flipped = card.classList.toggle("is-flipped");
    card.setAttribute("aria-pressed", String(flipped));
    card.setAttribute(
      "aria-label",
      flipped
        ? "Original business card, back shown. Click to show the front."
        : "Original business card, front shown. Click to show the back.",
    );
    status.textContent = flipped ? "Back" : "Front";
  });

  window.addEventListener("pageshow", showFront);
})();
