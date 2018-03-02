import Graph from './graph.js';

export default class GraphBuilder {
    constructor(options) {
        const { edgeExistPredicate } = options;
        this.graph = new Graph(edgeExistPredicate);
        this.options = options;

        this.fillGraph();
    }
    
    fillGraph() {}

    getGraph() {
        return this.graph;
    }
}