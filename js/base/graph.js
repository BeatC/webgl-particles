export default class Graph {
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

    fillGraph(vertexGenerator, edgeExistPredicate) {
        this.fillVertices(vertexGenerator);
        this.fillEdges(edgeExistPredicate);
    }

    fillVertices(vertexGenerator) {
        for (let vertex of vertexGenerator) {
            this.addVertex(vertex);
        }
    }

    fillEdges(edgeExistPredicate) {
        this.vertices.forEach((a) => {
            this.vertices.forEach((b) => {
                if (a !== b && edgeExistPredicate([a, b])) {
                    this.addEdge(a, b);
                }
            })
        });
    }

    merge(graph) {
        this.vertices = this.vertices.concat(graph.vertices);
        this.edges = this.edges.concat(graph.edges);
    }

    move() {

    }
}