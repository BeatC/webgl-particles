import GraphBuilder from '../base/graph-builder.js';
import PointsOnSphereGenerator from './points-on-sphere-generator.js';

export default class SphereGraphBuilder extends GraphBuilder {
    fillGraph() {
        const { graph } = this;
        const { bounds, numberOfVertices, offset } = this.options;
        const vertexGenerator = new PointsOnSphereGenerator(numberOfVertices, {
            bounds,
            offset
        });

        graph.fillGraph(vertexGenerator);
    }
}