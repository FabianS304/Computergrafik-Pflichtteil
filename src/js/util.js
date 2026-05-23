function initStats(type) {

    var panelType = (typeof type !== 'undefined' && type) && (!isNaN(type)) ? parseInt(type) : 0;
    var stats = new Stats();

    stats.showPanel(panelType); // 0: fps, 1: ms, 2: mb, 3+: custom
    document.body.appendChild(stats.dom);

    return stats;
}

function initRenderer(
    canvas,
    antialias = true,
    color = new THREE.Color(0x000000),
    shadowMap = true) {


    const renderer = new THREE.WebGLRenderer({
        canvas, antialias: antialias
    });

    renderer.setClearColor(color);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = shadowMap;

    return renderer;
}

function initCamera(canvas) {
    const angleOfView = 55;
    const aspectRatio = canvas.clientWidth / canvas.clientHeight;
    const nearPlane = 0.1;
    const farPlane = 1000;
    const camera = new THREE.PerspectiveCamera(
        angleOfView,
        aspectRatio,
        nearPlane,
        farPlane
    );
    camera.position.set(0, 8, 30);

    return camera;
}
