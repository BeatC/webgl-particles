import Graph from './graph.js';

export default class GraphBuilder {
    constructor(options) {
        this.graph = new Graph();
        this.options = options;

        this.fillGraph();
    }
    
    fillGraph() {}

    getGraph() {
        return this.graph;
    }
}