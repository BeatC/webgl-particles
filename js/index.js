import { SphereGraphBuilder, SphereFunction } from './sphere/index.js';
import { HPGraphBuilder } from './hyperbolic-paraboloid/index.js';
import ParticlesGraph from './draw/particles-graph.js';

const container = document.getElementById('container');
const sphereGraphBuilder = new SphereGraphBuilder({
    bounds: 100,
    offset: {
        z: 0,
    },
    numberOfVertices: 10,
    edgeExistPredicate: ([a, b]) => Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2) + Math.pow(a.z - b.z, 2)) < 7
});
// const hpGraphBuilder = new HPGraphBuilder({
//     bounds: 100,
//     numberOfVertices: 500,
//     edgeExistPredicate: ([a, b]) => Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2) + Math.pow(a.z - b.z, 2)) < 10
// });

// const graph = hpGraphBuilder.getGraph();
// const sphereGraph = sphereGraphBuilder.getGraph();

// graph.merge(sphereGraph);

window.SphereFunction = SphereFunction;
window.graph = sphereGraphBuilder.getGraph();

const app = new ParticlesGraph({
    container,
    graph: sphereGraphBuilder.getGraph()
});
app.run();