export function getPolarCoordinates(x, y, z) {
    const r = Math.sqrt(x*x + y*y + z*z);
    const theta = Math.atan(y / x);
    const phi = Math.acos(z / r);

    return { r, theta, phi };
}

export function getCartesianCoordinates(r, theta, phi) {
    const x = r * Math.cos(theta) * Math.sin(phi);
    const y = r * Math.sin(theta) * Math.sin(phi);
    const z = r * Math.cos(phi);

    return { x, y, z };
}