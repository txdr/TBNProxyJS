import PacketHandler from "../PacketHandler.js";
import EntityManager from "../../entites/EntityManager.js";
import Entity from "../../entites/Entity.js";
import Vector3 from "../../math/Vector3.js";

class AddEntity extends PacketHandler {

    //{"unique_id":"292553","runtime_id":"292553","entity_type":"minecraft:lightning_bolt",
    // "position":{"x":174.71859741210938,"y":1.0448999404907227,"z":-130.6190948486328},
    // "velocity":{"x":0,"y":0,"z":0},"pitch":6.765899658203125,"yaw":302.7732238769531,
    // "head_yaw":0,"body_yaw":0,"attributes":[],"metadata":[],"properties":{"ints":[],"floats":[]},"links":[]}
    handle(params) {
        EntityManager.getInstance().addEntity(new Entity(
            params.unique_id,
            params.runtime_id,
            params.entity_type,
            new Vector3(params.position.x, params.position.y, params.position.z)
        ))
        return {cancelled: false, params: params};
    }

};

export default AddEntity;