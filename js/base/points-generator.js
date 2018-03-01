export default class PointsGenerator {
    constructor(numberOfVertices, options) {
        options.offset = options.offset || {};
        options.offset.x = options.offset.x || 0;
        options.offset.y = options.offset.y || 0;
        options.offset.z = options.offset.z || 0;
        this.options = options;
 
        this[Symbol.iterator] = function * () {
            for (let i = 0; i < numberOfVertices; i += 1) {
                yield this.generate();
            }
        }
    }

    generate() {}
}
