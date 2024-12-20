class Vector3 {

    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    getX() {
        return this.x;
    }

    getY() {
        return this.y;
    }

    getZ() {
        return this.z;
    }

    add(vector) {
        this.x += vector.getX();
        this.y += vector.getY();
        this.z += vector.getZ();
        return this;
    }

    subtract(vector) {
        this.x -= vector.getX();
        this.y -= vector.getY();
        this.z -= vector.getZ();
        return this;
    }

    toObject() {
        return {
            x: this.x,
            y: this.y,
            z: this.z,
        }
    }

    static calculatePitchAndYaw(from, to) {
        const direction = to.subtract(from);

        const yaw = Math.atan2(direction.z, direction.x) * (180 / Math.PI) - 90;

        const distance = Math.sqrt(direction.x ** 2 + direction.z ** 2);
        const pitch = -Math.atan2(direction.y, distance) * (180 / Math.PI);

        return { pitch: pitch, yaw: yaw };
    }

    static distance(point1, point2) {
        const x1 = Math.floor(point1.getX());
        const y1 = Math.floor(point1.getY());
        const z1 = Math.floor(point1.getZ());

        const x2 = Math.floor(point2.getX());
        const y2 = Math.floor(point2.getY());
        const z2 = Math.floor(point2.getZ());

        const deltaX = Math.abs(x2 - x1);
        const deltaY = Math.abs(y2 - y1);
        const deltaZ = Math.abs(z2 - z1);

        return deltaX + deltaY + deltaZ;
    }

};

export default Vector3;