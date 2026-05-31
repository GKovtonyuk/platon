let scene, camera, renderer, controls;
let mesh;

init();
animate();

function init() {
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  camera.position.z = window.isMobile ? 4 : 3;

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;

  const light = new THREE.PointLight(0xffffff, 1);
  light.position.set(10,10,10);
  scene.add(light);

  // ⚠️ важливо: перевірка існування
  if (window.setupUI) {
    window.setupUI(setSolid);
  }

  setSolid("Tetrahedron");

  window.addEventListener("resize", onResize);
}

function setSolid(type) {
  if (mesh) scene.remove(mesh);

  const geometry = window.createGeometry(type);
  const material = new THREE.MeshNormalMaterial({ flatShading: true });

  mesh = new THREE.Mesh(geometry, material);

  const scale = window.isMobile ? 0.8 : 1;
  mesh.scale.set(scale, scale, scale);

  scene.add(mesh);

  if (window.updateDescription) {
    window.updateDescription(type);
  }
}

function onResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);

  camera.position.z = window.isMobile ? 4 : 3;
}

function animate() {
  requestAnimationFrame(animate);

  if (mesh) {
    mesh.rotation.y += window.isMobile ? 0.015 : 0.01;
  }

  controls.update();
  renderer.render(scene, camera);
}
