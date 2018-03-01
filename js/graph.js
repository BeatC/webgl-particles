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

    computeEdges(edgeExistPredicate) {
        this.vertices.forEach((a) => {
            this.vertices.forEach((b) => {
                if (a !== b && edgeExistPredicate([a, b])) {
                    this.addEdge(a, b);
                }
            })
        });
    }

    move() {

    }
}