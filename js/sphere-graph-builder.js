import Graph from './graph.js';
import PointsOnSphereGenerator from './points-on-sphere-generator.js';

export default class SphereGraphBuilder {
    constructor(options) {
        const { radius, numberOfVertices, edgeExistPredicate } = options;
        
        this.graph = new Graph();
        this.numberOfVertices = numberOfVertices;
        this.edgeExistPredicate = edgeExistPredicate;
        this.radius = radius;

        this.fillGraph();
    }

    fillGraph() {
        const { graph, edgeExistPredicate, radius, numberOfVertices } = this;
        const vertexGenerator = new PointsOnSphereGenerator(radius, numberOfVertices);

        graph.fillGraph(vertexGenerator, edgeExistPredicate);
    }

    getGraph() {
        return this.graph;
    }
}