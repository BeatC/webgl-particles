import { SphereFunction } from '../sphere/index.js';

export default class ParticlesGraph {
    constructor(options) {
        const { container, graph } = options;
        this.container = container;
        this.graph = graph;
        this.movingFunc = new SphereFunction(50);

        this.graphMover = v => this.graph.move(v, this.movingFunc);

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
        const geometry = new THREE.SphereGeometry(0.5, 2, 2);
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
       
        //this.graph.vertices.forEach(this.graphMover);
        //this.graph.fillEdges();
        //this.initScene();

    }

    run() {
        this.draw();
        this.update();
        requestAnimationFrame(this.boundRun);
    }
}