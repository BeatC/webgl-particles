import PointsGenerator from '../base/points-generator.js';

export default class PointsOnHPGenerator extends PointsGenerator {
    generate() {
        const { bounds, offset } = this.options;
        
        const xyBounds = Math.sqrt(bounds*200);
        
        const x = Math.random() * 2 * xyBounds - xyBounds + offset.x;
        const y = Math.random() * 2 * xyBounds - xyBounds + offset.y;
        const z = 0.01*x*x - 0.01*y*y + offset.z;

        return { x, y, z };
    }
}