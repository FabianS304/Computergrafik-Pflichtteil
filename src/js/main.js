
document.addEventListener("DOMContentLoaded", main);

function main() {
    const canvas = document.querySelector("#c");
    if (!canvas) {
        throw new Error("Canvas #c not found");
    }

    const renderer = initRenderer(canvas)
    const camera = initCamera(canvas);
    var stats = initStats()
    // Szene erstellen
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0.3, 0.5, 0.8);
    // Fog-Dichte angepasst, um das vergrößerte Teekännchen und den Roboterarm zu berücksichtigen
    const fog = new THREE.Fog("grey", 1, 300);
    scene.fog = fog;

    // Meshes einrichten

    const plane = getPlane(500, 500, renderer);
    plane.rotation.x = Math.PI / 2;
    scene.add(plane);

    const teapot = getTeapot();
    scene.add(teapot);

    let h1 = 15;
    let h2 = 6;
    let h3 = 6;
    var seg1 = addSeg(h1);
    var seg2 = addSeg(h2);
    var seg3 = addSeg(h3);



    // Hänge seg1 an die Szene (damit es aufrecht steht und unabhängig von der Rotation der Ebene ist)
    // und positioniere es leicht über der Ebene.
    scene.add(seg1);
    seg1.position.set(0, 1, 0);
    // Hänge seg2 an seg1 an dessen Spitze. Tatsächliche Segmenthöhe = 2 * h1
    seg1.add(seg2);
    seg2.position.set(0, 2 * h1, 0);
    // Hänge seg3 an seg2 an dessen Spitze.
    seg2.add(seg3);
    seg3.position.set(0, 2 * h2, 0);

    // LICHTQUELLEN
    const color = 0xffffff;
    const intensity = .1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.target = plane;
    light.position.set(0, 30, 30);
    scene.add(light.target);
    scene.add(light);

    // Punktlichtquelle am Ende des seg3
    const spot = new THREE.SpotLight(0xffffff, 1.0, 800, Math.PI / 4, 0.1, 2);
    // (color, intensity, distance, angle, penumbra, decay)
    spot.position.set(0, 2 * h3, 0);
    const target = new THREE.Object3D();
    target.position.set(0, 2 * h3 + 10, 0); // Richtung vorwärts anpassen
    seg3.add(target);
    seg3.add(spot);
    spot.target = target;
    spot.castShadow = true;




    // Steuerelemente und zugehörige GUI einrichten
    var controls = new function () {
        this.rotY1 = 0;
        this.rotZ1 = 0;
        this.rotZ2 = 0;
        this.rotZ3 = 0;
    };

    var gui = new dat.GUI();
    gui.add(controls, 'rotY1', 0, 2 * Math.PI);
    gui.add(controls, 'rotZ1', - Math.PI, Math.PI);
    gui.add(controls, 'rotZ2', - Math.PI, Math.PI);
    gui.add(controls, 'rotZ3', - Math.PI, Math.PI);


    // Trackball-Kamera-Steuerung einrichten
    var trackballControls = initTrackballControls(camera, renderer);
    var clock = new THREE.Clock();

    render();

    function render() {

        trackballControls.update(clock.getDelta());
        stats.update();


        // Wende GUI-Werte auf die entsprechenden Segmentgruppen an
        seg1.rotation.y = controls.rotY1;
        seg1.rotation.z = controls.rotZ1;
        seg2.rotation.z = controls.rotZ2;
        seg3.rotation.z = controls.rotZ3;

        requestAnimationFrame(render);
        renderer.render(scene, camera);
    }
}