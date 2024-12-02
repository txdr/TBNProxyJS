import Vector3 from "./Vector3.js";

class AxisAlignedBB {

    constructor(position, width, height) {
        const halfWidth = width / 2;
        const halfHeight = height / 2;

        const x = position.getX();
        const y = position.getY();
        const z = position.getZ();

        this.minX = x - halfWidth;
        this.minY = y - (halfHeight + 0.5);
        this.minZ = z - halfWidth;
        this.maxX = x + halfWidth;
        this.maxY = y + (halfHeight / 2);
        this.maxZ = z + halfWidth;
    }

    static rayCastFromHead(start, yaw, pitch, target) {
        const yawRad = (yaw * Math.PI) / 180;
        const pitchRad = (pitch * Math.PI) / 180;

        const direction = new Vector3(
            -Math.sin(yawRad) * Math.cos(pitchRad),
            -Math.sin(pitchRad),
            Math.cos(yawRad) * Math.cos(pitchRad)
        );

        let tMin = -Infinity;
        let tMax = Infinity;

        const bounds = [
            { min: target.minX, max: target.maxX, origin: start.getX(), dir: direction.getX() },
            { min: target.minY, max: target.maxY, origin: start.getY(), dir: direction.getY() },
            { min: target.minZ, max: target.maxZ, origin: start.getZ(), dir: direction.getZ() },
        ];

        for (const { min, max, origin, dir } of bounds) {
            if (dir !== 0) {
                const t1 = (min - origin) / dir;
                const t2 = (max - origin) / dir;

                const tNear = Math.min(t1, t2);
                const tFar = Math.max(t1, t2);

                tMin = Math.max(tMin, tNear);
                tMax = Math.min(tMax, tFar);

                if (tMin > tMax) {
                    return null;
                }
            } else if (origin < min || origin > max) {
                return null;
            }
        }

        return tMin >= 0 ? tMin : null;
    }
}

export default AxisAlignedBB;
