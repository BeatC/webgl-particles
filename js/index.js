import GraphBuilder from './graph-builder.js';
import PointsOnSphereGenerator from './points-on-sphere-generator.js';
import ParticlesGraph from './particles-graph.js';

const checkRange = (root) => {

}

const SphereFunctions = (radius) => ({
    f: (x, y, z) => {
        const absRoot = Math.sqrt(x*x + y*y + z*z);

        return [ absRoot, -absRoot ];
    },
    x: (y, z) => {
        const absRoot = Math.sqrt(radius*radius - y*y - z*z);

        return [ absRoot, -absRoot ].filter(checkRange);
    },
    y: (x, z) => {
        const absRoot = Math.sqrt(radius*radius - x*x - z*z);

        return [ absRoot, -absRoot ].filter(checkRange);
    },
    z: (x, y) => {
        const absRoot = Math.sqrt(radius*radius - x*x - z*z);

        return [ absRoot, -absRoot ].filter(checkRange);
    }
});

const container = document.getElementById('container');
const graphBuilder = new GraphBuilder({
    radius: 50, 
    numberOfVertices: 300,
    surfaceFunction: {
        f: (x, y, z) => {
            const absRoot = Math.sqrt(x*x + y*y + z*z);

            return [ absRoot, -absRoot ];
        },
        x: (f, y, z) => {

        },
        y: (f, x, z) => {

        },
        z: (f, x, y) => {

        }
    },
    edgeExistPredicate: ([a, b]) => Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2) + Math.pow(a.z - b.z, 2)) < 10
});
const graph = graphBuilder.getGraph();
const app = new ParticlesGraph({
    container,
    graph
});
app.run();