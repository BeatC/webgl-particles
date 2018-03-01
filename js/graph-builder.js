import Graph from './graph.js';
import PointsOnSphereGenerator from './points-on-sphere-generator.js';

export default class GraphBuilder {
    constructor(options) {
        const { radius, numberOfVertices, edgeExistPredicate } = options;
        
        this.graph = new Graph();
        this.numberOfVertices = numberOfVertices;
        this.edgeExistPredicate = edgeExistPredicate;
        this.radius = radius;

        this.fillGraph();
    }

    fillGraph() {
        const { graph, edgeExistPredicate } = this;

        this.fillVertices();
        graph.computeEdges(edgeExistPredicate);
    }

    fillVertices() {
        const { graph, numberOfVertices, radius } = this;
        const vertexGenerator = new PointsOnSphereGenerator(radius);
 
        for (let vertex of vertexGenerator) {
            if (graph.vertices.length >= numberOfVertices) {
                return;
            }

            graph.addVertex(vertex);
        }
    }

    getGraph() {
        return this.graph;
    }
}