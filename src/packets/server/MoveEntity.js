import Vector3 from "../../math/Vector3.js";
import PlayerManager from "../../players/PlayerManager.js";
import PacketHandler from "../PacketHandler.js";
import EntityManager from "../../entites/EntityManager.js";

class MoveEntity extends PacketHandler {

    handle(params) {
        const playerManager = PlayerManager.getInstance();
        if (playerManager.doesPlayerWithRuntimeIDExist(params.runtime_entity_id)) {
            playerManager.getPlayerByRuntimeID(params.runtime_entity_id)?.setMovementData(
                new Vector3(
                    params.position.x,
                    params.position.y,
                    params.position.z
                ),
                params.rotation.yaw,
                params.rotation.pitch
            );
            return {cancelled: false, params: params};
        }
        EntityManager.getInstance().getEntity(params.runtime_entity_id)?.setPosition(new Vector3(
            params.position.x,
            params.position.y,
            params.position.z
        ));
        return {cancelled: false, params: params};
    }

};

export default MoveEntity;