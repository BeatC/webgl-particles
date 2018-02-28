class Graph {
    constructor() {
        this.vertices = [];
        this.edges = [];

    }

    addVertex(vertex) {
        if (!this.vertices.includes(vertex)) {
            this.vertices.push(vertex);
        }
    }

    addEdge(source, destination) {
        this.edges.some(couple => couple.includes(source) && couple.includes(destination));
        this.edges.push([ source, destination ]);
    }
}

class PointsOnSphereGenerator {
    constructor(radius) {
        this.radius = radius;
        this[Symbol.iterator] = function * () {
            while (true) {
                yield this.generate();
            }
        }
    }

    generate() {
        const { radius } = this;
        const x = Math.random() * 2 * radius - radius;
        const y = Math.random() * 2 * radius - radius;
        const radical = radius*radius - x*x - y*y;

        if (radical >= 0) {
            let z = Math.sqrt(radical);

            z =  Math.random() > 0.5 ? z : -z;

            return { x, y, z};
        } else {
            return this.generate();
        }
    }
}

class ParticlesGraph {
    constructor(options) {
        const { container, numberOfVertices, edgeExistPredicate } = options;
        this.container = container;
        this.edgeExistPredicate = edgeExistPredicate;
        this.numberOfVertices = numberOfVertices;

        this.fillGraph();
        this.initRenderer();
        this.initCamera();
        this.initScene();

        this.boundRun = this.run.bind(this);
    }

    initRenderer() {
        const { offsetWidth, offsetHeight } = this.container;
        const renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true
        });

        renderer.setSize(offsetWidth, offsetHeight);
        container.appendChild(renderer.domElement); 
        
        this.renderer = renderer;
    }

    initCamera() {
        const { container } = this;
        const { offsetHeight, offsetWidth } = container;
        const ratio = offsetWidth / offsetHeight;
        const camera = new THREE.PerspectiveCamera(75, ratio, 0.1, 1000);
        camera.position.z = 200;

        this.camera = camera;
    }

    initScene() {
        const backgroundColor = new THREE.Color(0xffffff);
        const scene = new THREE.Scene();
        
        scene.add(this.camera);

        const light = new THREE.AmbientLight( 0x6666666 );
        scene.add( light );

        const graph = new THREE.Object3D();

        this.createVertices(graph);
        this.createEdges(graph);

        scene.add(graph);
        this.group = graph;
        this.scene = scene;
    }

    createVertices(group) {
        this.graph.vertices.forEach(vertex => group.add(this.createSphere(vertex)));
    }

    fillGraph() {
        const graph = new Graph();

        this.graph = graph;

        this.fillVertices();
        this.fillEdges();
    }

    fillVertices() {
        const { graph, numberOfVertices } = this;
        const vertexGenerator = new PointsOnSphereGenerator(100);
        const iterator = vertexGenerator[Symbol.iterator]();
 
        for (let i = 0; i < numberOfVertices; i++) {
            graph.addVertex(iterator.next().value);
        }

        
    }

    fillEdges() {
        const { edgeExistPredicate, graph } = this;

        graph.vertices.forEach((a) => {
            graph.vertices.forEach((b) => {
                if (a !== b && edgeExistPredicate([a, b])) {
                    graph.addEdge(a, b);
                }
            })
        });
    }

    createEdges(group) {
        const { graph } = this;

        graph.edges.forEach(([source, destination]) => {
            const line = this.createLine(
                {
                    x: source.x,
                    y: source.y,
                    z: source.z
                }, {
                    x: destination.x,
                    y: destination.y, 
                    z: destination.z
                });

                group.add(line);
        });
    }

    createLine(a, b) {
        const geometry = new THREE.Geometry();
        geometry.vertices.push(new THREE.Vector3(a.x, a.y, a.z));
        geometry.vertices.push(new THREE.Vector3(b.x, b.y, b.z));

        const material = new THREE.MeshPhongMaterial({
            color: 0x00ff00
        });

        return new THREE.Line(geometry, material);
    }

    createSphere({ x, y, z} = {}) {
        const geometry = new THREE.SphereGeometry(0.5, 8, 8);
        const material = new THREE.MeshPhongMaterial({
            color: 0xff0000
        });
        const sphere = new THREE.Mesh(geometry, material);

        sphere.position.x = x || sphere.position.x;
        sphere.position.y = y || sphere.position.y;
        sphere.position.z = z || sphere.position.z;

        return sphere;
    }

    draw() {
        const { scene, camera, renderer } = this;
        renderer.render(scene, camera);
    }

    update() {
        this.group.rotation.x += 0.0025;
        this.group.rotation.z += 0.0025;
        this.group.rotation.y += 0.0025;

    }

    run() {
        this.draw();
        this.update();
        requestAnimationFrame(this.boundRun);
    }
}

const container = document.getElementById('container');
const app = new ParticlesGraph({
    container,
    numberOfVertices: 50,
    edgeExistPredicate: ([a, b]) => Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2) + Math.pow(a.z - b.z, 2)) < 50
});
app.run();