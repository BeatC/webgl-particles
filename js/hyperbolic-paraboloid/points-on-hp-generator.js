import PointsGenerator from '../base/points-generator.js';
import HyperbolicParaboloid from './hyperbolic-paraboloid.js';

export default class PointsOnHPGenerator extends PointsGenerator {
    generate() {
        const { bounds, offset } = this.options;
        
        const xyBounds = Math.sqrt(bounds*200);
        const hp = new HyperbolicParaboloid();

        const x = Math.random() * 2 * xyBounds - xyBounds;
        const y = Math.random() * 2 * xyBounds - xyBounds;
        const z = hp.getZ(x, y);

        return { x: x + offset.x, y: y + offset.y, z: z + offset.z };
    }
}