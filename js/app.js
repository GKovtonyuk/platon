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

  camera.position.z = isMobile() ? 4 : 3;

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;

  const light = new THREE.PointLight(0xffffff, 1);
  light.position.set(10,10,10);
  scene.add(light);

  setupUI(setSolid);

  setSolid("Tetrahedron");

  window.addEventListener("resize", onResize);
}

function setSolid(type) {
  if (mesh) scene.remove(mesh);

  const geometry = createGeometry(type);
  const material = new THREE.MeshNormalMaterial({ flatShading: true });

  mesh = new THREE.Mesh(geometry, material);

  const scale = isMobile() ? 0.8 : 1;
  mesh.scale.set(scale, scale, scale);

  scene.add(mesh);

  document.getElementById("description").innerText =
    descriptions[type];
}

function onResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);

  camera.position.z = isMobile() ? 4 : 3;
}

function animate() {
  requestAnimationFrame(animate);

  if (mesh) {
    mesh.rotation.y += isMobile() ? 0.015 : 0.01;
  }

  controls.update();
  renderer.render(scene, camera);
}
