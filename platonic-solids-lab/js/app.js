const container = document.getElementById('canvas-container');

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
camera.position.z = 3;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(container.clientWidth, container.clientHeight);
container.appendChild(renderer.domElement); // Додаємо до контейнера

const controls = new THREE.OrbitControls(camera, renderer.domElement);
const light = new THREE.PointLight(0xffffff, 1);
light.position.set(10, 10, 10);
scene.add(light);

let mesh;

function setSolid(type) {
    if (mesh) scene.remove(mesh);
    mesh = new THREE.Mesh(createGeometry(type), new THREE.MeshNormalMaterial());
    scene.add(mesh);
    updateInfo(type);
}

buildButtons(setSolid);
setSolid('Tetrahedron');

function animate() {
    requestAnimationFrame(animate);
    if (mesh) mesh.rotation.y += 0.01;
    renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
    const width = container.clientWidth;
    const height = container.clientHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
});