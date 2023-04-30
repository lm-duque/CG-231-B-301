// ** CREACION DE ESCENA **
scene = new THREE.Scene(); // Crear la instancia escena
camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 0.1, 1000); // Crear cámara    
camera.position.x = 70; // Posición en eje X
camera.position.y = 60; // Posición en eje Y
camera.position.z = 200; // Posición en eje Z
camera.rotation.set(0, -0.5, 0);
camera.lookAt(scene.position); // Posicionar cámara

renderer = new THREE.WebGLRenderer({ antialias: true }); // Crear la instanacia renderizador
renderer.setClearColor(0xDDDDDD, 1.0); // Color fondo pantalla
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var controls = new THREE.OrbitControls(camera, renderer.domElement);

function render() {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
}
render();

// ** CREACIÓN CUADRÍCULA **
// Cuadrícula de tamaño 5x5 (200/40 ó size/divisions)
var size = 200; // Tamaño divisiones
var arrowSize = 100; // Tamaño flecha eje
var divisions = 40; // Cantidad divisiones
var origin = new THREE.Vector3(0, 0, 0); // Definir origen
var x = new THREE.Vector3(1, 0, 0); // Vector unitario en X
var y = new THREE.Vector3(0, 1, 0); // Vector unitario en Y
var z = new THREE.Vector3(0, 0, 1); // Vector unitario en Z
var color1 = new THREE.Color(0x737373); // Color ejes principales
var color2 = new THREE.Color(0x333333); // Color línea divisiones
var colorR = new THREE.Color(0xAA0000); // Color Rojo - Red
var colorG = new THREE.Color(0x00AA00); // Color Verde - Green
var colorB = new THREE.Color(0x0000AA); // Color Azul -Blue
// Ejes X, Y, Z
var arrowX = new THREE.ArrowHelper(x, origin, arrowSize, colorR, 10, 1); // Creación flecha en eje X
var arrowY = new THREE.ArrowHelper(y, origin, arrowSize, colorG, 10, 1); // Creación flecha en eje Y
var arrowZ = new THREE.ArrowHelper(z, origin, arrowSize, colorB, 10, 1); // Creación flecha en eje Z
// Rejilla
var gridHelperXZ = new THREE.GridHelper(size, divisions, color1, color2); // Creación grilla

// ** FUNCIÓN CUBO **
function cubo(posini, lado, material) {
    var geometry = new THREE.Geometry(); // Crear objeto
    var vertices = [ // Definir vértices del cubo. El Vector3 se toma como punto, no como array
        new THREE.Vector3((posini[0]), (posini[1]), (posini[2])), // Vértice V0
        new THREE.Vector3((posini[0]) + lado, (posini[1]), (posini[2])), // Vértice V1
        new THREE.Vector3((posini[0]) + lado, (posini[2]), (posini[2]) + lado), // Vértice V2
        new THREE.Vector3((posini[0]), (posini[1]), (posini[2]) + lado), // Vértice V3
        new THREE.Vector3((posini[0]), (posini[1]) + lado, (posini[2])), // Vértice V4
        new THREE.Vector3((posini[0]) + lado, (posini[1]) + lado, (posini[2])), // Vértice V5
        new THREE.Vector3((posini[0]) + lado, (posini[1]) + lado, (posini[2]) + lado), // Vértice V6
        new THREE.Vector3((posini[0]), (posini[1]) + lado, (posini[2]) + lado), // Vértice V7
    ];

    var a = [ // Array aristas (uniendo vértices)
        [0, 1], [1, 2], [2, 3], [3, 0],
        [4, 5], [5, 6], [6, 7], [7, 4],
        [0, 4], [1, 5], [2, 6], [3, 7],
    ];

    // Crear las aristas
    var geometry = new THREE.Geometry();
    var material = new THREE.LineBasicMaterial({ color: color });
    for (var i = 0; i < a.length; i++) {
        var edge = a[i];
        geometry.vertices.push(vertices[edge[0]], vertices[edge[1]]);
    }

    var cubo = new THREE.LineSegments(geometry, material);
    return cubo;
}

// ** CREAR CUBO **
var lado = 5; // Valor lado del cuadrado
var color = 0x9999ee;
var cube = cubo(origin, lado, color);

// ** FUNCION PERSPECTIVA **
function perspectiva(obj) {
    var b = 60 * Math.PI / 180;
    var n = 10; // Cerca (near)
    var f = 50; // Lejos (far)
    var a = 10; // Aspecto (aspect)
    var matrizP = new THREE.Matrix4(); // Definir matriz traslacion
    matrizP.set(1 / (a * Math.tan(b)), 0, 0, 0, // Traslación solo en el eje X
                   0, 1 / Math.tan(b), 0, 0,
                   0, 0, (f + n) / (n - f), (lado * f * n) / (n - f),
                   0, 0, -1, 0);
    obj.applyMatrix(matrizP);
}
perspectiva(cube);

// Objetos en la escena
scene.add(camera);
scene.add(gridHelperXZ); // Agregar grilla
scene.add(arrowX); // Agregar flecha eje X
scene.add(arrowY); // Agregar flecha eje Y
scene.add(arrowZ); // Agregar flecha eje Z
scene.add(cube);



