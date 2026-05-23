import * as THREE from '../modules/three.module.js';
import { getCube, getPlane, getSphere } from './objects.js';
import { getRotationSpeed } from './controls.js';
import { initTrackballControls } from './utils.js';

main();

function main() {
    // create context
    const canvas = document.querySelector("#c");
    const gl = new THREE.WebGLRenderer({
        canvas,
        antialias: true
    });

    //create Renderer and resize it
    var renderer = new THREE.WebGLRenderer();

    renderer.setClearColor(new THREE.Color(0x000000));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;

    // create camera
    const angleOfView = 55;
    const aspectRatio = canvas.clientWidth / canvas.clientHeight;
    const nearPlane = 0.1;
    const farPlane = 100;
    const camera = new THREE.PerspectiveCamera(
        angleOfView,
        aspectRatio,
        nearPlane,
        farPlane
    );
    camera.position.set(0, 8, 30);

    // create the scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0.3, 0.5, 0.8);
    const fog = new THREE.Fog("grey", 1, 90);
    scene.fog = fog;


    // MATERIALS
    const textureLoader = new THREE.TextureLoader();

    // MESHES
    const cube = getCube(4, 'teal');
    scene.add(cube);

    const sphere = getSphere(3, 45, 20, 'red');
    scene.add(sphere);

    const plane = getPlane(256, 128, gl);
    plane.rotation.x = Math.PI / 2;
    //scene.add(plane);

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
    // attach them here, since appendChild needs to be called first
    var trackballControls = initTrackballControls(camera, renderer);
    var clock = new THREE.Clock();


    render();

    function render() {


        cube.rotation.x += getRotationSpeed();
        cube.rotation.y += getRotationSpeed();
        cube.rotation.z += getRotationSpeed();

        sphere.rotation.x += getRotationSpeed();
        sphere.rotation.y += getRotationSpeed();
        sphere.rotation.y += getRotationSpeed();

        requestAnimationFrame(render);
        renderer.render(scene, camera);
    }
}

// UPDATE RESIZE
function resizeGLToDisplaySize(gl) {
    const canvas = gl.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width != width || canvas.height != height;
    if (needResize) {
        gl.setSize(width, height, false);
    }
    return needResize;
}