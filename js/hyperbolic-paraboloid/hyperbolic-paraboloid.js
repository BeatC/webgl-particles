export default class HyperbolicParaboloid {
    getX (y, z) {
        return Math.sqrt(100(z + 0.01*y*y));
    }

    getY(x, z) {
        return Math.sqrt(100*(0.01*x*x - z));
    }

    getZ(x, y) {
        return 0.01*x*x - 0.1*y*y;
    }
}