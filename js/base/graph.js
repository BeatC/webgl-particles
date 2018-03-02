import { getPolarCoordinates, getCartesianCoordinates } from './coordinate-helper.js';

export default class Graph {
    constructor(edgeExistPredicate) {
        this.vertices = [];
        this.edges = [];
        this.edgeExistPredicate = edgeExistPredicate;
        this.initMoves();
    }

    initMoves() {
        const directions = [
            Symbol('north'),
            Symbol('north-east'),
            Symbol('east'),
            Symbol('south-east'),
            Symbol('south'),
            Symbol('south-west'),
            Symbol('west'),
            Symbol('north-west')
        ];
        this.directions = directions;
        
        const moves = new Map();
        moves.set(directions[0], (vertex, func) => {
            const { r, theta, phi } = getPolarCoordinates(vertex.x, vertex.y, vertex.z);

            const newTheta = theta - 0.01;
            const { x, y, z } = getCartesianCoordinates(r, newTheta, phi);

            return { x, y, z};
        });
        moves.set(directions[1], (vertex, func) => {
            const { r, theta, phi } = getPolarCoordinates(vertex.x, vertex.y, vertex.z);

            const newTheta = theta - 0.01;
            const { x, y, z } = getCartesianCoordinates(r, newTheta, phi);

            return { x, y, z};

        });
        moves.set(directions[2], (vertex, func) => {
            const { r, theta, phi } = getPolarCoordinates(vertex.x, vertex.y, vertex.z);

            const newTheta = theta - 0.01;
            const { x, y, z } = getCartesianCoordinates(r, newTheta, phi);

            return { x, y, z};

        });
        moves.set(directions[3], (vertex, func) => {
            const { r, theta, phi } = getPolarCoordinates(vertex.x, vertex.y, vertex.z);

            const newTheta = theta - 0.01;
            const { x, y, z } = getCartesianCoordinates(r, newTheta, phi);

            return { x, y, z};

        });
        moves.set(directions[4], (vertex, func) => {
            const { r, theta, phi } = getPolarCoordinates(vertex.x, vertex.y, vertex.z);

            const newTheta = theta - 0.01;
            const { x, y, z } = getCartesianCoordinates(r, newTheta, phi);

            return { x, y, z};

        });
        moves.set(directions[5], (vertex, func) => {
            const { r, theta, phi } = getPolarCoordinates(vertex.x, vertex.y, vertex.z);

            const newTheta = theta - 0.01;
            const { x, y, z } = getCartesianCoordinates(r, newTheta, phi);

            return { x, y, z};

        });
        moves.set(directions[6], (vertex, func) => {
            const { r, theta, phi } = getPolarCoordinates(vertex.x, vertex.y, vertex.z);

            const newTheta = theta - 0.01;
            const { x, y, z } = getCartesianCoordinates(r, newTheta, phi);

            return { x, y, z};

        });
        moves.set(directions[7], (vertex, func) => {
            const { r, theta, phi } = getPolarCoordinates(vertex.x, vertex.y, vertex.z);

            const newTheta = theta - 0.01;
            const { x, y, z } = getCartesianCoordinates(r, newTheta, phi);

            return { x, y, z};

        });

        this.moves = moves;
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

    fillGraph(vertexGenerator) {
        this.fillVertices(vertexGenerator);
        this.fillEdges();
    }

    fillVertices(vertexGenerator) {
        for (let vertex of vertexGenerator) {
            this.addVertex(vertex);
        }
    }

    fillEdges() {
        const { edgeExistPredicate } = this;
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

    move(vertex, movingFunction) {
        
        
        const methods = ['getX', 'getY', 'getZ'];
        // const methodIndex
        // [ movingFunction.getX, movingFunction.getY, movingFunction.getZ ]
        const direction = Math.ceil(Math.random() * 8) - 1;
        const newVertex = this.moves.get(this.directions[direction])(vertex, movingFunction);
        vertex.x = newVertex.x;
        vertex.y = newVertex.y;
        vertex.z = newVertex.z;
    }
}