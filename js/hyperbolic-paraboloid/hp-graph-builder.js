import GraphBuilder from '../base/graph-builder.js';
import PointsOnHPGenerator from './points-on-hp-generator.js';

export default class HPGraphBuilder extends GraphBuilder {
    fillGraph() {
        const { graph } = this;
        const { edgeExistPredicate, numberOfVertices, bounds, offset } = this.options;
        const vertexGenerator = new PointsOnHPGenerator(numberOfVertices, {
            bounds,
            offset
        });

        graph.fillGraph(vertexGenerator, edgeExistPredicate);
    }
}