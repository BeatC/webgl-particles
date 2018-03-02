import PointsGenerator from '../base/points-generator.js';
import Sphere from './sphere.js';

export default class PointsOnSphereGenerator extends PointsGenerator {
    generate() {
        const { options } = this;
        const { offset, bounds } = options;
        const x = Math.random() * 2 * bounds - bounds;
        const y = Math.random() * 2 * bounds - bounds;
        const sphere = new Sphere(bounds / 2);
        const z = sphere.getZ(x, y);

        if (z === null) {
            return this.generate();
        }

        return { x: x + offset.x, y: y + offset.y, z: z + offset.z };
    }
}