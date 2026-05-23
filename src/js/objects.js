
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

function getTeapot() {
    var teapot = new THREE.Group();
    var textureLoader = new THREE.TextureLoader();
    var texture = textureLoader.load('../assets/textures/stone.jpg');
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;

    var loader = new THREE.OBJLoader();

    loader.load('../assets/3D-objects/teapot.obj',
        function (mesh) {
            var material = new THREE.MeshPhongMaterial({ map: texture });

            mesh.children.forEach(function (child) {
                child.material = material;
                child.castShadow = true;
            });

            mesh.position.set(55, 20, 0);
            mesh.rotation.set(-Math.PI / 2, 0, 0);
            mesh.scale.set(0.035, 0.035, 0.035);

            teapot.add(mesh);
        },
        function (xhr) {
            console.log((xhr.loaded / xhr.total * 100) + '% loaded');
        },
        function (error) {
            console.log(error);
            console.log('An error happened');
        }
    );

    return teapot;
}


function addSeg(height) {
    // Create a group whose origin is at the *base* of the segment.
    // This way the group's position represents the contact point to the parent,
    // and child segments can be positioned at the parent's top by setting
    // child.position.y = parentHeightWorld.
    var axisSphere = new THREE.Group();

    var sphereGeometry = new THREE.SphereGeometry(1, 20, 20); // radius 1 -> diameter 2
    var sphereMaterial = new THREE.MeshLambertMaterial({ color: 0x7777ff });
    var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

    // scale the sphere to represent a tall segment. Original sphere height = 2.
    // After scaling by `height`, actual segment height = 2 * height.
    sphere.scale.x = 3;
    sphere.scale.y = height;
    sphere.scale.z = 3;

    // Place the sphere so its bottom sits at the group's origin (y=0).
    // Center of the sphere should be at half of the actual height: (2*height)/2 = height.
    sphere.position.set(0, height, 0);
    sphere.castShadow = true;
    sphere.receiveShadow = true;

    axisSphere.add(sphere);

    const tripod = new THREE.AxesHelper(5);
    axisSphere.add(tripod);


    return axisSphere;
}

// reusable MaterialLoader
function getMaterial(path) {

    return new THREE.TextureLoader().load(path);
}