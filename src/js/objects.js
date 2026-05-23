
function getCube(cubeSize = 4, color = 'pink') {

    //Define Dimensions
    const GEOMETRY = new THREE.BoxGeometry(
        cubeSize,
        cubeSize,
        cubeSize
    );
    //Define Material (basic, just color)
    const MATERIAL = new THREE.MeshPhongMaterial({
        color: color
    });

    //Build cube
    const cube = new THREE.Mesh(GEOMETRY, MATERIAL);
    //Define Position
    cube.position.set(cubeSize + 1, cubeSize + 1, 0);
    cube.castShadow = true;

    return cube;
}

function getSphere(radius = 3, widthSegments = 32, heightSegments = 16, color = 'tan') {

    const GEOMETRY = new THREE.SphereGeometry(
        radius,
        widthSegments,
        heightSegments
    );

    const normalMap = getMaterial('../assets/textures/sphere_normal.png');
    normalMap.wrapS = THREE.RepeatWrapping;
    normalMap.wrapT = THREE.RepeatWrapping;

    const MATERIAL = new THREE.MeshStandardMaterial({
        color: color, normalMap: normalMap
    });

    const sphere = new THREE.Mesh(GEOMETRY, MATERIAL);
    sphere.position.set(-radius - 1, radius + 2, 0);


    return sphere;
}

function getPlane(width = 256, height = 128, gl) {

    const GEOMETRY = new THREE.PlaneGeometry(
        width, height
    );

    const map = getMaterial('../assets/textures/pebbles.jpg');
    map.wrapS = THREE.RepeatWrapping;
    map.wrapT = THREE.RepeatWrapping;
    map.repeat.set(16, 16);
    map.minFilter = THREE.NearestFilter;
    map.anisotropy = gl.capabilities.getMaxAnisotropy();

    const planeNorm = getMaterial('../assets/textures/pebbles_normal.png');
    planeNorm.wrapS = THREE.RepeatWrapping;
    planeNorm.wrapT = THREE.RepeatWrapping;
    planeNorm.minFilter = THREE.NearestFilter;
    planeNorm.repeat.set(16, 16);

    const MATERIAL = new THREE.MeshStandardMaterial({
        map: map, side: THREE.DoubleSide, normalMap: planeNorm
    });


    const plane = new THREE.Mesh(GEOMETRY, MATERIAL);
    return plane;
}

// reusable MaterialLoader
function getMaterial(path) {

    return new THREE.TextureLoader().load(path);
}