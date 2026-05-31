function setupUI(setSolid) {
  document.querySelectorAll("button").forEach(btn => {
    btn.addEventListener("click", () => {
      setSolid(btn.dataset.type);
    });
  });
}
