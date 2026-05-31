const descriptions = {
  Tetrahedron: "🔺 Тетраедр — 4 трикутні грані, найпростіше платонове тіло.",
  Cube: "🟦 Куб — 6 квадратних граней, класична 3D форма.",
  Octahedron: "🔶 Октаедр — 8 трикутних граней, дві піраміди.",
  Dodecahedron: "⬟ Додекаедр — 12 п’ятикутних граней.",
  Icosahedron: "🔷 Ікосаедр — 20 трикутних граней, складна симетрія."
};

// Використовуємо контейнер для 3D
const container = document.getElementById('canvas-container');

// Сцена
const scene = new THREE.Scene();

// Камера
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 3;

// Renderer (малюємо в контейнер)
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
container.appendChild(renderer.domElement); 

// Controls
const controls = new THREE.OrbitControls(camera, renderer.domElement);

// Світло
const light = new THREE.PointLight(0xffffff, 1);
light.position.set(10, 10, 10);
scene.add(light);

let mesh;

// Створення фігури
function createGeometry(type) {
  switch (type) {
    case "Tetrahedron": return new THREE.TetrahedronGeometry(1);
    case "Cube": return new THREE.BoxGeometry(1, 1, 1);
    case "Octahedron": return new THREE.OctahedronGeometry(1);
    case "Dodecahedron": return new THREE.DodecahedronGeometry(1);
    case "Icosahedron": return new THREE.IcosahedronGeometry(1);
  }
}

function setSolid(type) {
  if (mesh) scene.remove(mesh);

  const geometry = createGeometry(type);
  const material = new THREE.MeshNormalMaterial({ flatShading: true });

  mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  // Оновлюємо опис
  const descEl = document.getElementById("description");
  if (descEl) descEl.innerText = descriptions[type];

  // Активна кнопка
  document.querySelectorAll("button[data-type]").forEach(btn => {
    btn.classList.remove("active");
    if (btn.dataset.type === type) {
      btn.classList.add("active");
    }
  });
}

// Обробка кліків на кнопки
document.querySelectorAll("button").forEach(btn => {
  btn.addEventListener("click", () => {
    // Якщо у кнопки є data-type, змінюємо фігуру
    if (btn.dataset.type) {
      setSolid(btn.dataset.type);
      
      // АВТОМАТИЧНЕ ЗГОРТАННЯ після вибору на мобільному
      if (window.innerWidth <= 600) {
        document.querySelectorAll('#buttons button:not(#menuToggle)').forEach(b => {
          b.classList.add('hidden');
        });
      }
    }
  });
});

// Логіка згортання меню кнопкою "Меню"
const menuToggle = document.getElementById('menuToggle');
if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    document.querySelectorAll('#buttons button:not(#menuToggle)').forEach(btn => {
      btn.classList.toggle('hidden');
    });
  });
}

// Старт
setSolid("Tetrahedron");

// Анімація
function animate() {
  requestAnimationFrame(animate);
  if (mesh) mesh.rotation.y += 0.01;
  renderer.render(scene, camera);
}
animate();

// Resize
window.addEventListener("resize", () => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
});

// ПОЧАТКОВЕ ЗГОРТАННЯ при завантаженні сторінки (для мобільних)
if (window.innerWidth <= 600) {
  document.querySelectorAll('#buttons button:not(#menuToggle)').forEach(btn => {
    btn.classList.add('hidden');
  });
}