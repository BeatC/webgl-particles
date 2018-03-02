export default class Sphere {
    constructor(radius) {
        this.radius = radius;
    }

    getX(y, z) {
        const { radius } = this;
        const radical = radius*radius - y*y - z*z;

        if (radical >= 0) {
            let x = Math.sqrt(radical);

            return x;
            // return Math.random() > 0.5 ? x : -x;
        }

        return null;
    }

    getY(x, z) {
        const { radius } = this;
        const radical = radius*radius - x*x - z*z;

        if (radical >= 0) {
            let y = Math.sqrt(radical);
            return y;
            // return Math.random() > 0.5 ? y : -y;
        }

        return null;
    }

    getZ(x, y) {
        const { radius } = this;
        const radical = radius*radius - x*x - y*y;

        if (radical >= 0) {
            let z = Math.sqrt(radical);
            return z;
            //return Math.random() > 0.5 ? z : -z;
        }

        return null;
    }
}
           