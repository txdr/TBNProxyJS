import AxisAlignedBB from "../math/AxisAlignedBB.js";
import TBNProxy from "../TBNProxy.js";

class ServerPlayer {

    static DEFAULT_WIDTH = 0.6;
    static DEFAULT_HEIGHT = 2;

    constructor(uuid, runtimeID, username, position, pitch, yaw) {
        this.uuid = uuid;
        this.runtimeID = runtimeID;
        this.username = username;
        this.position = position;
        this.height = ServerPlayer.DEFAULT_HEIGHT;
        this.width = ServerPlayer.DEFAULT_WIDTH;
        this.pitch = pitch;
        this.yaw = yaw;
        this.aabb = new AxisAlignedBB(this.position, 0.6, 2);
    }

    getPosition() {
        return this.position;
    }
    
    setMovementData(position, yaw, pitch) {
        this.position = position;
        this.yaw = yaw;
        this.pitch = pitch;
        this.aabb = new AxisAlignedBB(this.position, 0.6, 2);
    }

    getAxisAlignedBB() {
        return this.aabb;
    }

    getUUID() {
        return this.uuid;
    }

    getRuntimeID() {
        return this.runtimeID;
    }

    getUsername() {
        return this.username;
    }

    setHitBox(width, height) {
        TBNProxy.getInstance().getPlayer().queue("set_entity_data", {
            "runtime_entity_id": this.runtimeID,
            "metadata": [
                {
                    "key": "boundingbox_width",
                    "type": "float",
                    "value": width
                },
                {
                    "key": "boundingbox_height",
                    "type": "float",
                    "value": height
                }
            ],
            "properties": {
                "ints": [],
                "floats": [],
            },
            "tick": 0
        });
    }

};

export default ServerPlayer;