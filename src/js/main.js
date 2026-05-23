
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
    //changed Fog-Density to account for the upscaled Teapod and robot arm
    const fog = new THREE.Fog("grey", 1, 300);
    scene.fog = fog;

    // SetUp the Meshes

    const plane = getPlane(500, 500, renderer);
    plane.rotation.x = Math.PI / 2;
    scene.add(plane);

    const teapot = getTeapot();
    scene.add(teapot);

    let h1 = 8;
    let h2 = 6;
    let h3 = 6;
    var seg1 = addSeg(h1);
    var seg2 = addSeg(h2);
    var seg3 = addSeg(h3);



    // Attach seg1 to the scene (so it stands upright independent of the plane's rotation)
    // and position it slightly above the plane surface.
    scene.add(seg1);
    seg1.position.set(0, 1, 0);
    // Attach seg2 to seg1 at seg1's top. Actual segment height = 2 * h1
    seg1.add(seg2);
    seg2.position.set(0, 2 * h1, 0);
    // Attach seg3 to seg2 at seg2's top.
    seg2.add(seg3);
    seg3.position.set(0, 2 * h2, 0);

    //LIGHTS
    const color = 0xffffff;
    const intensity = .1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.target = plane;
    light.position.set(0, 30, 30);
    scene.add(light);
    scene.add(light.target);

    //Punktlichtquelle am Ende des seg3
    const pointLight = new THREE.PointLight(0xffffaa, .8);
    seg3.add(pointLight);
    pointLight.position.set(0, 2 * h3, 0)




    //SetUp the Controls and the coresponding GUI
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


    //setUp the trackball-Camera-Control
    var trackballControls = initTrackballControls(camera, renderer);
    var clock = new THREE.Clock();

    render();

    function render() {

        trackballControls.update(clock.getDelta());
        stats.update();


        // apply GUI controls to the corresponding segment groups
        seg1.rotation.y = controls.rotY1;
        seg1.rotation.z = controls.rotZ1;
        seg2.rotation.z = controls.rotZ2;
        seg3.rotation.z = controls.rotZ3;

        requestAnimationFrame(render);
        renderer.render(scene, camera);
    }
}