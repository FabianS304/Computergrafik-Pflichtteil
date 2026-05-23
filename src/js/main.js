
document.addEventListener("DOMContentLoaded", main);

function main() {
    const canvas = document.querySelector("#c");
    if (!canvas) {
        throw new Error("Canvas #c not found");
    }

    const renderer = initRenderer(canvas)
    const camera = initCamera(canvas);
    var stats = initStats()
    // create the scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0.3, 0.5, 0.8);
    const fog = new THREE.Fog("grey", 1, 90);
    scene.fog = fog;

    // SetUp the Meshes
    const cube = getCube(4, 'teal');
    scene.add(cube);

    const sphere = getSphere(3, 45, 20, 'red');
    scene.add(sphere);

    const plane = getPlane(256, 128, renderer);
    plane.rotation.x = Math.PI / 2;


    //LIGHTS
    const color = 0xffffff;
    const intensity = .7;
    const light = new THREE.DirectionalLight(color, intensity);
    light.target = plane;
    light.position.set(0, 30, 30);
    scene.add(light);
    scene.add(light.target);

    const ambientColor = 0xffffff;
    const ambientIntensity = 0.2;
    const ambientLight = new THREE.AmbientLight(ambientColor, ambientIntensity);
    scene.add(ambientLight);

    //SetUp the Controls and the coresponding GUI
    var controls = new function () {
        this.rotationSpeed = getRotationSpeed();
    }
    var gui = new dat.GUI();
    gui.add(controls, 'rotationSpeed', 0, 0.5)

    //setUp the trackball-Camera-Control
    var trackballControls = initTrackballControls(camera, renderer);
    var clock = new THREE.Clock();

    render();

    function render() {

        trackballControls.update(clock.getDelta());
        stats.update();

        cube.rotation.x += controls.rotationSpeed;
        cube.rotation.y += controls.rotationSpeed;
        cube.rotation.z += controls.rotationSpeed;

        sphere.rotation.x += controls.rotationSpeed;
        sphere.rotation.y += controls.rotationSpeed;
        sphere.rotation.y += controls.rotationSpeed;

        requestAnimationFrame(render);
        renderer.render(scene, camera);
    }
}