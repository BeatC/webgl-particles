export default class PointsOnSphereGenerator {
    constructor(radius, numberOfVertices) {
        this.radius = radius;
        this[Symbol.iterator] = function * () {
            for (let i = 0; i < numberOfVertices; i += 1) {
                yield this.generate();
            }
        }
    }

    generate() {
        const { radius } = this;
        const x = Math.random() * 2 * radius - radius;
        const y = Math.random() * 2 * radius - radius;
        const radical = radius*radius - x*x - y*y;

        if (radical >= 0) {
            let z = Math.sqrt(radical);

            z =  Math.random() > 0.5 ? z : -z;

            return { x, y, z};
        } else {
            return this.generate();
        }
    }
}