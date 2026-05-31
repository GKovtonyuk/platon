function setupUI(setSolid) {
  document.querySelectorAll("button").forEach(btn => {
    btn.addEventListener("click", () => {
      setSolid(btn.dataset.type);
    });
  });
}

function updateDescription(type) {
  const d = descriptions[type];

  document.getElementById("description").innerHTML = `
    <div class="info-card">
      <h2>${d.title}</h2>
      <p>${d.text}</p>
      <ul>
        <li>Граней: <b>${d.faces}</b></li>
        <li>Вершин: <b>${d.vertices}</b></li>
        <li>Ребер: <b>${d.edges}</b></li>
      </ul>
    </div>
  `;
}
