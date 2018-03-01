import PointsGenerator from '../base/points-generator.js';

export default class PointsOnSphereGenerator extends PointsGenerator {
    generate() {
        const { options } = this;
        const { offset, bounds } = options;
        const x = Math.random() * 2 * bounds - bounds;
        const y = Math.random() * 2 * bounds - bounds;
        const radical = bounds*bounds - x*x - y*y;

        if (radical >= 0) {
            let z = Math.sqrt(radical) + offset.z;

            z =  Math.random() > 0.5 ? z : -z;

            return { x: x + offset.x, y: y + offset.y, z: z + offset.z };
        } else {
            return this.generate();
        }
    }
}